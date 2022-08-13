import { TIngredient, TCurrentOrderWithCount } from "./types"

export const getCurrentOrder = (ids: string[], ingredients: TIngredient[]): TIngredient[] => {
  let currentOrder: TIngredient[] = []
  ids.map((id) => (
    currentOrder = [...currentOrder, ...ingredients.filter(ing => ing._id === id)]
  ))
  return currentOrder
}

export const getCurrentOrderWithCount = (ids: string[], ingredients: TIngredient[]): TCurrentOrderWithCount[] => {
  let currentOrder: TCurrentOrderWithCount[] = []
  const newIds = ids.filter((id, index) => ids.indexOf(id) === index)
  newIds.map((id) => {
    const newIngredient = {...ingredients.filter(ing => ing._id === id)[0], count: ids.filter(oldid => oldid === id).length}
    return currentOrder = [...currentOrder, newIngredient]
  })
  return currentOrder
}

export const calculateSum = (currentOrder: TIngredient[]): number => {
  return currentOrder.reduce((a, b) => {
    if (b.type === 'bun') {
      return a + (b.price * 2)
    } else {
      return a + b.price
    }
  }, 0)
}