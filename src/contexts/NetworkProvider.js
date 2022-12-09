import { createContext, useState } from 'react';

export const NetworkContext = createContext(null);

export function NetworkProvider({ children }) {
  const [network, setNetwork] = useState('devnet');
  return <NetworkContext.Provider value={{ network, setNetwork }}>{children}</NetworkContext.Provider>;
}
