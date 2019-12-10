import CONSTANTS from '../config/constants';
import _ from 'lodash';

export const FETCH_CARDS = 'FETCH_CARDS';
export const FETCH_NEXT_BILLING_NUMBER = 'FETCH_NEXT_BILLING_NUMBER';
export const FETCH_PREORDER = 'FETCH_PREORDER';
export const FETCH_SUGGESTIONS = 'FETCH_SUGGESTIONS';

export const fetchCards = dispatch => {
  let code = null

  fetch(`${CONSTANTS.APIv2}/store/cards`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${CONSTANTS.AUTHORIZATION}`
    }
  })
    .then(res => {
      code = res.status;
      return res.json();
    })
    .then(res => {
      if (code === 200) {
        let { results = [] } = res;

        let cardTypes = _.groupBy(results, 'type');
        let debit = cardTypes['0'] || [];
        let credit = cardTypes['1'] || [];

        dispatch({
          reducer: 'payment',
          type: FETCH_CARDS,
          payload: {
            credit,
            debit
          }
        });
      }
    })
    .catch(err => console.log(err));
};

export const fetchNextBillingNumber = dispatch => {
  let code = null

  fetch(`${CONSTANTS.APIv2}/next_billing_number`, {
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
          reducer: 'payment',
          type: FETCH_NEXT_BILLING_NUMBER,
          payload: res.results
        })
      }
    })
    .catch(err => console.log(err))
};

export const fetchPreOrder = (dispatch, spot = 104) => {
  let code = null

  fetch(`${CONSTANTS.APIv2}/preorder/split/spot/${spot}`, {
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

        let { details = [], results } = res;

        let summary = details.reduce(
          (
            { total, noTaxTotal },
            { quantity, tax_values: { no_tax = 0, with_tax = 0 } = {} }
          ) => {
            noTaxTotal += (no_tax) * (quantity || 1);
            total += (with_tax) * (quantity || 1);
            return { total, noTaxTotal };
          }, { total: 0, noTaxTotal: 0 });

        dispatch({
          reducer: 'payment',
          type: FETCH_PREORDER,
          payload: { details, summary, results }
        })
      }
    })
    .catch(err => console.log(err))
};

export const fetchSuggestions = (dispatch, amount) => {
  let code = null

  fetch(`${CONSTANTS.APIv2}/payment/suggestion`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${CONSTANTS.AUTHORIZATION}`
    },
    body: JSON.stringify({ amount })
  })
    .then(res => {
      code = res.status
      return res.json()
    })
    .then(res => {
      if (code === 200) {

        let { results } = res;

        dispatch({
          reducer: 'payment',
          type: FETCH_SUGGESTIONS,
          payload: results
        })
      }
    })
    .catch(err => console.log(err))
};

export const createOrderSplit = (dispatch, order) => {
  let code = null

  fetch(`${CONSTANTS.APIv2}/create/order/split`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${CONSTANTS.AUTHORIZATION}`
    },
    body: JSON.stringify(order)
  })
    .then(res => {
      code = res.status
      return res.json()
    })
    .then(res => {
      if (code === 200) {

        // dispatch({
        //   reducer: 'payment',
        //   type: FETCH_SUGGESTIONS,
        //   payload: results
        // })
      }
    })
    .catch(err => console.log(err))
};