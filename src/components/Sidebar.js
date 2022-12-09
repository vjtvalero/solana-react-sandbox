import React from 'react';
import { Link } from 'react-router-dom';
import useMenu from '../hooks/useMenu';

export default function Sidebar() {
  const [active, setActive] = useMenu();

  return (
    <div className="w-full lg:w-1/5 px-6 text-xl text-gray-800 leading-normal">
      <p className="text-base font-bold py-2 lg:pb-6 text-gray-700">Basic Functions</p>
      <div
        className="w-full sticky inset-0 hidden max-h-64 lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:block mt-0 my-2 lg:my-0 border border-gray-400 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-20"
        style={{ top: '6em' }}
      >
        <ul className="list-reset py-2 md:py-0">
          <MenuLink text="Keypair" active={active === 1} onClick={() => setActive(1)} to="/keypair" />
          <MenuLink text="Balance" active={active === 2} onClick={() => setActive(2)} to="/balance" />
          <MenuLink text="Airdrop SOL" active={active === 3} onClick={() => setActive(3)} to="/airdrop" />
          <MenuLink text="Transfer" active={active === 4} onClick={() => setActive(4)} to="/transfer" />
        </ul>
      </div>

      <br />

      <p className="text-base font-bold py-2 lg:pb-6 text-gray-700">Connect Wallet</p>
      <div
        className="w-full sticky inset-0 hidden max-h-64 lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:block mt-0 my-2 lg:my-0 border border-gray-400 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-20"
        style={{ top: '6em' }}
      >
        <ul className="list-reset py-2 md:py-0">
          <MenuLink text="Phantom" active={active === 5} onClick={() => setActive(5)} to="/wallet" />
        </ul>
      </div>
    </div>
  );
}

function MenuLink({ active, text, onClick, to }) {
  return (
    <li
      className={`py-1 md:my-2 hover:bg-purple-100 lg:hover:bg-transparent border-l-4 border-transparent ${
        active ? 'font-bold border-purple-600' : ''
      }`}
      onClick={onClick}
    >
      <Link to={to} className="block pl-4 align-middle text-gray-700 no-underline hover:text-purple-600">
        <span className="pb-1 md:pb-0 text-sm">{text}</span>
      </Link>
    </li>
  );
}
