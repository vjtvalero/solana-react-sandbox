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
import Spinner from '../utils/Spinner';
window.Buffer = window.Buffer || require('buffer').Buffer;

export default function Transfer() {
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [toPublicKey, setToPublicKey] = useState('');
  const [balance, setBalance] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [signature, setSignature] = useState('');
  const { network } = useContext(NetworkContext);

  async function transfer() {
    try {
      setBalance(null);
      if (!publicKey) {
        throw new Error('Please enter a valid public key.');
      }
      if (!publicKey) {
        throw new Error('Please enter a valid private key.');
      }
      if (!toPublicKey) {
        throw new Error('Please enter a valid public key.');
      }
      setMessage('');
      setLoading(true);

      const connection = new Connection(clusterApiUrl(network), 'confirmed');
      const fromSecretKey = Uint8Array.from(privateKey.split(',').map(Number));
      const from = Keypair.fromSecretKey(fromSecretKey);

      // Send money from "from" wallet and into "to" wallet
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(publicKey),
          toPubkey: new PublicKey(toPublicKey),
          lamports: LAMPORTS_PER_SOL / 100,
        })
      );

      // Sign transaction
      const signature = await sendAndConfirmTransaction(connection, transaction, [from]);
      setSignature(signature);

      // get the new balance
      const walletBalance = await connection.getBalance(new PublicKey(publicKey));
      setBalance(parseInt(walletBalance) / LAMPORTS_PER_SOL);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="flex items-center font-sans font-bold break-normal text-gray-700 px-2 text-xl mt-12 lg:mt-0 md:text-2xl">
        Transfer SOL
      </h1>
      <hr className="bg-gray-300 my-12" />
      <h2 id="section1" className="font-sans font-bold break-normal text-gray-700 px-2 pb-8 text-xl">
        Transfer SOL
      </h2>
      <div className="p-8 mt-6 lg:mt-0 leading-normal rounded shadow bg-white">
        <div className="grid grid-cols-5 gap-10">
          <div className="col-span-2">
            <p className="mb-3 text-gray-500">From:</p>
            <div className="mb-3">
              <label htmlFor="publicKey" className="form-label inline-block mb-2 text-gray-700">
                Enter Public Key
              </label>
              <input
                type="text"
                className="
                form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
                id="publicKey"
                placeholder="Public Key"
                onChange={(e) => setPublicKey(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="privateKey" className="form-label inline-block mb-2 text-gray-700">
                Enter Private Key
              </label>
              <input
                type="text"
                className="
                form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
                id="privateKey"
                placeholder="Private Key"
                onChange={(e) => setPrivateKey(e.target.value)}
              />
            </div>
            <br />
            <p className="mb-3 text-gray-500">To:</p>
            <div className="mb-3">
              <label htmlFor="toPublicKey" className="form-label inline-block mb-2 text-gray-700">
                Enter Public Key
              </label>
              <input
                type="text"
                className="
                form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
                id="toPublicKey"
                placeholder="Public Key"
                onChange={(e) => setToPublicKey(e.target.value)}
              />
            </div>
            <button
              className="flex items-center mt-6 shadow bg-purple-700 hover:bg-purple-500 focus:shadow-outline focus:outline-none text-white text-sm md:text-base font-bold py-2 px-4 rounded"
              onClick={transfer}
            >
              Transfer
            </button>
          </div>
          <div className="col-span-3">
            {loading ? (
              <Spinner />
            ) : (
              <>
                <p>New balance: {balance}</p>
                <br />
                <p className="break-words">Signature: {signature}</p>
                <br />
                {signature && (
                  <p className="break-words">
                    Explore transaction:{' '}
                    <a
                      href={`${process.env.REACT_APP_EXPLORER_URL}/tx/${signature}?cluster=${network}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >{`${process.env.REACT_APP_EXPLORER_URL}/tx/${signature}?cluster=${network}`}</a>
                  </p>
                )}
              </>
            )}
            <p className="mt-3 text-red-500">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
