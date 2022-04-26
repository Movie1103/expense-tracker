import React from 'react'

function TransactionForm() {
  return (
    <div className="border bg-white rounded-2 p-3">
      <form className="row g-3">
        <div className="col-6">
          <input 
            type="radio" 
            className="btn-check"
            id="cbx-expense"
            name="type"
            defaultChecked
          />
          <label 
            className="btn btn-outline-danger rounded-0 rounded-start"
            htmlFor="cbx-expense" 
          >Expense</label>
          <input 
            type="radio" 
            className="btn-check"
            id="cbx-income"
            name="type"
          />
          <label 
            className="btn btn-outline-success rounded-0 rounded-end"
            htmlFor="cbx-income" 
          >Income</label>
        </div>

        <div className="col-6 d-flex justify-content-end">
          <i className="fa-solid fa-xmark" role="button"></i>
        </div>

        <div className="col-sm-6">
          <label className="form-label">Payee</label>
          <input type="text" className="form-control" />
        </div>

        <div className="col-sm-6">
          <label className="form-label">Category</label>
          <select className="form-select">
            <option>Food</option>
            <option>Transport</option>
          </select>
        </div>

        <div className="col-sm-6">
          <label className="form-label">Amount</label>
          <input type="text" className="form-control" />
        </div>

        <div className="col-sm-6">
          <label className="form-label">Date</label>
          <input type="date" className="form-control" />
        </div>

        <div className="col-12">
          <div className="d-grid mt-3">
            <button className="btn btn-primary">Save</button>
          </div>
        </div>

      </form>
    </div>
  )
}

export default TransactionForm;