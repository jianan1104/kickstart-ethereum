import React from 'react';
import Campaign from '../../ethereum/campaign';
import { Card, Grid, Button } from  'semantic-ui-react';
import ContributeForm from '../../components/ContributeForm';
import Link from 'next/link'
import web3 from '../../ethereum/web3';


const CampaignShow = ({ data }) => {
    const renderCards = () => {
        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount
        } = data;
        const items = [{
            header: manager,
            meta: 'Address of Manager',
            description: 'The manager created this campaign and can create requests to withdraw money',
            style: { overflowWrap: 'break-word'}
        }, {
            header: minimumContribution,
            meta: 'Minimum Contribution (wei)',
            description: 'You must contribute at least this much wei to become an approver'
        }, {
            header: requestsCount,
            meta: 'Number of Requests',
            description: 'A request tries to withdraw money from the contract. Requests must be approved by approvers.'
        }, {
            header: approversCount,
            meta: 'Number of Approvers',
            description: 'Number og people who have already donated to this campaign.'
        }, {
            header: web3.utils.fromWei(balance, 'ether'),
            meta: 'Campaign Balance (ether)',
            description: 'The balance is how much money this campaign has left to spend.'
        }]

        return <Card.Group items={items} />;
    };

    return(
        <>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                        <h3>{`Campaign of ${ data.address }`}</h3>
                        { renderCards() }
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <ContributeForm address={ data.address }/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                    <Link href={`/campaigns/${ data.address }/requests`}>
                        <a>
                            <Button primary>View Requests</Button>
                        </a>
                    </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )

};

export async function getServerSideProps(context) {
    const { address } = context.query;
    const campaign = await Campaign(address);
    const summary = await campaign.methods.getSummary().call();
    return {
        props:{
            data:{
                minimumContribution: summary[0],
                balance: summary[1],
                requestsCount: summary[2],
                approversCount: summary[3],
                manager: summary[4],
                address
            }
        }
    }
};


export default CampaignShow;