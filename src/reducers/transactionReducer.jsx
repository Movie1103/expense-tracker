const FETCH_TRANSACTION = 'FETCH_TRANSACTION';
const DELETE_TRANSACTION = 'DELETE_TRANSACTION';

function transactionReducer(state, action) {
  switch (action.type) {
    case FETCH_TRANSACTION: {
      // dispatch({ type: FETCH_TRANSACTION, value: {trasactions: [] }})
      return action.value.transactions;
    }
    case DELETE_TRANSACTION: {
      // dispatch({ type: DELETE_TRANSACTION, value: { id: 'f912b5ca-4a36-42be-983e-c06df51b5792' } })
      const idx = state.findIndex((el) => el.id === action.value.id);
      if (idx !== -1) {
        const cloneState = [...state];
        cloneState.splice(idx, 1);
        return cloneState;
      }
      return state;
    }
    default:
      return state;
  }
}

export { transactionReducer, FETCH_TRANSACTION, DELETE_TRANSACTION };
