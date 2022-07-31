import { TIngredient } from "./types"

export const getCurrentOrder = (ids: string[], ingredients: TIngredient[]): TIngredient[] => {
  let currentOrder: TIngredient[] = []
  ids.map((id) => (
    currentOrder = [...currentOrder, ...ingredients.filter(ing => ing._id === id)]
  ))
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