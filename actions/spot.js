import CONSTANTS from '../config/constants'

export const FETCH_SPOT = 'FETCH_SPOT'

export const fetchSpot = (dispatch, spot) => {

  let code = null

  return fetch(`${CONSTANTS.APIv2}/preorder/spot/${290}`, {
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
      res.code = code

      if (code === 200) {
        dispatch({
          reducer: 'spot',
          type: FETCH_SPOT,
          payload: res
        })
      }

      return res
    })
    .catch(err => console.log(err))
}

export const addSpotProduct = (dispatch, product) => {

  let code = null

  return fetch(`${CONSTANTS.APIv2}/preorder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${CONSTANTS.AUTHORIZATION}`
    },
    body: JSON.stringify(product)
  })
    .then(res => {
      code = res.status
      return res.json()
    })
    .then(res => {
      res.code = code
      return res
    })
    .catch(err => console.log(err))
}

export const editSpotProduct = (dispatch, product) => {
  //   {
  //     "id_spot": 266,
  //     "id_product": 4903,
  //     "action": 1,
  //     "quantity": 2,
  //     "id_order_detail": 190901
  // }
  let code = null

  return fetch(`${CONSTANTS.APIv2}/preorder/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${CONSTANTS.AUTHORIZATION}`
    },
    body: JSON.stringify(product)
  })
    .then(res => {
      code = res.status
      return res.json()
    })
    .then(res => {
      res.code = code
      return res
    })
    .catch(err => console.log(err))
}

export const removeSpotProduct = (dispatch, product) => {

  let code = null

  return fetch(`${CONSTANTS.APIv2}/preorder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${CONSTANTS.AUTHORIZATION}`
    },
    body: JSON.stringify(product)
  })
    .then(res => {
      code = res.status
      return res.json()
    })
    .then(res => {
      res.code = code

      if (code === 200) {
        dispatch({
          reducer: 'spot',
          type: REMOVE_SPOT_PRODUCT,
          payload: res
        })
      }

      return res
    })
    .catch(err => console.log(err))
}