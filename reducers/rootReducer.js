import productReducer from './product'

const rootReducer = (state, type) => {
    switch (type.reducer) {
        case 'products':
            return productReducer(state, type)
        default:
            return state
    }
}

export default rootReducer