export const FETCH_TRANSACTION = 'FETCH_TRANSACTION';
export const DELETE_TRANSACTION = 'DELETE_TRANSACTION';
export const CREATE_TRANSACTION = 'CREATE_TRANSACTION';

export function transactionReducer(state, action) {
  switch (action.type) {
    case FETCH_TRANSACTION: {
      // dispatch({ type: FETCH_TRANSACTION, value: {trasactions: [] }})
      return action.value.transactions;
    }
    // case CREATE_TRANSACTION: {
    //   // dispatch({ type: CREATE_TRANSACTION, value: { transaction: newTransaction }})
    // }
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
