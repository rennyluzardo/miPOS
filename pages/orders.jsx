import { useContext, useEffect, useState } from 'react'
import { Store } from '../config/store'
import { Router } from '../routes'
import { Divider } from 'antd'
import _ from 'lodash'
// Actions
import { fetchProducts, fetchCategories } from '../actions/product'
import { fetchSpot, addSpotProduct } from '../actions/spot'
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

  const [hideTopBar, onHideTopBar] = useState(false)
  const [selectedCategory, setCategory] = useState({})
  const [selectedProduct, setProduct] = useState({})
  const [selectedAdditionals, setAdditional] = useState([])
  const [specifications, setSpecifications] = useState([])
  const [currentStep, setStep] = useState("CATEGORY")
  const [printTicketVisible, setPrintTicketVisible] = useState(true)
  const [spotPlaces, setSpotPlaces] = useState(1)
  const [windowDimensions, updateWindowDimensions] = useState({})
  
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
      setProduct(product)
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
    const mockProduct = {
      "id_product": product.id,
      "value": product.base_value,
      "quantity": 1,
      "name": product.name,
      "id_spot": 290,
      "instruction": "",
      "invoice_name": product.invoice_name,
      "specifications": [
        {
          "id": 850,
          "name": "¿Deseas postre?",
          "total": 2490000,
          "options": [
            {
              "id": 4191,
              "name": "Chocolate- chocolate personal",
              "value": "1350000.0000",
              "quantity": 0,
              "checked": 0
            },
            {
              "id": 4192,
              "name": "Chocolate-chocolate súper personall",
              "value": "2490000.0000",
              "quantity": 1,
              "checked": 1
            },
            {
              "id": 4193,
              "name": "Chocolate-chocolate Grande",
              "value": "4780000.0000",
              "quantity": 0,
              "checked": 0
            }
          ],
          "showQuantity": true,
          "max": 3,
          "required": 0
        }
      ]
    }

    console.log('Agregando producto')
    addSpotProduct(dispatch, mockProduct).then(res => {
      if (res.code === 200) {
        console.log('Producto agregado')
        fetchSpot(dispatch).then(res => {
          if (res.code !== 200) {
            console.log('Hubo un error al actualizar la mesa')
          }
        })
      } else {
        console.log('Hubo un error al agregar el producto')
      }
    })

    // Old method
    // _.find(_.toArray(state.cart.categories), category => {
    //   if (product.category_name !== category.name) {
    //     const cart = _.cloneDeep(state.cart)
    //     cart.categories.map(cat => {
    //       if (cat.name === product.category_name) {
    //         return cat.products.push(product)
    //       } else {
    //         // TODO: push product in other object with the new category
    //       }
    //     })
    //     setCart(dispatch, cart)
    //   }
    // })
  }

  const handleOnAddPlace = () => {
    let places = spotPlaces
    places++
    setSpotPlaces(places)
  }

  const handleOnRemovePlace = () => {
    let places = spotPlaces
    places--
    setSpotPlaces(places)
  }

  const onWindowDimensions = () => {
    updateWindowDimensions({ width: window.innerWidth, height: window.innerHeight })
  }

  useEffect(() => {
    _.isEmpty(state.categories) && fetchCategories(dispatch)
    _.isEmpty(state.spot) && fetchSpot(dispatch)
  })

  useEffect(() => {
    _.isEmpty(windowDimensions) && onWindowDimensions()
    window.addEventListener('resize', onWindowDimensions)

    return () => {
      window.removeEventListener('resize', onWindowDimensions)
    }
  }, [windowDimensions])

  const orderToolbarProps = {
    onBack: handleOnBack,
    selectedCategory: selectedCategory,
    selectedProduct: selectedProduct,
    currentStep: currentStep,
    spotPlaces: spotPlaces,
    onAddPlace: handleOnAddPlace,
    onRemovePlace: handleOnRemovePlace,
    windowDimensions: windowDimensions
  }

  const modalPrintTicketProps = {
    handleCancel: () => setPrintTicketVisible(false),
    visible: printTicketVisible
  }

  const ordersLayoutProps = {
    goToHome: goToHome,
    spot: state.spot,
    hideTopBar: hideTopBar,
    onHideTopBar: onHideTopBar,
    spotPlaces: spotPlaces
  }

  return (
    <OrdersLayout {...ordersLayoutProps}>
      <OrderToolbar {...orderToolbarProps} />
      <div className="toolbar-divider">
        <Divider />
      </div>
      <div className="content-container">
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
          [<MotiveSelector />,
          <AdditionalsListing
            onSetAdditional={handleOnSetAdditional}
            specifications={specifications}
            selectedAdditionals={selectedAdditionals} />]
        }
      </div>
      <ModalPrintTicket {...modalPrintTicketProps} />
    </OrdersLayout>
  )
}

export default Orders