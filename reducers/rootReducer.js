import productReducer from './product'
import spotReducer from './spot'

const rootReducer = (state, type) => {
    switch (type.reducer) {
        case 'products':
            return productReducer(state, type)
        case 'spot':
            return spotReducer(state, type)
        default:
            return state
    }
}

export default rootReducer