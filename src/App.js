import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Airdrop from './components/pages/Airdrop';
import Balance from './components/pages/Balance';
import Keypair from './components/pages/Keypair';
import Transfer from './components/pages/Transfer';
import Wallet from './components/pages/Wallet';
import Sidebar from './components/Sidebar';
import { NetworkProvider } from './contexts/NetworkProvider';

function App() {
  return (
    <Router>
      <NetworkProvider>
        <Header />
        <div className="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-16 mt-16">
          <Sidebar />
          <section className="w-full lg:w-4/5">
            <Routes>
              <Route path="/keypair" element={<Keypair />} />
              <Route path="/balance" element={<Balance />} />
              <Route path="/airdrop" element={<Airdrop />} />
              <Route path="/transfer" element={<Transfer />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="*" element={<Navigate to="/keypair" replace />} />
            </Routes>
          </section>
        </div>
      </NetworkProvider>
    </Router>
  );
}

export default App;
