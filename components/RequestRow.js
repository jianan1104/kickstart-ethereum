import React, { useState } from "react";
import { Table, Button } from 'semantic-ui-react';
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";
import { useRouter } from "next/router";
import { useMetaMask } from "metamask-react";

const RequestRow = ({address, id, request, approversCount, isAdmin}) => {
    const router = useRouter();
    const [approveLoading, setApproveLoading] = useState(false);
    const [finalizeLoading, setFinalizeLoading] = useState(false);
    const { status, account, ethereum, connect } = useMetaMask();

    const onApprove = async () => {
        if(status !== 'connected')  {
            connect();
            return 
        }
        setApproveLoading(true);
        try {
            const campaign = await Campaign(address, ethereum);
            await campaign.methods.approveRequest(id).send({
                from: account
            });
            router.replace(window.location.pathname);
        } catch (error) {
            console.log(error.message);
        }
        setApproveLoading(false);
    };

    const onFinalize = async () => {
        if(status !== 'connected')  {
            connect();
            return 
        }
        setFinalizeLoading(true);
        try {
            const campaign = await Campaign(address, ethereum);
            await campaign.methods.finalizeRequest(id).send({
                from: account
            });
            router.replace(`/campaigns/${address}`);
        } catch (error) {
            console.log(error.message);
        }
        setFinalizeLoading(false);
    };

    const { Row, Cell } = Table;
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
                            loading={ approveLoading } 
                            onClick={onApprove}>
                            Approve</Button>
                    )}
                </Cell>
                {   isAdmin ? (
                    <Cell>
                        {  (ready2Finalize && !request.complete) ?  (
                        <Button 
                        color="teal" 
                        basic 
                        loading={finalizeLoading}
                        onClick={onFinalize}>
                            Finalize</Button>
                        ): null}
                    </Cell>) : null
                }
            </Row>
        </>
    )
}
export default RequestRow;