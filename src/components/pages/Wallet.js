import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Spinner from '../utils/Spinner';

export default function Wallet() {
  const [provider, setProvider] = useState(null);
  const [walletKey, setWalletKey] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const provider = getProvider();
    if (provider) setProvider(provider);
    else setProvider(undefined);
  }, []);

  const getProvider = () => {
    if ('solana' in window) {
      const provider = window.solana;
      if (provider.isPhantom) return provider;
    }

    return null;
  };

  const connectWallet = async () => {
    const { solana } = window;
    if (solana) {
      try {
        const response = await solana.connect();
        setWalletKey(response.publicKey.toString());
      } catch (err) {
        setMessage(err.message);
      }
    }
  };

  return (
    <div>
      <h1 className="flex items-center font-sans font-bold break-normal text-gray-700 px-2 text-xl mt-12 lg:mt-0 md:text-2xl">
        Connect Wallet
      </h1>
      <hr className="bg-gray-300 my-12" />
      <div className="p-8 mt-6 lg:mt-0 leading-normal rounded shadow bg-white">
        {provider && !walletKey && (
          <button
            className="flex items-center mr-3 shadow bg-purple-700 hover:bg-purple-500 focus:shadow-outline focus:outline-none text-white text-sm md:text-base font-bold py-2 px-4 rounded"
            onClick={connectWallet}
          >
            Connect Phantom Wallet
          </button>
        )}
        {provider && walletKey && <Connected walletKey={walletKey} />}

        {!provider && (
          <p>
            No provider found. Install{' '}
            <a href="https://phantom.app/" className="text-blue-500" target="_blank" rel="noopener noreferrer">
              Phantom Browser extension
            </a>
          </p>
        )}

        {message && <p className="text-red-500">{message}</p>}
      </div>
    </div>
  );
}

function Connected({ walletKey }) {
  return (
    <>
      <p>Connected account! Your public address: {walletKey}</p>
      <p>
        Click here to{' '}
        <a href={`/transfer?to=${walletKey}`} className="text-blue-500">
          transfer
        </a>{' '}
        or{' '}
        <a href={`/airdrop?to=${walletKey}`} className="text-blue-500">
          airdrop
        </a>{' '}
        SOL to this wallet
      </p>
    </>
  );
}
