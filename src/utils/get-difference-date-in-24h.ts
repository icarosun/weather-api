export function getDifferenceDatein24h(date: Date) {
  const castDate = new Date(date)

  castDate.setUTCDate(castDate.getUTCDate() - 1)

  return castDate
}  
