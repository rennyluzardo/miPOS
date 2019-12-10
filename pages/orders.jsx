import { useContext, useEffect, useState } from 'react'
import { Store } from '../config/store'
import { Router } from '../routes'
import { Divider } from 'antd'
import _ from 'lodash'
// Actions
import { fetchProducts, fetchCategories } from '../actions/product'
import { fetchSpot, addSpotProduct } from '../actions/spot'
import { editSpotProduct } from '../actions/spot'
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

const Orders = props => {

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
  const [editMode, setEditMode] = useState(false)
  const [qtyProduct, setQtyProduct] = useState(0)
  const [onConfirmLoading, setConfirmLoading] = useState(false)

  const cart = {
    id: 314,
    products: [
      // {
      //   id: 1447,
      //   name: "Sandwich de Queso",
      //   qty: 1,
      //   price: 1000,
      //   specifications: [{
      //     "id": 850,
      //     "name": "¿Deseas postre?",
      //     "total": 2490000,
      //     options: [
      //       {
      //         id: 13,
      //         name: "Jamon"
      //       },
      //       {
      //         id: 9,
      //         name: "Cebolla"
      //       },
      //       {
      //         id: 23,
      //         name: "Pimientos"
      //       }
      //     ]
      //   }]
      // }
    ]
  }

  const handleOnBack = () => {
    setQtyProduct(0)
    switch (currentStep) {
      case "ADDITIONAL":
        setAdditional([])
        setStep("PRODUCT")
        break;
      case "PRODUCT":
        setProduct({})
        setCategory({})
        setStep("CATEGORY")
        break;
      case "CATEGORY":
      default:
        break;
    }
  }

  const handleOnSetCategory = category => {
    fetchSpot(dispatch, 104)
    setCategory(category)
    setStep("PRODUCT")
    // TODO: cambiar logica para actualizar el carrito
    fetchProducts(dispatch, category.id)
  }

  const handleOnSetProduct = product => {
    // TODO: disparar metodo para agregar al carrito
    setQtyProduct(0)
    if (!_.isEmpty(product.specifications)) {
      setStep("ADDITIONAL")
      setSpecifications(product.specifications)
    } else {
      // TODO: activar el counter dentro del box del producto para configurar la cantidad del mismo.
      // Dentro del metodo del counter se debe ir disparando el hook setProduct con la nueva cantidad.
      setStep("PRODUCT")
    }
    setProduct(product)
  }

  const handleOnSetAdditional = additional => {
    const currentAdditionals = _.cloneDeep(selectedAdditionals)
    const additionalsExisting = _.find(currentAdditionals, additionalCopy => additionalCopy.id === additional.id)

    if (!additionalsExisting) {
      additional.quantity = 1
      additional.checked = 0
      currentAdditionals.push(additional)
    }
    // TODO: enviarle el value, para evaluar si el value es igual a cero entonces se elimina
    setAdditional(currentAdditionals)
  }

  const goToHome = () => {
    Router.pushRoute(`/`)
  }

  const handleOnAddProduct = qty => {

    let productInCart = false
    let cart = _.cloneDeep(state.cart)
    let productId = null

    if (!_.isEmpty(cart.products)) {

      productInCart = _.find(_.toArray(cart.products), (prod, i) => {
        productId = i
        return prod.id === selectedProduct.id
      })

      if (!!productInCart) {
        productInCart.quantity = qty

        console.log(productInCart);
        console.log(qty)
        // TODO: controlar si las opciones son las mismas no se agrega otro objeto
        // productInCart.specifications[0].options.push(selectedAdditionals[0])

        cart.products[productId] = productInCart
      } else {
        let selectedProductCopy = selectedProduct
        if (!_.isEmpty(selectedProductCopy.specifications)) {
          selectedProductCopy.specifications = [{
            "id": 850,
            "name": "¿Deseas postre?",
            "total": 2490000,
            "options": selectedAdditionals
          }]
        }

        selectedProductCopy.quantity = qty
        selectedProductCopy.isConfirm = false
        cart.products.push(selectedProductCopy)
      }
    } else {
      let selectedProductCopy = selectedProduct
      if (!_.isEmpty(selectedProductCopy.specifications)) {
        selectedProductCopy.specifications = [{
          "id": 850,
          "name": "¿Deseas postre?",
          "total": 2490000,
          "options": selectedAdditionals
        }]
      }

      selectedProductCopy.quantity = qty
      selectedProductCopy.isConfirm = false
      cart.products.push(selectedProductCopy)
    }

    setCart(dispatch, cart)
  }

  const handleOnRemoveProduct = product => {
    let productInCart = false
    let cart = _.cloneDeep(state.cart)

    if (!_.isEmpty(cart.products)) {
      productInCart = _.find(_.toArray(cart.products), (prod, i) => {
        return prod.id === product.id && _.isEqual(prod.specifications, product.specifications)
      })

      if (!!productInCart) {
        _.remove(cart.products, el => el.id === productInCart.id)
      }
    }

    setCart(dispatch, cart)
  }

  const handleOnCounter = operation => {

    let places = spotPlaces
    let qty = qtyProduct

    if (operation === 'addProduct') {
      // TODO: si el edit mode esta true disparar la funcion handleOnEditProduct()
      qty++
      setQtyProduct(qty)
      handleOnAddProduct(qty)
    } else if (operation === 'removeProduct') {
      if (!qty) return;
      qty--
      setQtyProduct(qty)
    } else if (operation === 'addPlace') {
      places++
      setSpotPlaces(places)
    } else if (operation === 'removePlace') {
      if (!places) return;
      places--
      setSpotPlaces(places)
    }
  }

  const onWindowDimensions = () => {
    updateWindowDimensions({ width: window.innerWidth, height: window.innerHeight })
  }

  const handleOnSelectEditProduct = product => {
    console.log(product.product_detail.product.category.id, '< ---product to edit')
    setProduct(product)
    setEditMode(true)
    setStep("PRODUCT")

    fetchProducts(dispatch, product.product_detail.product.category.id)
    /** 
     * TODOS:
     * - set product select in selectedProduct state
     * - set items specifications in additionals form state
     */

  }

  const handleOnEditProduct = () => {
    // const product = {
    //   "id_spot": state.spot,
    //   "id_product": selectedProduct.product_detail.product_id,
    //   "action": 1,
    //   "quantity": selectedProduct.quantity,
    //   "id_order_detail": selectedProduct.id
    // }

    // editSpotProduct(product)
  }

  const handleOnConfirmProduct = product => {
    // MOCK STRUCTURE
    const productStructure = {
      "id_product": product.id,
      "value": product.base_value,
      "quantity": 1,
      "name": product.name,
      "id_spot": 104,
      "instruction": "",
      "invoice_name": product.invoice_name,
      "specifications": [
        {
          "id": 850,
          "name": "¿Deseas postre?",
          "total": 2490000,
          "options": !_.isEmpty(product.specifications[0] && product.specifications[0].options) ? product.specifications[0].options : [],
          "showQuantity": true,
          "max": 3,
          "required": 0
        }
      ]
    }

    let productInCart = false
    let cart = _.cloneDeep(state.cart)
    let productId = null

    if (!_.isEmpty(cart.products)) {
      productInCart = _.find(_.toArray(cart.products), (prod, i) => {
        productId = i

        return prod.id === product.id
      })

      if (!!productInCart) {
        productInCart.isConfirm = true
        cart.products[productId] = productInCart
      }
    }

    setConfirmLoading(true)
    addSpotProduct(dispatch, productStructure).then(res => {
      if (res.code === 200) {
        setCart(dispatch, cart)
        setConfirmLoading(false)
        // TODO: cambiar a true el flag para cambiar estilo de productos confirmados
        fetchSpot(dispatch).then(res => {
          if (res.code !== 200) {
            console.log('Hubo un error al actualizar la mesa')
          }
        })
      } else {
        console.log('Hubo un error al agregar el producto')
      }
    })
  }

  useEffect(() => {
    _.isEmpty(state.categories) && fetchCategories(dispatch)
    _.isEmpty(state.spot) && fetchSpot(dispatch, 104)
    // SET MOCK CART
    _.isEmpty(state.cart) && setCart(dispatch, cart)
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
    windowDimensions: windowDimensions,
    onCounter: handleOnCounter
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
    spotPlaces: spotPlaces,
    onSelectEditProduct: handleOnSelectEditProduct,
    spotProducts: state.spot.details,
    cart: state.cart,
    selectedCategory: selectedCategory,
    selectedProduct: selectedProduct,
    onConfirmProduct: handleOnConfirmProduct,
    onConfirmLoading: onConfirmLoading,
    onRemoveProduct: handleOnRemoveProduct,
    spotType: props.router.query.type
  }

  const counterProductsListingProps = {
    onCounter: handleOnCounter,
    selectedProduct: selectedProduct,
    onSetProduct: handleOnSetProduct,
    products: state.products,
    onAddProduct: handleOnAddProduct,
    qtyProduct: qtyProduct
  }

  const propsAdditionalListing = {
    onSetAdditional: handleOnSetAdditional,
    specifications: specifications,
    selectedAdditionals: selectedAdditionals,
    onCounter: handleOnCounter,
    setAdditional: setAdditional,
    qtyProduct: qtyProduct
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
          <ProductsListing {...counterProductsListingProps} />
        }
        {
          currentStep === "ADDITIONAL" &&
          [
            // <MotiveSelector />,
            <AdditionalsListing {...propsAdditionalListing} />]
        }
      </div>
      {/* <ModalPrintTicket {...modalPrintTicketProps} /> */}
    </OrdersLayout>
  )
}

export default Orders