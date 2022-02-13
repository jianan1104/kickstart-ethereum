import React from "react";
import { Button, Icon } from "semantic-ui-react";
import Highlight from 'react-highlight'


const About = () => {
    return(
        <>
            <link rel="stylesheet" href="node_modules/highlight.js/styles/default.css"></link>
            <h2>About</h2>
            <p>A blockchain crowdfunding platform using by Solidity 0.8.11 and Next.js</p>
            <h3>Created by <a href="https://www.facebook.com/Linjianan1104/">Jian-An, Lin</a></h3>
            <p>Email: linjianan1104@gmail.com</p>
            <a href="https://github.com/jianan1104/kickstart-ethereum">
                <Button basic>
                    <Button.Content visible>
                        <Icon name='github' />
                    </Button.Content>
                </Button>
            </a>
        </>
        
    )
};

export default About;