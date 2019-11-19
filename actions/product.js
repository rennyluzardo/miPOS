export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'

export const fetchProducts = dispatch => {
    return dispatch({
        reducer: 'products',
        type: FETCH_PRODUCTS,
        payload: {
            name: 'renny',
            lastname: 'luzardo'
        }
    })
}