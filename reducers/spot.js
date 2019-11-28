import { FETCH_SPOT } from '../actions/spot'

const spotReducer = (state, action) => {
  switch (action.type) {
    case FETCH_SPOT:
      return { ...state, spot: action.payload }
    default:
      return state
  }
}

export default spotReducer