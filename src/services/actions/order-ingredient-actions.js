export const ADD_BURGER_INGREDIENTS = 'ADD_BURGER_INGREDIENTS'
export const ADD_BURGER_BUNS = 'ADD_BURGER_BUNS'
export const DELETE_BURGER_INGREDIENTS = 'DELETE_BURGER_INGREDIENTS'
export const SORT_BURGER_INGREDIENTS = 'SORT_BURGER_INGREDIENTS'

export function addBurgerIngredient(item, uuid) {
  return {
    type: ADD_BURGER_INGREDIENTS,
    payload: {...item, uuid}
  }
}
export function addBurgerBuns(item, uuid) {
  return {
    type: ADD_BURGER_BUNS,
    payload: {...item, uuid}
  }
}
export function deleteBurgerIngredient(uuid) {
  return {
    type: DELETE_BURGER_INGREDIENTS,
    payload: uuid
  }
}