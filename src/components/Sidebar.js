import React from 'react';
import { Link } from 'react-router-dom';
import useMenu from '../hooks/useMenu';

export default function Sidebar() {
  const [active, setActive] = useMenu();

  return (
    <div className="w-full lg:w-1/5 px-6 text-xl text-gray-800 leading-normal">
      <p className="text-base font-bold py-2 lg:pb-6 text-gray-700">Challenge 1</p>
      <div className="block lg:hidden sticky inset-0">
        <button
          id="menu-toggle"
          className="flex w-full justify-end px-3 py-3 bg-white lg:bg-transparent border rounded border-gray-600 hover:border-purple-600 appearance-none focus:outline-none"
        >
          <svg className="fill-current h-3 float-right" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </button>
      </div>
      <div
        className="w-full sticky inset-0 hidden max-h-64 lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:block mt-0 my-2 lg:my-0 border border-gray-400 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-20"
        style={{ top: '6em' }}
        id="menu-content"
      >
        <ul className="list-reset py-2 md:py-0">
          <MenuLink text="Keypair" active={active === 1} onClick={() => setActive(1)} to="/keypair" />
          <MenuLink text="Balance" active={active === 2} onClick={() => setActive(2)} to="/balance" />
          <MenuLink text="Airdrop SOL" active={active === 3} onClick={() => setActive(3)} to="/airdrop" />
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
