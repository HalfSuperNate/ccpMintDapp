import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React from 'react';
import Wallet from './wallet.page';
import Link from 'next/link';
import { useCitizen } from './imageSelector';
import { GetCollectionLink } from './abiGet';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>CCP Mint</title>
        <meta name="description" content="The time has come to decide, Cyborg or Citizen?" />
        <link href="/icon.png" rel="icon" type="image/x-icon"/>
      </Head>

      <main className={styles.main}>
        <Wallet />
        
      </main>

      <footer className={styles.footer}>
        <Link href="https://www.cryptocloudpunks.com/" rel="noopener noreferrer" target="_blank">CCP Website |</Link>
        
        <Link href="https://etherscan.io/address/0xc05B2990B0d1103CC08Df5bf7cde9B58ac36D8fF" rel="noopener noreferrer" target="_blank"> Citizen Contract :</Link>
        <Link href="https://opensea.io/assets/ethereum/0xc05b2990b0d1103cc08df5bf7cde9b58ac36d8ff/" rel="noopener noreferrer" target="_blank"> Collection |</Link>

        <Link href="https://etherscan.io/address/0x82895fE2945A8B19c5E511E5AA90Da3Aa27331eA" rel="noopener noreferrer" target="_blank"> Cyborg Contract :</Link>
        <Link href="https://opensea.io/assets/ethereum/0x82895fE2945A8B19c5E511E5AA90Da3Aa27331eA/" rel="noopener noreferrer" target="_blank"> Collection</Link>
      </footer>
    </div>
  );
};

export default Home;
