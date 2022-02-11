import React, { useState } from "react";
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from "../../../ethereum/web3";
import { Link, Router } from '../../../routes';



const RequestNew = (props) => {
    const address = props.address;
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
            Router.pushRoute(`/campaigns/${address}/requests`);
        } catch (error) {
            setErrorMessage(error.message);
        }
        setLoading(false);
    }
    return(
        <>
            <Link route={`/campaigns/${address}/requests`}>
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


RequestNew.getInitialProps = async (props)  => {
    const { address } = props.query;
    return { address };
  };

// class RequestNew extends React.Component {
//     state = {
//         value: '',
//         description: '',
//         recipient: '',
//         loading: false,
//         errorMessage: ''
//     }

//     static async getInitialProps(props) {
//         const { address } = props.query;
//         return { address };
//     }

//     onSubmit = async (event) => {
//         event.preventDefault();
//         this.setState({ loading: true, errorMessage: '' });
//         const campaign = await Campaign(this.props.address);
//         const { description, value, recipient } = this.state;
//         try {
//             const accounts = await web3.eth.getAccounts();
//             await campaign.methods
//                 .createRequest(
//                     description, 
//                     web3.utils.toWei(value, 'ether'),
//                     recipient
//                     )
//                 .send({
//                     from: accounts[0]
//                 });
//             Router.pushRoute(`/campaigns/${this.props.address}/requests`);
//         } catch (error) {
//             this.setState({ errorMessage: error.message });
//         }
//         this.setState({ loading: false });
//     }

//     render() {
//         return(
//             <>
//                 <Link route={`/campaigns/${this.props.address}/requests`}>
//                     <a>
//                         Back
//                     </a>
//                 </Link>
//                 <h3>Create a Request</h3>
//                 <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
//                     <Form.Field>
//                         <label>Description</label>
//                         <Input 
//                             value={this.state.description}
//                             onChange={e => this.setState({ description: e.target.value })}
//                         />
//                     </Form.Field>
//                     <Form.Field>
//                         <label>Value in ether</label>
//                         <Input 
//                             label={{ basic: true, content: 'ether' }}
//                             labelPosition='right'
//                             value={this.state.value}
//                             onChange={e => this.setState({ value: e.target.value })}
//                         />
//                     </Form.Field>
//                     <Form.Field>
//                         <label>Recipient</label>
//                         <Input 
//                             value={this.state.recipient}
//                             onChange={e => this.setState({ recipient: e.target.value })}
//                         />
//                     </Form.Field>
//                     <Button primary loading={ this.state.loading }>Create</Button>
//                     <Message error header="Oops!" content={this.state.errorMessage} />
//                 </Form>
//             </>
//         )
//     }
// };

export default RequestNew;