import Header from './Header';
import TransactionForm from './TransactionForm';

function Layout() {
  return (
    <div className="d-flex flex-column vh-100">
      <Header />
      <div className="container-fluid py-4 flex-grow-1 max-w-xl">
        <TransactionForm />
      </div>
    </div>
  );
}

export default Layout;
