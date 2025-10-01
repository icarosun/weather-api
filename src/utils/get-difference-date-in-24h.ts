export function getDifferenceDatein24h(date: Date) {
  const castDate = new Date(date)

  castDate.setDate(castDate.getDate() - 1)

  return castDate
}  
