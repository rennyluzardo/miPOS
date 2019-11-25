import React from 'react'
import rootReducer from '../reducers/rootReducer'
export const Store = React.createContext()

const initialState = {
    products: [],
    categories: []
}

const StoreProvider = (props) => {
    const [state, dispatch] = React.useReducer(rootReducer, initialState)
    const value = { state, dispatch }

    return <Store.Provider value={value}>{props.children}</Store.Provider>
}

export default StoreProvider