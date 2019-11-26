import productReducer from './product'
import cartReducer from './cart'

const rootReducer = (state, type) => {
    switch (type.reducer) {
        case 'products':
            return productReducer(state, type)
        case 'cart':
            return cartReducer(state, type)
        default:
            return state
    }
}

export default rootReducer