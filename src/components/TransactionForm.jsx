import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import validator from 'validator';
import { TransactionContext } from '../contexts/TransactionContext';
import { DELETE_TRANSACTION, FETCH_TRANSACTION } from '../reducers/transactionReducer';

const INCOME = 'INCOME';
const EXPENSE = 'EXPENSE';

function TransactionForm() {
  const [notFoundError, setNotFoundError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryType, setCategoryType] = useState(EXPENSE);

  const [payee, setPayee] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [error, setError] = useState({});

  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  // console.log(categories);
  // console.log(transaction);
  // console.log(payee);
  // console.log(amount);
  // console.log(date);
  // console.log(categoryId);

  const { dispatch } = useContext(TransactionContext);

  const navigate = useNavigate();
  const params = useParams();
  // const location = useLocation();
  // console.log(location);

  useEffect(() => {
    if (params.transactionId) {
      axios
        .get('http://localhost:8080/transactions/' + params.transactionId)
        .then((res) => {
          if (res.data.transaction === null) {
            setNotFoundError(true);
          } else {
            // const {
            //    payee,
            //    amount,
            //    date,
            //    category: { id, type }
            //   } = res.data.transaction
            setCategoryType(res.data.transaction.category.type);
            setCategoryId(res.data.transaction.category.id);
            setPayee(res.data.transaction.payee);
            setAmount('' + res.data.transaction.amount);
            setDate(res.data.transaction.date.slice(0, 10));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [params.transactionId]);

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await axios.get('http://localhost:8080/categories');
      const resultExpenses = res.data.categories.filter((el) => el.type === EXPENSE);
      const resultIncomes = res.data.categories.filter((el) => el.type === INCOME);
      setExpenses(resultExpenses);
      setIncomes(resultIncomes);
      if (categoryType === EXPENSE) {
        setCategoryId(resultExpenses.id);
      } else {
        setCategoryId(resultIncomes.id);
      }
    };
    fetchCategory();
  }, []);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    // validate input before request to server
    const inputError = {};
    if (validator.isEmpty(payee)) {
      inputError.payee = 'Payee is required';
    }
    if (validator.isEmpty(amount)) {
      inputError.amount = 'Amount is required';
    } else if (!validator.isNumeric(amount)) {
      inputError.amount = 'Amount must be numeric';
    } else if (amount <= 0) {
      inputError.amount = 'Amount must be greater than zero';
    }
    if (validator.isEmpty(date)) {
      inputError.date = 'Date is required';
    }
    if (Object.keys(inputError).length > 0) {
      setError(inputError);
    } else {
      setError({});
    }
    try {
      const body = {
        payee: payee,
        categoryId: categoryId,
        amount: +amount,
        date: date,
      };
      if (params.transactionId) {
        await axios.put('http://localhost:8080/transactions/' + params.transactionId, body);
      } else {
        await axios.post('http://localhost:8080/transactions', body);
      }
      const res = await axios.get('http://localhost:8080/transactions');
      dispatch({
        type: FETCH_TRANSACTION,
        value: { transactions: res.data.transactions },
      });
      navigate('/home');
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickDelete = async () => {
    try {
      setLoading(true);
      await axios.delete('http://localhost:8080/transactions/' + params.transactionId);
      dispatch({
        type: DELETE_TRANSACTION,
        value: { id: params.transactionId },
      });
      setLoading(false);
      navigate('/home');
    } catch (err) {
      console.log(err);
    }
  };

  if (notFoundError === true) return <h1 className="text-white">404 !!! Transaction not found!</h1>;

  return (
    <>
      <div className="border bg-white rounded-2 p-3">
        <form className="row g-3" onSubmit={handleSubmitForm}>
          <div className="col-6">
            <input
              type="radio"
              className="btn-check"
              id="cbx-expense"
              name="type"
              checked={categoryType === EXPENSE}
              onChange={() => {
                setCategoryType(EXPENSE);
                setCategoryId(expenses[0].id);
              }}
            />
            <label className="btn btn-outline-danger rounded-0 rounded-start" htmlFor="cbx-expense">
              Expense
            </label>
            <input
              type="radio"
              className="btn-check"
              id="cbx-income"
              name="type"
              onChange={() => {
                setCategoryType(INCOME);
                setCategoryId(incomes[0].id);
              }}
              checked={categoryType === INCOME}
            />
            <label className="btn btn-outline-success rounded-0 rounded-end" htmlFor="cbx-income">
              Income
            </label>
          </div>

          <div className="col-6 d-flex justify-content-end">
            <i className="fa-solid fa-xmark" role="button"></i>
          </div>

          <div className="col-sm-6">
            <label className="form-label">Payee</label>
            <input
              type="text"
              className={`form-control ${error.payee ? 'is-invalid' : ''}`}
              value={payee}
              onChange={(e) => setPayee(e.target.value)}
            />
            {error.payee && <div className="invalid-feedback">{error.payee}</div>}
          </div>

          <div className="col-sm-6">
            <label className="form-label">Category</label>
            <select className="form-select" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              {(categoryType === EXPENSE ? expenses : incomes).map((el) => (
                <option key={el.id} value={el.id}>
                  {el.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-sm-6">
            <label className="form-label">Amount</label>
            <input
              type="text"
              className={`form-control ${error.amount ? 'is-invalid' : ''}`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {error.amount && <div className="invalid-feedback">{error.amount}</div>}
          </div>

          <div className="col-sm-6">
            <label className="form-label">Date</label>
            <input
              type="date"
              className={`form-control ${error.date ? 'is-invalid' : ''}`}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            {error.date && <div className="invalid-feedback">{error.date}</div>}
          </div>

          <div className="col-12">
            <div className="d-grid mt-3">
              <button className="btn btn-primary">Save</button>
            </div>
          </div>
        </form>
      </div>
      {params.transactionId && (
        <div className="d-grid mt-5">
          <button className="btn btn-danger" onClick={handleClickDelete} disabled={loading}>
            Delete Transaction
          </button>
        </div>
      )}
    </>
  );
}

export default TransactionForm;
