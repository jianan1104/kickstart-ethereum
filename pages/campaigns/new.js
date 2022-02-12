import React, { useState } from "react";
import { Button, Input, Form, Message } from 'semantic-ui-react'
import factory from '../../ethereum/factory';
import { useRouter } from 'next/router'
import { useMetaMask } from "metamask-react";

const CampaignNew = () => {
    const router = useRouter();
    const { status, account, ethereum, connect } = useMetaMask();
    const [minimumContribution,setMinimumContribution]=useState('');
    const [errorMessage,setErrorMessage]=useState('');
    const [loading,setLoading]=useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        if(status !== 'connected'){
            setErrorMessage('Please connect wallet.');
            connect();
            return 
        }
        setLoading(true);
        setErrorMessage('');
        try {
            await factory(ethereum).methods
                .createCampaign(minimumContribution)
                .send({
                    from: account
                });
                router.push('/');
        } catch (error) {
            setErrorMessage(error.message);
        }
        setLoading(false);
    }

    return (
        <>
        <h1>Create a Campaign</h1>
        <Form onSubmit={onSubmit} error={!!errorMessage}>
            <Form.Field>
            <label>Minimum Contribution</label>
            <Input
                value={minimumContribution} 
                label={{ basic: true, content: 'wei' }}
                labelPosition='right'
                placeholder='minimum' 
                onChange={ e => { setMinimumContribution(e.target.value)}}
            />
            </Form.Field>
            <Button type='submit' primary loading={ loading }>Create</Button>
            <Message error header="Oops!" content={errorMessage} />
        </Form>
        </>
    );
}


export default CampaignNew; 