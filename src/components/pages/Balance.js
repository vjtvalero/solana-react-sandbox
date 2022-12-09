import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import React, { useContext, useState } from 'react';
import { NetworkContext } from '../../contexts/NetworkProvider';
import Spinner from '../utils/Spinner';

export default function Balance() {
  const [publicKey, setPublicKey] = useState('');
  const [balance, setBalance] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { network } = useContext(NetworkContext);

  async function getBalance() {
    try {
      setBalance(null);
      if (!publicKey) {
        throw new Error('Please enter a valid public key.');
      }
      setMessage('');
      setLoading(true);
      const connection = new Connection(clusterApiUrl(network), 'confirmed');
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
        Balance
      </h1>
      <hr className="bg-gray-300 my-12" />
      <h2 id="section1" className="font-sans font-bold break-normal text-gray-700 px-2 pb-8 text-xl">
        Get Wallet Balance
      </h2>
      <div className="p-8 mt-6 lg:mt-0 leading-normal rounded shadow bg-white">
        <div className="grid grid-cols-5 gap-10">
          <div className="col-span-2">
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
            <button
              className="flex items-center mt-6 shadow bg-purple-700 hover:bg-purple-500 focus:shadow-outline focus:outline-none text-white text-sm md:text-base font-bold py-2 px-4 rounded"
              onClick={getBalance}
            >
              Get Balance
            </button>
          </div>
          <div className="col-span-3">
            <p>Balance:</p>
            {loading ? <Spinner /> : <p className="mt-3">{balance}</p>}
            <p className="mt-3 text-red-500">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
