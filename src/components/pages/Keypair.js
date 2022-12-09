import { Keypair, PublicKey } from '@solana/web3.js';
import React, { useState } from 'react';

export default function KeypairPage() {
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  function generate() {
    const newPair = new Keypair();
    const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
    const privateKey = newPair._keypair.secretKey;
    setPublicKey(publicKey);
    setPrivateKey(privateKey);
  }

  return (
    <div>
      <h1 className="flex items-center font-sans font-bold break-normal text-gray-700 px-2 text-xl mt-12 lg:mt-0 md:text-2xl">
        Keypair
      </h1>
      <hr className="bg-gray-300 my-12" />
      <h2 id="section1" className="font-sans font-bold break-normal text-gray-700 px-2 pb-8 text-xl">
        Generate Keypair
      </h2>
      <div className="p-8 mt-6 lg:mt-0 leading-normal rounded shadow bg-white">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1">
            <button
              className="flex items-center mr-3 shadow bg-purple-700 hover:bg-purple-500 focus:shadow-outline focus:outline-none text-white text-sm md:text-base font-bold py-2 px-4 rounded"
              onClick={generate}
            >
              Generate
            </button>
          </div>
          <div className="col-span-3">
            <div className="mb-3 xl:w-2/3">
              <label htmlFor="publicKey" className="form-label inline-block mb-2 text-gray-700">
                Public Key
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
                readOnly
                value={publicKey}
              />
            </div>
            <div className="mb-3 xl:w-2/3">
              <label htmlFor="privateKey" className="form-label inline-block mb-2 text-gray-700">
                Private Key
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
                readOnly
                value={privateKey}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
