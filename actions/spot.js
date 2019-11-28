import CONSTANTS from '../config/constants'

export const FETCH_SPOT = 'FETCH_SPOT'

export const fetchSpot = (dispatch, spot) => {

  let code = null

  fetch(`${CONSTANTS.APIv2}/preorder/spot/${290}`, {
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
          reducer: 'spot',
          type: FETCH_SPOT,
          payload: res
        })
      }
    })
    .catch(err => console.log(err))
}
