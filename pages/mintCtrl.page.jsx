import React, { useState } from 'react';
import { useAccount, useContractWrite } from 'wagmi';
import { useIsMounted } from './useIsMounted';
import { BatchSupply, BatchCost, BatchSupplyCY, BatchCostCY } from './readContract';
import { _abi, _abiAddress, _tierWallets, GetContractAddy } from './abiGet';
import { MerkleTree } from 'merkletreejs';
import { keccak256 } from 'ethers';
import { useCitizen } from './imageSelector';
import styles from '../styles/Home.module.css';

function GetProof(address) {
    if(!address) return [];
    // Convert the wallet addresses to an array of strings
    const walletAddresses = _tierWallets.map(x => keccak256(x));
    const merkleTree = new MerkleTree(walletAddresses, keccak256, { sortPairs: true });

    // Get the index of the wallet address you want to generate a proof for
    const wallet = walletAddresses.find(w => w.toLowerCase() === keccak256(address));
    if(wallet){
        // Generate a proof for the specified wallet;
        const proof = merkleTree.getHexProof(wallet);
        // Print the proof
        console.log("Proof:", proof);
        return proof;
    } else {
        console.error(`Wallet ${address} not found in the list.`);
        return [];
    }
}


function MintComponent() {
    const { address } = useAccount();
    const mounted = useIsMounted();
    const [quantity, setQuantity] = useState(1);
    const [walletAddress, setWalletAddress] = useState('');
    var proof = GetProof(address);
    const isOnTier = proof.length > 0;
    const _bCost = BatchCost(0, isOnTier, 0, address);
    const _bSupply = BatchSupply(0);
    const _bCostCY = BatchCostCY(0, isOnTier, 0, address);
    const _bSupplyCY = BatchSupplyCY(0);

    const { data, isLoading, isSuccess, write } = useContractWrite({
        address: GetContractAddy(),
        abi: _abi,
        functionName: '_mintInOrder',
        args: [walletAddress, quantity, 0, proof],
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
        proof = GetProof(event.target.value);
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
                write(); // Call the write function
                //alert(`This would have minted ${quantity} NFTs!`);
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
                {mounted && _bCost >= 0 && useCitizen ? (
                    <p>Total: {((parseInt(_bCost) * quantity) / 10**18)} Eth</p>
                ) : null}
                {mounted && useCitizen ? _bSupply && <p>Supply: {((JSON.parse(_bSupply)[2]) - 1)} / 4000</p> : null}
                
                {mounted && _bCostCY >= 0 && !useCitizen ? (
                    <p>Total: {((parseInt(_bCostCY) * quantity) / 10**18)} Eth</p>
                ) : null}
                {mounted && !useCitizen ? _bSupplyCY && <p>Supply: {((JSON.parse(_bSupplyCY)[2]) - 1)} / 4000</p> : null}
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