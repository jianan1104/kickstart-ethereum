import React from "react";
import { Button } from "semantic-ui-react";

const About = () => {
    return(
        <>
            <h2>About</h2>
            <h3>Created by <a href="https://www.facebook.com/Linjianan1104/">Jian-An, Lin</a></h3>
            <p>Email: linjianan1104@gmail.com</p>
            <Button icon="github" basic><a href="https://github.com/jianan1104/kickstart-ethernum">Github Repo</a></Button>
        </>
        
    )
};

export default About;