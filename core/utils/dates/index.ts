export const subtractYears = (numOfYears: number, date = new Date()) => {
  date.setFullYear(date.getFullYear() - numOfYears);
  return date;
};

export const convertToDate = (date: Date | string, locale?: string) => {
  return new Date(date).toLocaleDateString(locale)
};
