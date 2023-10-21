import { createContext, useContext, useReducer } from "react"
import { faker } from "@faker-js/faker"
import { cartReducer, filterReducer } from "./CartReducer"

const Cart = createContext()
faker.seed(99)

const AppContext = ({children}) => {
  const products = [...Array(20)].map(() => ({
    id : faker.string.uuid(),
    name : faker.commerce.productName(),
    price : faker.commerce.price(),
    image : faker.image.url(),
    inStock : faker.helpers.arrayElement([0,3,5,6,7]),
    fastDelivery : faker.datatype.boolean(),
    ratings : faker.helpers.arrayElement([1,2,3,4,5]),
  }))

  const initialState = {
    products: products,
    cart : [],
  }

  const filterInitialState = {
    byStock : false,
    byFastDelivery : false,
    byRating : 0,
    searchQuery : ""
  }

  const [state, dispatch] = useReducer(cartReducer, initialState)

  const [filterState, filterDispatch] = useReducer(filterReducer, filterInitialState)

  return (
    <Cart.Provider value={{state, dispatch, filterState, filterDispatch}}>
      {children}
    </Cart.Provider>
  )
}

export default AppContext

export const CartState = () => {
  return useContext(Cart)
}
