import React, { useState } from "react";
import { Form, Input, Button, Message } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from "../ethereum/web3";
import { useRouter } from "next/router";
import { useMetaMask } from "metamask-react";


const ContributeForm = ({ address }) => {
    const router = useRouter();
    const { status, account, ethereum } = useMetaMask();
    const [value,setValue]=useState('');
    const [errorMessage,setErrorMessage]=useState('');
    const [loading,setLoading]=useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        if(status !== 'connected'){
            setErrorMessage('Please connect wallet.');
            return 
        }
        setLoading(true);
        setErrorMessage('');
        const campaign = Campaign(address, ethereum);
        try {
            await campaign.methods.contribute().send({
                from: account,
                value: web3.utils.toWei(value, 'ether')
            });
            router.replace(`/campaigns/${address}`);
        } catch (error) {
            setErrorMessage(error.message);
        }
        setLoading(false);
    }

    return (
        <Form onSubmit={onSubmit} error={!!errorMessage}>
            <Form.Field>
                <label>Amount to Contribute</label>
                <Input
                    value={value} 
                    label='ether' 
                    labelPosition='right'
                    onChange={e => setValue( e.target.value)}
                />
            </Form.Field>
            <Button primary loading={ loading }>Contribute</Button>
            <Message error header="Oops!" content={errorMessage} />
        </Form>
    )
}

export default ContributeForm;