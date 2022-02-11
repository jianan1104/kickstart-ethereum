import React, { useState } from "react";
import { Button, Input, Form, Message } from 'semantic-ui-react'
import factory from '../../ethereum/factory';
import web3 from "../../ethereum/web3";
import { Router } from '../../routes';
import { useMetaMask } from "metamask-react";

const CampaignNew = () => {
    const { status, account } = useMetaMask();
    const [minimumContribution,setMinimumContribution]=useState('');
    const [errorMessage,setErrorMessage]=useState('');
    const [loading,setLoading]=useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        if(status !== 'connected'){
            setErrorMessage('Please connect wallet.');
            return 
        }
        setLoading(true);
        setErrorMessage('');
        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createCampaign(minimumContribution)
                .send({
                    from: account
                });
            Router.pushRoute('/');
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

// class CampaignNew extends React.Component {
//     state = {
//         minimumContribution: '',
//         errorMessage: '',
//         loading: false
//     };

//     onSubmit = async (event) => {
//         event.preventDefault();
//         this.setState({ loading: true, errorMessage: '' });
//         try {
//             const accounts = await web3.eth.getAccounts();
//             await factory.methods
//                 .createCampaign(this.state.minimumContribution)
//                 .send({
//                     from: accounts[0]
//                 });
//             Router.pushRoute('/');
//         } catch (error) {
//             this.setState({ errorMessage: error.message });
//         }
//         this.setState({ loading: false });
//     };

//     render() {
//         return (
//             <>
//             <h1>Create a Campaign</h1>
//             <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
//                 <Form.Field>
//                 <label>Minimum Contribution</label>
//                 <Input
//                     value={this.state.minimumContribution} 
//                     label={{ basic: true, content: 'wei' }}
//                     labelPosition='right'
//                     placeholder='minimum' 
//                     onChange={ e => { this.setState({ minimumContribution: e.target.value })}}
//                 />
//                 </Form.Field>
//                 <Button type='submit' primary loading={ this.state.loading }>Create</Button>
//                 <Message error header="Oops!" content={this.state.errorMessage} />
//             </Form>
//             </>
            
//         );
//     };
// };

export default CampaignNew; 