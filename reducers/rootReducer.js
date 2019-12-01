import productReducer from './product'
import spotReducer from './spot'
import cartReducer from './cart'

const rootReducer = (state, type) => {
  switch (type.reducer) {
    case 'products':
      return productReducer(state, type)
    case 'spot':
      return spotReducer(state, type)
    case 'cart':
      return cartReducer(state, type)
    default:
      return state
  }
}

export default rootReducer