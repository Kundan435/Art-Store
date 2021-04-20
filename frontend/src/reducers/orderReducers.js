import { orderConstatnts } from '../actions/constants.js'

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case orderConstatnts.ORDER_CREATE_REQUEST:
      return {
        loading: true,
      }
    case orderConstatnts.ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      }
    case orderConstatnts.ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case orderConstatnts.ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case orderConstatnts.ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      }
    case orderConstatnts.ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case orderConstatnts.ORDER_PAY_REQUEST:
      return {
        loading: true,
      }
    case orderConstatnts.ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case orderConstatnts.ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case orderConstatnts.ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}

export const orderStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case orderConstatnts.ORDER_STATUS_REQUEST:
      return {
        loading: true,
      }
    case orderConstatnts.ORDER_STATUS_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case orderConstatnts.ORDER_STATUS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case orderConstatnts.ORDER_STATUS_RESET:
      return {}
    default:
      return state
  }
}

export const myOrderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case orderConstatnts.ORDER_MY_LIST_REQUEST:
      return {
        loading: true,
      }
    case orderConstatnts.ORDER_MY_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case orderConstatnts.ORDER_MY_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case orderConstatnts.ORDER_MY_LIST_RESET:
      return { orders: [] }
    default:
      return state
  }
}

export const allOrderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case orderConstatnts.ORDER_ALL_LIST_REQUEST:
      return {
        loading: true,
      }
    case orderConstatnts.ORDER_ALL_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case orderConstatnts.ORDER_ALL_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
