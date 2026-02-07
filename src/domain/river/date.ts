function isLeapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)
}

export function getDayOfYear(date: Date): number {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const daysInMonth = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  let dayOfYear = 0

  for (let i = 0; i < month - 1; i++) {
    dayOfYear += daysInMonth[i]
  }

  dayOfYear += day

  return dayOfYear
}

export function getDifferenceDatein24h(date: Date): Date {
  const castDate = new Date(date)

  castDate.setDate(castDate.getDate() - 1)

  return castDate
}


