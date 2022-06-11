import {
  OPEN_DETAILS_MODAL,
  OPEN_ORDER_MODAL,
  CLOSE_MODAL
} from '../actions/modal-actions'

const initialState = {
  detailsModalOpen: false,
  orderModalOpen: false
}

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DETAILS_MODAL: {
      return {
        ...state,
        detailsModalOpen: true
      }
    }
    case OPEN_ORDER_MODAL: {
      return {
        ...state,
        orderModalOpen: true
      }
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        detailsModalOpen: false,
        orderModalOpen: false
      }
    }
    default:
      return state
  }
}