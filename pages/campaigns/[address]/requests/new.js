import React, { useState } from "react";
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Campaign from '../../../../ethereum/campaign';
import web3 from "../../../../ethereum/web3";
import { useRouter } from 'next/router';
import Link from 'next/link';


const RequestNew = ({address}) => {
    const router = useRouter();
    const [value,setValue]=useState('');
    const [description,setDescription]=useState('');
    const [recipient,setRecipient]=useState('');
    const [errorMessage,setErrorMessage]=useState('');
    const [loading,setLoading]=useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');
        const campaign = await Campaign(address);
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods
                .createRequest(
                    description, 
                    web3.utils.toWei(value, 'ether'),
                    recipient
                    )
                .send({
                    from: accounts[0]
                });
                router.push(`/campaigns/${address}/requests`);
        } catch (error) {
            setErrorMessage(error.message);
        }
        setLoading(false);
    }
    return(
        <>
            <Link href={`/campaigns/${address}/requests`}>
                <a>
                    Back
                </a>
            </Link>
            <h3>Create a Request</h3>
            <Form onSubmit={onSubmit} error={!! errorMessage}>
                <Form.Field>
                    <label>Description</label>
                    <Input 
                        value={ description}
                        onChange={e => setDescription( e.target.value )}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Value in ether</label>
                    <Input 
                        label={{ basic: true, content: 'ether' }}
                        labelPosition='right'
                        value={ value}
                        onChange={e => setValue(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Recipient</label>
                    <Input 
                        value={ recipient}
                        onChange={e => setRecipient( e.target.value)}
                    />
                </Form.Field>
                <Button primary loading={ loading }>Create</Button>
                <Message error header="Oops!" content={ errorMessage} />
            </Form>
        </>
    )
}


export async function getServerSideProps(context) {
    const { address } = context.query;
    return { props: { address }};
};


export default RequestNew;