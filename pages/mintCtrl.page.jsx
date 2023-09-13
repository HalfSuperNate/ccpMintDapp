import React, { useState } from 'react';
import { useAccount, useContractWrite } from 'wagmi';
import { useIsMounted } from './useIsMounted';
import { BatchSupply, BatchCost } from './readContract';
import { _abi, _abiAddress } from './abiGet';
import styles from '../styles/Home.module.css';

function MintComponent() {
    const { address } = useAccount();
    const mounted = useIsMounted();
    const _bCost = BatchCost(0, address);
    const _bSupply = BatchSupply(0);
    const [quantity, setQuantity] = useState(1);
    const [walletAddress, setWalletAddress] = useState('');

    const { data, isLoading, isSuccess, write } = useContractWrite({
        address: _abiAddress,
        abi: _abi,
        functionName: '_mintInOrder',
        args: [walletAddress, quantity, 0, []],
        value: (parseInt(_bCost) * quantity).toString(),
    });

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncreaseQuantity = () => {
        if (quantity < 15) {
            setQuantity(quantity + 1);
        }
    };

    const handleWalletChange = (event) => {
        setWalletAddress(event.target.value);
    };

    const handleMintClick = () => {
        // Perform minting logic here
        if (!address) {
            return;
        }
        if (walletAddress.length !== 42) {
            alert("The input value must be 42 characters long, inserting connected wallet by default");
            setWalletAddress(address);
        } else {
            try {
                //write(); // Call the write function
                alert(`This would have minted ${quantity} NFTs!`);
            } catch (error) {
                console.error('Error while minting:', error);
                alert('An error occurred while minting. Please try again later.');
            }
        }
    };

    return (
        <div className={styles.mintContainer}>
            <div className={styles.quantityControl}>
                <img
                    src="/left_arrow.png"
                    alt="Decrease Quantity"
                    onClick={handleDecreaseQuantity}
                    className={styles.arrowButton}
                    disabled={quantity === 1}
                />
                <img
                    src={`/${quantity}.png`}
                    alt={`Quantity: ${quantity}`}
                    className={styles.quantityImage}
                />
                <img
                    src="/right_arrow.png"
                    alt="Increase Quantity"
                    onClick={handleIncreaseQuantity}
                    className={styles.arrowButton}
                    disabled={quantity === 15}
                />
            </div>
            <div className={styles.mintToControl}>
                <br></br>
                <input
                    type="text"
                    value={walletAddress}
                    onChange={handleWalletChange}
                    placeholder="Wallet Address"
                />
            </div>
            <div className={styles.mintCostSupply}>
                {mounted && _bCost >= 0 ? (
                    <p>Total: {((parseInt(_bCost) * quantity) / 10**18)} Eth</p>
                ) : null}
                {mounted ? _bSupply && <p>Supply: {(parseInt(_bSupply) - 1)} / 4000</p> : null}
            </div>
            <div className={styles.mintButton}>
                <img
                    src="/mint.png"
                    alt="Mint Button"
                    onClick={handleMintClick}
                    className={styles.mintButton}
                />
            </div>
            
        </div>
    );
}

export default MintComponent;