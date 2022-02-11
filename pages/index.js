import React, { useState, useEffect } from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react'
import { Link } from '../routes';

const CampaignIndex = (props) => {
    const { campaigns } = props;
    const renderCampaigns = () =>{
        // const [campaigns,setCampaigns]=useState(null);
        // useEffect( () => { 
        //     async function fetch() {
        //         const data = await factory.methods.getDeployedCampaign().call();
        //         setCampaigns(data);
        //     }
        //     fetch();
        // }, []);
        const items = campaigns.map(address => {
            return {
                header: address,
                description: (
                    <Link route={`/campaigns/${address}`}>
                        <a>View Campaign</a>
                    </Link>
                    ),
                fluid: true
            }
        });
        return <Card.Group items={items} className="margin-top"/>
    }

    return(
            <div>
                <h3>Open Campaigns</h3>
                <Link route="/campaigns/new">
                    <a>
                        <Button 
                            content="Create Campaign"  
                            icon="add circle"  
                            className='margin-top'
                            floated='right'
                            primary
                            />
                    </a>
                </Link>
                { renderCampaigns() }
            </div>
    )
};

CampaignIndex.getInitialProps = async (props)  => {
    const campaigns = await factory.methods.getDeployedCampaign().call();
    return { campaigns };
  };


// class CampaignIndex extends React.Component {
//     static async getInitialProps() {
//         const campaigns = await factory.methods.getDeployedCampaign().call();
//         return { campaigns };
//     }

//     renderCampaigns() {
//         const items = this.props.campaigns.map(address => {
//             return {
//                 header: address,
//                 description: (
//                     <Link route={`/campaigns/${address}`}>
//                         <a>View Campaign</a>
//                     </Link>
//                     ),
//                 fluid: true
//             }
//         });
//         return <Card.Group items={items} className="margin-top"/>
//     }

        

//     render() {
//         return (
//             <div>
//                 <h3>Open Campaigns</h3>
//                 <Link route="/campaigns/new">
//                     <a>
//                         <Button 
//                             content="Create Campaign"  
//                             icon="add circle"  
//                             className='margin-top'
//                             floated='right'
//                             primary
//                             />
//                     </a>
//                 </Link>
                
//                 { this.renderCampaigns() }
//             </div>
//         )
//     }
// }

export default CampaignIndex;