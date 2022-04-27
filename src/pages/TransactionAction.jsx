import React from 'react';
import { useParams } from 'react-router-dom';
import TransactionForm from '../components/TransactionForm';

function TransactionAction() {
  // const params = useParams();
  // console.log(params);

  return <TransactionForm />;
}

export default TransactionAction;
