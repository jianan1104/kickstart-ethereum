import React from 'react';
import Head from "next/head";
import { Container } from 'semantic-ui-react';
import MenuComponent from '../components/Menu';
import { MetaMaskProvider } from "metamask-react";
import 'semantic-ui-css/semantic.min.css';
import './style.css';

export default function App({ Component, pageProps }) {
   return (
      <>
         <Head>
            <link rel="shortcut icon" href="./favicon.ico" />
         </Head>
         <MetaMaskProvider>
            <Container>
               <MenuComponent />
               <Component {...pageProps} />
            </Container>
         </MetaMaskProvider>
      </>
      );
}