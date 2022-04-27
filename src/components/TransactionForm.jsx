import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { TransactionContext } from '../contexts/TransactionContext';
import { DELETE_TRANSACTION } from '../reducers/transactionReducer';

const INCOME = 'INCOME';
const EXPENSE = 'EXPENSE';

function TransactionForm() {
  const [transaction, setTransaction] = useState({});
  const [notFoundError, setNotFoundError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryType, setCategoryType] = useState(EXPENSE);
  const [payeeInput, setPayeeInput] = useState('');
  const [amountInput, setAmountInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  // console.log(dateInput);

  // console.log(transaction);

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
            setTransaction(res.data.transaction);
            setPayeeInput(res.data.transaction.payee);
            setAmountInput(res.data.transaction.amount);
            setDateInput(res.data.transaction.date);
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
      setCategories(res.data.categories);
    };
    fetchCategory();
  }, []);

  const handleSubmitForm = (event) => {
    event.preventDefault();
    navigate('/home');
  };

  const handleClickDelete = async () => {
    try {
      setLoading(true);
      await axios.get('http://localhost:8080/transactions/' + params.transactionId);
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

  const filterCategories = categories.filter((el) => el.type === categoryType);

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
              defaultChecked
              onChange={() => setCategoryType(EXPENSE)}
            />
            <label className="btn btn-outline-danger rounded-0 rounded-start" htmlFor="cbx-expense">
              Expense
            </label>
            <input
              type="radio"
              className="btn-check"
              id="cbx-income"
              name="type"
              onChange={() => setCategoryType(INCOME)}
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
              className="form-control"
              value={payeeInput}
              onChange={(event) => setPayeeInput(event.target.value)}
            />
          </div>

          <div className="col-sm-6">
            <label className="form-label">Category</label>
            <select className="form-select">
              {filterCategories.map((el) => (
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
              className="form-control"
              value={amountInput}
              onChange={(event) => setAmountInput(event.target.value)}
            />
          </div>

          <div className="col-sm-6">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              value={dateInput.slice(0, 10)}
              onChange={(event) => setDateInput(event.target.value)}
            />
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
          <button className="btn btn-danger" onClick={handleClickDelete}>
            Delete Transaction
          </button>
        </div>
      )}
    </>
  );
}

export default TransactionForm;
