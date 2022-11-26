import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Airdrop from './components/pages/Airdrop';
import Balance from './components/pages/Balance';
import Keypair from './components/pages/Keypair';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-16 mt-16">
          <Sidebar />
          <section className="w-full lg:w-4/5">
            <Routes>
              <Route path="/" element={<Navigate to="/keypair" replace />} />
              <Route path="/keypair" element={<Keypair />} />
              <Route path="/balance" element={<Balance />} />
              <Route path="/airdrop" element={<Airdrop />} />
            </Routes>
          </section>
        </div>
      </div>
    </Router>
  );
}

export default App;
