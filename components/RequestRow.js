import React from "react";
import { Table, Button } from 'semantic-ui-react';
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";
import { Router } from '../routes';


class RequestRow extends React.Component {
    state = {
        approveLoading: false,
        errorMessage: ''
    }

    onApprove = async () => {
        this.setState({ approveLoading: true });
        try {
            const accounts = await web3.eth.getAccounts();
            const campaign = await Campaign(this.props.address);
            await campaign.methods.approveRequest(this.props.id).send({
                from: accounts[0]
            });
            Router.replace(window.location.pathname);
        } catch (error) {
            console.log(error.message);
        }
        this.setState({ approveLoading: false });
    };

    onFinalize = async () => {
        try {
            const accounts = await web3.eth.getAccounts();
            const campaign = await Campaign(this.props.address);
            await campaign.methods.finalizeRequest(this.props.id).send({
                from: accounts[0]
            });
            Router.replace(`/campaigns/${this.props.address}`);
        } catch (error) {
            console.log(error.message);
        }
    };

    render() {
        const { Row, Cell } = Table;
        const { id, request, approversCount, isAdmin } = this.props;
        const ready2Finalize = request.approvalCount > approversCount / 2;
        return (
            <>

                <Row disabled={request.complete} positive={ready2Finalize && !request.complete}>
                    <Cell>{ id + 1 }</Cell>
                    <Cell>{ request.description  }</Cell>
                    <Cell>{ web3.utils.fromWei(request.value, 'ether')  }</Cell>
                    <Cell>{ request.recipient  }</Cell>
                    <Cell>{ request.approvalCount  }/{ approversCount  }</Cell>
                    <Cell>
                        {   request.complete ? null : (
                            <Button 
                                color="green" 
                                basic 
                                loading={ this.state.approveLoading } 
                                onClick={this.onApprove}>
                                Approve</Button>
                        )}
                    </Cell>
                    {   isAdmin ? (
                        <Cell>
                            {  (ready2Finalize && !request.complete) ?  (
                            <Button 
                            color="teal" 
                            basic 
                            onClick={this.onFinalize}>
                                Finalize</Button>
                            ): null}
                        </Cell>) : null
                    }
                </Row>
            </>
        )
    }
}

export default RequestRow;