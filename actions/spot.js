import CONSTANTS from '../config/constants'

export const FETCH_SPOT = 'FETCH_SPOT'

export const fetchSpot = (dispatch, spot) => {

  let code = null

  return fetch(`${CONSTANTS.APIv2}/preorder/spot/${spot}`, {
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
  //   {
  //     "id_spot": 290,
  //     "id_product": 1067,
  //     "action": 2,
  //     "quantity": 0,
  //     "id_order_detail": 192732
  // }
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