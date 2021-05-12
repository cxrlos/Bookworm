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
  getShelfHeader: length =>
    `${length} libro${length > 1 || length === 0 ? 's' : ''}`,
};

export const { getGreeting, getShelfHeader  } = utils;
