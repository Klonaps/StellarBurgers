export const getCorrectDate = (inputDate: string): string => {
  const date: Date = new Date(inputDate)
  const month: number = date.getMonth()
  const currentMonth: number = new Date().getMonth()
  let weekDay: string = ''

  if (month !== currentMonth) return 'В этом году'

  const day: number = date.getDate()
  const currentDay: number = new Date().getDate()
  const difference: number = currentDay - day

  if (difference === 0) weekDay = 'Сегодня'
  else if (difference === 1) weekDay = 'Вчера'
  else if (difference === 2) weekDay = 'Позавчера'
  else if (difference >= 3 && difference < 7) weekDay = 'На этой неделе'
  else return 'В этом месяце'

  const hours: number = date.getHours()
  const minutes: string = (date.getMinutes()<10?'0':'') + date.getMinutes()
  return `${weekDay}, ${hours}:${minutes}`
}