import { useContext, useEffect, useState } from 'react'
import { Divider } from 'antd'
import { Store } from '../config/store'
import { Router } from '../routes'

// Actions
import { fetchProducts } from '../actions/product'

// Components
import OrdersLayout from '../components/layouts/OrdersLayout'
import CategoriesListing from '../components/orders/CategoriesListing'
import AdditionalsListing from '../components/orders/AdditionalsListing'
import ProductsListing from '../components/orders/ProductsListing'
import OrderToolbar from '../components/orders/OrderToolbar'
import MotiveSelector from '../components/orders/MotiveSelector'

import '../scss/styles.scss'

const Orders = () => {
  const { state, dispatch } = useContext(Store)

  const [selectedCategory, handleOnSetCategory] = useState({})
  const [selectedProduct, handleOnSetProduct] = useState({})
  const [selectedAdditionals, handleOnSetAdditional] = useState([])

  const handleOnBack = () => {
    handleOnSetCategory({})
    handleOnSetProduct({})
    handleOnSetAdditional([])
  }

  useEffect(() => {
    state.products.length === 0 && fetchProducts(dispatch)

    // effect

    // return () => {
    //     cleanup
    // }
  })

  const orderToolbarProps = {
    onBack: handleOnBack,
    selectedCategory: selectedCategory,
    selectedProduct: selectedProduct
  }

  return (
    <OrdersLayout>
      <OrderToolbar {...orderToolbarProps} />
      <div className="toolbar-divider">
        <Divider />
      </div>
      <div className="content-container">
        {
          selectedCategory.id &&
          selectedProduct.id &&
          <MotiveSelector />
        }
        {
          !selectedCategory.id &&
          <CategoriesListing onSetCategory={handleOnSetCategory} />
        }
        {
          selectedCategory.id &&
          !selectedProduct.id &&
          <ProductsListing onSetProduct={handleOnSetProduct} />
        }
        {
          selectedCategory.id &&
          selectedProduct.id &&
          <AdditionalsListing onSetAdditional={handleOnSetAdditional} selectedAdditionals={selectedAdditionals} />
        }
      </div>
    </OrdersLayout>
  )
}

export default Orders