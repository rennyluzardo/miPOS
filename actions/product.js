import CONSTANTS from '../config/constants'

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'

export const fetchCategories = dispatch => {
  let code = null

  fetch(`${CONSTANTS.APIv1}/categories/store`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${CONSTANTS.AUTHORIZATION}`
    }
  })
    .then(res => {
      code = res.status
      return res.json()
    })
    .then(res => {
      if (code === 200) {
        dispatch({
          reducer: 'products',
          type: FETCH_CATEGORIES,
          payload: res.results
        })
      }
    })
    .catch(err => console.log(err))
}

export const fetchProducts = (dispatch, category) => {
  let code = null

  fetch(`${CONSTANTS.APIv1}/products/category/${category}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${CONSTANTS.AUTHORIZATION}`
    }
  })
    .then(res => {
      code = res.status
      return res.json()
    })
    .then(res => {
      if (code === 200) {
        dispatch({
          reducer: 'products',
          type: FETCH_PRODUCTS,
          payload: res.results
        })
      }
    })
    .catch(err => console.log(err))
}
