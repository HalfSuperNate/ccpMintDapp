import React, { useState, useEffect } from 'react';
import { useAccount,useBalance } from 'wagmi';
import { useIsMounted } from './useIsMounted';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { BatchSupply, BatchCost } from './readContract';
import MintComponent from './mintCtrl.page';
import styles from '../styles/Home.module.css';
 
function Wallet() {
    const mounted = useIsMounted();
    const { address} = useAccount();
    const [isConnected, setIsConnected] = useState(false);
    // const { data } = useBalance({
    //     address: address,
    // })
    const bSupply = BatchSupply(0);
    const bCost = BatchCost(0, address);

    useEffect(() => {
        // Check if address is not null or empty to determine if the wallet is connected
        setIsConnected(!!address);
    }, [address]);

    return (
        <div className={styles.web3Container}>
            <img
                src="/cyborg.png"
                alt="Citizen"
                className={styles.citizen}
            />
            <div className={styles.logoContainer}>
                <img
                    src="/icon.png"
                    alt="CCP"
                    className={styles.ccpLogo}
                />
            </div>
            <div className={`${styles.rainbowContainer} ${isConnected ? styles.connected : styles.disconnected}`}>
                <ConnectButton label="" accountStatus="" chainStatus="none" showBalance={false}/>
            </div>
            <div className={styles.detailsContainer}>
                {/* {mounted ? address && <p>Wallet: {address}</p> : null} */}
                {/* {mounted ? data && <p>Balance: {data?.formatted} {data?.symbol}</p> : null} */}
                {mounted ? bSupply && <p>Supply: {(parseInt(bSupply) - 1)} / 4000</p> : null}
                {mounted ? bCost >= 0 && <p>Cost Per Token: {parseInt(bCost) / 10**18} Eth</p> : null}
            </div>
            <MintComponent />
        </div>
    );
  
}

export default Wallet;