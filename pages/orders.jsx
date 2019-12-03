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
  const [editMode, setEditMode] = useState(false)
  const [qtyProduct, setQtyProduct] = useState(0)

  const cart = {
    id: 314,
    products: [
      {
        id: 1447,
        name: "Sandwich de Queso",
        qty: 1,
        price: 1000,
        specifications: [
          {
            specification_category: "CON",
            options: [
              {
                id: 13,
                name: "Jamon"
              }
            ]
          },
          {
            specification_category: "SIN",
            options: [
              {
                id: 9,
                name: "Cebolla"
              },
              {
                id: 23,
                name: "Pimientos"
              }
            ]
          }
        ]
      }
    ]
  }

  const handleOnBack = () => {
    setQtyProduct(0)
    switch (currentStep) {
      case "ADDITIONAL":
        handleOnSetAdditional([])
        setStep("PRODUCT")
        break;
      case "PRODUCT":
        setProduct({})
        setCategory({})
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
    setQtyProduct(0)
    if (!_.isEmpty(product.specifications)) {
      setStep("ADDITIONAL")
      setSpecifications(product.specifications)
    } else {
      // TODO: activar el counter dentro del box del producto para configurar la cantidad del mismo.
      // Dentro del metodo del counter se debe ir disparando el hook setProduct con la nueva cantidad.
      setStep("PRODUCT")
    }
    product.category_name = "Desayunos"
    setProduct(product)
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

  const handleOnAddProduct = qty => {
    // const mockProduct = {
    //   "id_product": product.id,
    //   "value": product.base_value,
    //   "quantity": 1,
    //   "name": product.name,
    //   "id_spot": 290,
    //   "instruction": "",
    //   "invoice_name": product.invoice_name,
    //   "specifications": [
    //     {
    //       "id": 850,
    //       "name": "¿Deseas postre?",
    //       "total": 2490000,
    //       "options": [
    //         {
    //           "id": 4191,
    //           "name": "Chocolate- chocolate personal",
    //           "value": "1350000.0000",
    //           "quantity": 0,
    //           "checked": 0
    //         },
    //         {
    //           "id": 4192,
    //           "name": "Chocolate-chocolate súper personall",
    //           "value": "2490000.0000",
    //           "quantity": 1,
    //           "checked": 1
    //         },
    //         {
    //           "id": 4193,
    //           "name": "Chocolate-chocolate Grande",
    //           "value": "4780000.0000",
    //           "quantity": 0,
    //           "checked": 0
    //         }
    //       ],
    //       "showQuantity": true,
    //       "max": 3,
    //       "required": 0
    //     }
    //   ]
    // }

    // console.log('Agregando producto')
    // addSpotProduct(dispatch, mockProduct).then(res => {
    //   if (res.code === 200) {
    //     console.log('Producto agregado')
    //     fetchSpot(dispatch).then(res => {
    //       if (res.code !== 200) {
    //         console.log('Hubo un error al actualizar la mesa')
    //       }
    //     })
    //   } else {
    //     console.log('Hubo un error al agregar el producto')
    //   }
    // })

    // Old method
    let productInCart = false
    let cart = _.cloneDeep(state.cart)
    let productId = null

    if (!_.isEmpty(cart.products)) {
      productInCart = _.find(_.toArray(cart.products), (prod, i) => {
        productId = i
        return prod.id === selectedProduct.id
      })
      if (!!productInCart) {
        productInCart.qty = qty
        cart.products[productId] = productInCart
      } else {
        selectedProduct.qty = qty
        cart.products.push(selectedProduct)
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
      qty--
      setQtyProduct(qty)
    } else if (operation === 'addPlace') {
      places++
      setSpotPlaces(places)
    } else if (operation === 'removePlace') {
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

  useEffect(() => {
    _.isEmpty(state.categories) && fetchCategories(dispatch)
    _.isEmpty(state.spot) && fetchSpot(dispatch)
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
    selectedProduct: selectedProduct
  }

  const counterProductsListingProps = {
    onCounter: handleOnCounter,
    selectedProduct: selectedProduct,
    onSetProduct: handleOnSetProduct,
    products: state.products,
    onAddProduct: handleOnAddProduct,
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
          [<MotiveSelector />,
          <AdditionalsListing
            onSetAdditional={handleOnSetAdditional}
            specifications={specifications}
            selectedAdditionals={selectedAdditionals}
            onCounter={handleOnCounter} />]
        }
      </div>
      <ModalPrintTicket {...modalPrintTicketProps} />
    </OrdersLayout>
  )
}

export default Orders