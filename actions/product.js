import CONSTANTS from '../config/constants'

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'

export const fetchCategories = dispatch => {
    fetch(`${CONSTANTS.API}/categories/store`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${CONSTANTS.AUTHORIZATION}`
        }
    })
        .then(res => res.json())
        .then(res => {
            return dispatch({
                reducer: 'products',
                type: FETCH_CATEGORIES,
                payload: res.results
            })
        })
}

export const fetchProducts = (dispatch, category) => {
    fetch(`${CONSTANTS.API}/products/category/${category}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${CONSTANTS.AUTHORIZATION}`
        }
    })
        .then(res => res.json())
        .then(res => {
            return dispatch({
                reducer: 'products',
                type: FETCH_PRODUCTS,
                payload: res.results
            })
        })
}
