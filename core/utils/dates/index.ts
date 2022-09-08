export const subtractYears = (numOfYears: number, date = new Date()) => {
  date.setFullYear(date.getFullYear() - numOfYears);

  return date;
}

export const addYears = (numOfYears: number, date = new Date()) => {
  date.setFullYear(date.getFullYear() + numOfYears);

  return date;
}
