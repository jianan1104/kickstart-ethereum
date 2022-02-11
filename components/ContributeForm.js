import React, { useState } from "react";
import { Form, Input, Button, Message } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from "../ethereum/web3";
import { Router } from '../routes';
import { useMetaMask } from "metamask-react";


const ContributeForm = ({ address }) => {
    const { status } = useMetaMask();
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
        const campaign = Campaign(address);
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(value, 'ether')
            });
            Router.replace(`/campaigns/${address}`);
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

// class ContributeForm extends React.Component {
//     state = {
//         value: '',
//         errorMessage: '',
//         loading: false
//     };

//     onSubmit = async (e) => {
//         e.preventDefault();

//         console.log(window.ethernum);
//         this.setState({ loading: true, errorMessage: '' });
//         const campaign = Campaign(this.props.address);
//         try {
//             const accounts = await web3.eth.getAccounts();
//             await campaign.methods.contribute().send({
//                 from: accounts[0],
//                 value: web3.utils.toWei(this.state.value, 'ether')
//             });
//             Router.replace(window.location.pathname);
//         } catch (error) {
//             this.setState({ errorMessage: error.message });
//         }
//         this.setState({ loading: false });
        
//     }

//     render() {
//         return (
//             <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
//                 <Form.Field>
//                     <label>Amount to Contribute</label>
//                     <Input
//                         value={this.state.value} 
//                         label='ether' 
//                         labelPosition='right'
//                         onChange={e => this.setState({ value: e.target.value })}
//                     />
//                 </Form.Field>
//                 <Button primary loading={ this.state.loading }>Contribute</Button>
//                 <Message error header="Oops!" content={this.state.errorMessage} />
//             </Form>
//         )
//     }
// };

export default ContributeForm;