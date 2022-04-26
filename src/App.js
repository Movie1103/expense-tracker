import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import './index.css';
import Home from './pages/Home';
import TransactionAction from './pages/TransactionAction';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="home" element={<Home />} />
        <Route path="new" element={<TransactionAction />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Route>
    </Routes>
    // {/* <Home /> */}
  );
}

export default App;
