import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export const MENU_OPTIONS = [
  { id: 1, name: 'keypair' },
  { id: 2, name: 'balance' },
  { id: 3, name: 'airdrop' },
  { id: 4, name: 'transfer' },
];

export default function useMenu() {
  let initialPath = MENU_OPTIONS[0].id;
  const path = useLocation().pathname.replace('/', '');
  const matchingPath = MENU_OPTIONS.filter((item) => item.name === path);
  if (matchingPath.length) {
    initialPath = matchingPath[0].id;
  }

  const [active, setActive] = useState(initialPath);

  function switchTo(newValue) {
    setActive(newValue);
  }

  return [active, switchTo];
}
