import { useContext, useEffect, useState } from 'react'
import { Divider } from 'antd'
import _ from 'lodash'
import { Store } from '../config/store'
import { Router } from '../routes'
// Actions
import { fetchProducts, fetchCategories } from '../actions/product'
// Components
import OrdersLayout from '../components/layouts/OrdersLayout'
import CategoriesListing from '../components/orders/CategoriesListing'
import AdditionalsListing from '../components/orders/AdditionalsListing'
import ProductsListing from '../components/orders/ProductsListing'
import OrderToolbar from '../components/orders/OrderToolbar'
import MotiveSelector from '../components/orders/MotiveSelector'
import ModalPrintTicket from '../components/orders/ModalPrintTicket'

import '../scss/styles.scss'

const Orders = () => {
  const { state, dispatch } = useContext(Store)

  const [selectedCategory, setCategory] = useState({})
  const [selectedProduct, setProduct] = useState({})
  const [selectedAdditionals, setAdditional] = useState([])
  const [specifications, setSpecifications] = useState([])
  const [currentStep, setStep] = useState("CATEGORY")
  const [printTicketVisible, setPrintTicketVisible] = useState(true)

  const cart = {
    products: [
      {
        productId: 142,
        answers: [{
          additionalMotive: 'CON',
          additionalProducts: [
            {
              id: 45,
              name: "Cebolla"
            }
          ]
        }]
      }
    ]
  }

  const handleOnBack = () => {
    switch (currentStep) {
      case "ADDITIONAL":
        handleOnSetAdditional([])
        setStep("PRODUCT")
        break;
      case "PRODUCT":
        setProduct({})
        setStep("CATEGORY")
        break;
      default:
        break;
    }
  }

  const handleOnSetCategory = category => {
    setCategory(category)
    setStep("PRODUCT")
    fetchProducts(dispatch, category.id)
  }

  const handleOnSetProduct = product => {
    // TODO: disparar metodo para agregar al carrito
    if (!_.isEmpty(product.specifications)) {
      setProduct(product)
      setStep("ADDITIONAL")
      setSpecifications(product.specifications)
    } else {
      // TODO: notificar que no hay adicionales
      console.log('no hay adicionales')
    }
  }

  const handleOnSetAdditional = additional => {
    setAdditional(additional)
  }

  const goToHome = () => {
    Router.pushRoute(`/`)
  }

  useEffect(() => {
    state.categories.length === 0 && fetchCategories(dispatch)
    // effect

    // return () => {
    //     cleanup
    // }
  })

  const orderToolbarProps = {
    onBack: handleOnBack,
    selectedCategory: selectedCategory,
    selectedProduct: selectedProduct,
    currentStep: currentStep
  }

  const modalPrintTicketProps = {
    handleCancel: () => setPrintTicketVisible(false),
    visible: printTicketVisible
  }

  return (
    <OrdersLayout goToHome={goToHome}>
      <OrderToolbar {...orderToolbarProps} />
      <div className="toolbar-divider">
        <Divider />
      </div>
      <div className="content-container">
        {
          currentStep === "ADDITIONAL" &&
          <MotiveSelector />
        }
        {
          currentStep === "CATEGORY" &&
          <CategoriesListing
            onSetCategory={handleOnSetCategory}
            categories={state.categories} />
        }
        {
          currentStep === "PRODUCT" &&
          <ProductsListing
            onSetProduct={handleOnSetProduct}
            products={state.products} />
        }
        {
          currentStep === "ADDITIONAL" &&
          <AdditionalsListing
            onSetAdditional={handleOnSetAdditional}
            specifications={specifications}
            selectedAdditionals={selectedAdditionals} />
        }
      </div>
      <ModalPrintTicket {...modalPrintTicketProps} />
    </OrdersLayout>
  )
}

export default Orders