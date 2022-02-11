import React from "react";
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";
import { useMetaMask } from "metamask-react";


const RequestIndex = (props) => {
    const { status, account } = useMetaMask();
    const renderRow = () => {
        return props.requests.map((request, idx) => {
            return (
            <RequestRow 
                key={idx}
                id={idx}
                request={request}
                approversCount={ props.approversCount}
                address={ props.address}
                isAdmin={ props.manager.toLowerCase() == account }
            />
            )
        });
    };
    const { Header, Row, HeaderCell, Body } = Table;
    return(
        <>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '15px'}}>
                <h3>Pending Request</h3>
                {   props.manager.toLowerCase() == account ?
                    <Link route={`/campaigns/${props.address}/requests/new`}>
                        <a>
                            <Button primary>Add Request</Button>
                        </a>
                    </Link> : null
                }
            </div>
            <Table>
                <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Amount</HeaderCell>
                        <HeaderCell>Recipient</HeaderCell>
                        <HeaderCell>Approval Count</HeaderCell>
                        <HeaderCell>Approve</HeaderCell>
                        {
                            props.manager.toLowerCase() == account ? <HeaderCell>Finalize</HeaderCell> : null
                        }
                        
                    </Row>
                </Header>
                <Body>
                    { renderRow() }
                </Body>
            </Table>
            <div> Found { props.requestsCount } requests.</div>
        </>
    );

};

RequestIndex.getInitialProps = async (props) => {
    const { address } = props.query;
    const campaign = await Campaign(address);
    const requestsCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();
    const manager = await campaign.methods.manager().call();
    const requests = await Promise.all(
        Array(parseInt(requestsCount))
        .fill()
        .map((obj, idx) => {
            return campaign.methods.requests(idx).call();
        })
    );
    return { address, requests, requestsCount, approversCount, manager };
};

// class RequestIndex extends React.Component {
//     static async getInitialProps(props) {
//         const { address } = props.query;
//         const campaign = await Campaign(address);
//         const requestsCount = await campaign.methods.getRequestsCount().call();
//         const approversCount = await campaign.methods.approversCount().call();
//         const manager = await campaign.methods.manager().call();
//         const requests = await Promise.all(
//             Array(parseInt(requestsCount))
//             .fill()
//             .map((obj, idx) => {
//                 return campaign.methods.requests(idx).call();
//             })
//         );
//         return { address, requests, requestsCount, approversCount };
//     }

//     renderRow() {
//         return this.props.requests.map((request, idx) => {
//             return (
//             <RequestRow 
//                 key={idx}
//                 id={idx}
//                 request={request}
//                 approversCount={this.props.approversCount}
//                 address={this.props.address}
//             />
//             )
//         });
//     };

//     render() {
//         const { Header, Row, HeaderCell, Body } = Table;
//         return(
//             <>
//                 <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '15px'}}>
//                     <h3>Pending Request</h3>

//                     {   
//                         <Link route={`/campaigns/${this.props.address}/requests/new`}>
//                             <a>
//                                 <Button primary>Add Request</Button>
//                             </a>
//                         </Link>
//                     }
//                 </div>
//                 <Table>
//                     <Header>
//                         <Row>
//                             <HeaderCell>ID</HeaderCell>
//                             <HeaderCell>Description</HeaderCell>
//                             <HeaderCell>Amount</HeaderCell>
//                             <HeaderCell>Recipient</HeaderCell>
//                             <HeaderCell>Approval Count</HeaderCell>
//                             <HeaderCell>Approve</HeaderCell>
//                             <HeaderCell>Finalize</HeaderCell>
//                         </Row>
//                     </Header>
//                     <Body>
//                         { this.renderRow() }
//                     </Body>
//                 </Table>
//                 <div> Found { this.props.requestsCount } requests.</div>
//             </>
//         );
//     };
// };



export default RequestIndex;