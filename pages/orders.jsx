import { useContext, useEffect, useState } from 'react'
import { Store } from '../config/store'
import { Router } from '../routes'
import { Divider } from 'antd'
import _ from 'lodash'
// Actions
import { fetchProducts, fetchCategories } from '../actions/product'
import { setCart } from '../actions/cart'
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

  const mockCart = {
    categories: [{
      id: 109,
      name: 'Hamburguesas',
      products: [
        {
          "id": 681,
          "name": "Hamburguesa de Carne",
          "search_string": "hamburguesa de carne",
          "description": null,
          "base_value": 500,
          "image": null,
          "status": 1,
          "invoice_name": "Hamburguesa de Carne",
          "sku": null,
          "ask_instruction": 0,
          "eats_product_name": "Ninguno",
          "image_version": 0,
          "is_alcohol": 0,
          "deleted_at": null,
          "type_product": "null",
          "nt_value": 446.4285714285714,
          "category_name": "Hamburguesas",
          "tax_values": "Object",
          "specifications": "Array[1]",
          "category": "Object",
          "taxes": "Array[2]"
        },
        {
          "id": 1717,
          "name": "Hamburguer 2",
          "search_string": "hamburguer 2",
          "description": null,
          "base_value": 20000,
          "image": null,
          "status": 1,
          "invoice_name": "Hamburguer 2",
          "sku": null,
          "ask_instruction": 0,
          "eats_product_name": "Ninguno",
          "image_version": 0,
          "is_alcohol": 0,
          "deleted_at": null,
          "type_product": "null",
          "nt_value": 17857.142857142855,
          "category_name": "Hamburguesas",
          "tax_values": "Object",
          "specifications": "Array[0]",
          "category": "Object",
          "taxes": "Array[0]"
        }
      ]
    }, {
      id: 142,
      name: "Alitas",
      products: [
        {
          "id": 1072,
          "name": "Combo Alitas",
          "search_string": "hamburgues",
          "description": "hamburguesa 120",
          "base_value": 2100000,
          "image": null,
          "status": 1,
          "invoice_name": "Hamburgues",
          "sku": "123344",
          "ask_instruction": 1,
          "eats_product_name": "Ninguno",
          "image_version": 0,
          "is_alcohol": 0,
          "deleted_at": null,
          "type_product": "null",
          "nt_value": 1874999.9999999998,
          "category_name": "Alitas",
          "tax_values": "Object",
          "specifications": "Array[14]",
          "category": "Object",
          "taxes": "Array[2]"
        }
      ]
    }]
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
      handleOnAddProduct(product)
    }
  }

  const handleOnSetAdditional = additional => {
    const currentAdditionals = _.cloneDeep(selectedAdditionals)
    const additionalsExisting = _.find(currentAdditionals, additionalCopy => additionalCopy.id === additional.id)

    if (!additionalsExisting) {
      currentAdditionals.push(additional)
    }
    // TODO: enviarle el value, para evaluar si el value es igual a cero entonces se elimina
    setAdditional(currentAdditionals)
  }

  const goToHome = () => {
    Router.pushRoute(`/`)
  }

  const handleOnAddProduct = product => {
    _.find(_.toArray(state.cart.categories), category => {
      if (product.category_name !== category.name) {
        const cart = _.cloneDeep(state.cart)
        cart.categories.map(cat => {
          if (cat.name === product.category_name) {
            return cat.products.push(product)
          } else {
            // TODO: push product in other object with the new category
          }
        })
        setCart(dispatch, cart)
      }
    })

  }

  useEffect(() => {
    _.isEmpty(state.categories) && fetchCategories(dispatch)
    _.isEmpty(state.cart) && setCart(dispatch, mockCart)
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
    <OrdersLayout goToHome={goToHome} >
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
            products={state.products}
            onAddProduct={handleOnAddProduct} />
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