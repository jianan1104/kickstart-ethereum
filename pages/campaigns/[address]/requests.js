import React from "react";
import { Button, Table } from 'semantic-ui-react';
import Link from 'next/link'
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";
import { useMetaMask } from "metamask-react";


const RequestIndex = ({data}) => {
    const { status, account } = useMetaMask();
    const { address, requests, requestsCount, approversCount, manager  } = data;
    const renderRow = () => {
        return requests.map((request, idx) => {
            return (
            <RequestRow 
                key={idx}
                id={idx}
                request={request}
                approversCount={ approversCount}
                address={ address}
                isAdmin={ manager.toLowerCase() == account }
            />
            )
        });
    };
    const { Header, Row, HeaderCell, Body } = Table;
    return(
        <>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '15px'}}>
                <h3>Pending Request</h3>
                {   manager.toLowerCase() == account ?
                    <Link href={`/campaigns/${address}/requests/new`}>
                        <a>
                            <Button primary>Add Request</Button>
                        </a>
                    </Link> : null
                }
            </div>
            <Table unstackable>
                <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Amount</HeaderCell>
                        <HeaderCell>Recipient</HeaderCell>
                        <HeaderCell>Approval Count</HeaderCell>
                        <HeaderCell>Approve</HeaderCell>
                        {
                            manager.toLowerCase() == account ? <HeaderCell>Finalize</HeaderCell> : null
                        }
                        
                    </Row>
                </Header>
                <Body>
                    { renderRow() }
                </Body>
            </Table>
            <div> Found { requestsCount } requests.</div>
        </>
    );

};

export async function getServerSideProps(context) {
    const { address } = context.query;
    const campaign = await Campaign(address);
    const requestsCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();
    const manager = await campaign.methods.manager().call();
    let requests = await Promise.all(
        Array(parseInt(requestsCount))
        .fill()
        .map((obj, idx) => {
            return campaign.methods.requests(idx).call();
        })
    );
    requests = JSON.parse(JSON.stringify(requests))
    return { props: {
        data: {
            address,  requests, requestsCount, approversCount, manager 
        }
    }};
};


export default RequestIndex;