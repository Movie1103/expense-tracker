import { useContext } from 'react';
import { TransactionContext } from '../contexts/TransactionContext';
import Transaction from './Transaction';
function TransactionList() {
  const { transactions } = useContext(TransactionContext);
  return (
    <ul className="list-group">
      {transactions.map((el) => (
        <Transaction key={el.id} transaction={el} />
      ))}
    </ul>
  );
}

export default TransactionList;
