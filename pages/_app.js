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
            <title>Blockchain Crowdfunding Platform-區塊鏈群眾募資平台</title>
            <link rel="shortcut icon" href="https://cdn.icon-icons.com/icons2/943/PNG/128/shoppaymentorderbuy-04_icon-icons.com_73886.png" />
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