import React from 'react'
import { Store } from '../config/store'

const Index = props => {
    const { state, dispatch } = React.useContext(Store)

    return (
        <React.Fragment>
            Index
        </React.Fragment>
    )
}

export default Index