import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatThaiCurrency } from '../utils/currency';
import { formatShortDate } from '../utils/date';

function Transaction({ transaction }) {
  const {
    id,
    payee,
    amount,
    date,
    category: { name, type },
  } = transaction;
  const dateObj = new Date(date);
  const navigate = useNavigate();
  return (
    <li
      className={`list-group-item d-flex bd-callout bd-callout-${type === 'EXPENSE' ? 'danger' : 'success'}`}
      onClick={() => navigate('/transaction/' + id, { state: transaction })}
    >
      <div className="d-flex flex-fill" role="button">
        <div className="border border-1 boder-dark rounded-2 bg-warning p-2 text-center w-15">
          <p className="p-0 m-0 text-black-50 text-3">{formatShortDate(dateObj)}</p>
          <p className="p-0 m-0">{dateObj.getDate()}</p>
        </div>
        <div className="d-flex justify-content-between align-items-center ps-4 flex-fill">
          <div>
            <p className="mb-1 fw-bold">{payee}</p>
            <p className="mb-1 text-3 text-black-50">{name}</p>
          </div>
          <span
            className={`badge bg-${type === 'EXPENSE' ? 'danger' : 'success'}
          }`}
          >
            {formatThaiCurrency(amount)}
          </span>
        </div>
      </div>
    </li>
  );
}

export default Transaction;
