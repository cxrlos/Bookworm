const utils = {
  getGreeting: () => {
    const hours = new Date().getHours();
    if (hours < 12) {
      return 'Buenos días';
    }
    if (hours >= 12 && hours <= 17) {
      return 'Buenas tardes';
    }
    return 'Buenas noches';
  },
  getLastDateInCurrentMonth: () => {
    const d = new Date().toISOString().split('T')[0];
    const currentDate = new Date(d);
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    return new Date(currentYear, currentMonth + 1, -1);
  },
  getFirstDateInCurrentWeek: () => {
    const d = new Date().toISOString().split('T')[0];
    const currentDate = new Date(d);
    return new Date(
      currentDate.setDate(currentDate.getDate() - currentDate.getDay())
    );
  },
  getLastDateInCurrentWeek: () => {
    const d = new Date().toISOString().split('T')[0];
    const currentDate = new Date(d);
    return new Date(
      currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6)
    );
  },
  getLastDateInCurrentYear: () => new Date(new Date().getFullYear(), 11, 31),
  getShelfHeader: length =>
    `${length} libro${length > 1 || length === 0 ? 's' : ''}`,
};

export const {
  getGreeting,
  getFirstDateInCurrentWeek,
  getLastDateInCurrentMonth,
  getLastDateInCurrentWeek,
  getLastDateInCurrentYear,
  getShelfHeader,
} = utils;
