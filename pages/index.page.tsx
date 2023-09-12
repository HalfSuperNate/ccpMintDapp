import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React from 'react';
import Wallet from './wallet.page';
import Link from 'next/link';

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
        <Link href="https://polygonscan.com/address/0x60c3fc3819d6b7c1096338cf6149f1770b6af161" rel="noopener noreferrer" target="_blank"> Contract |</Link>
        <Link href="https://opensea.io/assets/matic/0x60c3fc3819d6b7c1096338cf6149f1770b6af161/" rel="noopener noreferrer" target="_blank"> Collection</Link>
      </footer>
    </div>
  );
};

export default Home;
