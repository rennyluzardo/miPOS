import { useContext, useEffect } from 'react'
import { fetchProducts } from '../actions/product'
import { Store } from '../config/store'
import { Router } from '../routes'

// Components
import OrdersLayout from '../components/layouts/OrdersLayout'
import '../scss/styles.scss'
const Orders = props => {
    const { state, dispatch } = useContext(Store)
    const { router } = props

    useEffect(() => {
        state.products.length === 0 && fetchProducts(dispatch)

        // effect

        // return () => {
        //     cleanup
        // }
    })

    const goToHome = () => {
        Router.pushRoute('index')
    }

    return (
        <OrdersLayout>
        </OrdersLayout>
    )
}

export default Orders