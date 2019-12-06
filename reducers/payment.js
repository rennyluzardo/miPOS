import {
    FETCH_CARDS,
    FETCH_NEXT_BILLING_NUMBER,
    FETCH_PREORDER,
    FETCH_SUGGESTIONS
} from '../actions/payment';

const paymentReducer = (state, action) => {
    switch (action.type) {
        case FETCH_CARDS:
            return { ...state, cards: action.payload };
        case FETCH_NEXT_BILLING_NUMBER:
            return { ...state, nextBillingNumber: action.payload }
        case FETCH_PREORDER:
            return { ...state, preorder: action.payload }
        case FETCH_SUGGESTIONS:
            return { ...state, suggestions: action.payload }
        default:
            return state;
    }
}

export default paymentReducer;