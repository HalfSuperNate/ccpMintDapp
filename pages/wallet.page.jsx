import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import MintComponent from './mintCtrl.page';
import { useCitizen, toggleUseCitizen } from './imageSelector';
import styles from '../styles/Home.module.css';
  
function Wallet() {
  const { address } = useAccount();
  const [isConnected, setIsConnected] = useState(false);
  const [selectedImage, setSelectedImage] = useState('citizen.gif'); // Initial image

  useEffect(() => {
    // Check if address is not null or empty to determine if the wallet is connected
    setIsConnected(!!address);
  }, [address]);

  const handleImageChange = (event) => {
    // Update the selected image based on the radio button value
    const newImage = event.target.value;
    setSelectedImage(newImage);

    toggleUseCitizen();
  };

  return (
    <div className={styles.web3Container}>
      <div className={styles.logoContainer}>
        <img src="/icon.png" alt="CCP" className={styles.ccpLogo} />
      </div>
      <div
        className={`${styles.rainbowContainer} ${
          isConnected ? styles.connected : styles.disconnected
        }`}
      >
        <ConnectButton label="" accountStatus="" chainStatus="none" showBalance={false} />
      </div>
      <div className={styles.radioContainer}>
        {/* Radio buttons */}
        <label>
          <input
            type="radio"
            value="citizen.gif"
            checked={selectedImage === 'citizen.gif'}
            onChange={handleImageChange}
          />
          Citizen
        </label>
        <label>
          <input
            type="radio"
            value="cyborg.gif"
            checked={selectedImage === 'cyborg.gif'}
            onChange={handleImageChange}
          />
          Cyborg
        </label>
      </div>
      <div className={styles.featureImageContainer}>
        {/* Feature image */}
        <img src={`/${selectedImage}`} alt="Feature Img" className={styles.featureImage} />
      </div>
      <MintComponent />
    </div>
  );
}

export default Wallet;
