export function businessDays(startDate, businessDays) {
    let currentDate = dayjs(startDate);
    let addedDays = 0;
    while (addedDays < businessDays) {
      currentDate = currentDate.add(1, 'day');
      const day = currentDate.day();
      if (day !== 0 && day !== 6) {
        addedDays++
      }
    }
  return currentDate;
}