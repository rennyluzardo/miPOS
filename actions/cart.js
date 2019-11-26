export const SET_CART = 'SET_CART'

export const setCart = (dispatch, cart) => {
  return dispatch({
    reducer: 'cart',
    type: SET_CART,
    payload: cart
  })
}