import { SET_CART } from '../actions/cart'

const cartReducer = (state, action) => {
  switch (action.type) {
    case SET_CART:
      return { ...state, cart: action.payload }
    default:
      return state
  }
}

export default cartReducer