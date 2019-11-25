import { FETCH_PRODUCTS, FETCH_CATEGORIES } from '../actions/product'

const productReducer = (state, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, products: action.payload }
    case FETCH_CATEGORIES:
      return { ...state, categories: action.payload }
    default:
      return state
  }
}

export default productReducer