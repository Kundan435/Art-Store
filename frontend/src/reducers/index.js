import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
} from './productReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './userReducers'
import { cartReducer } from './cartReducers'
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderStatusReducer,
  myOrderListReducer,
  allOrderListReducer,
} from './orderReducers'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderStatus: orderStatusReducer,
  myOrderList: myOrderListReducer,
  allOrderList: allOrderListReducer,
  // category: categoryReducer,
  // auth: authReducer,
})

export default rootReducer
