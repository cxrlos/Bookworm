const constants = {
  API_KEY: 'AIzaSyC9nmes7DMUcALkQD67YXX_BLPUuDXFikA',
  DAILY_GOAL: {
    dailyGoal: 'Objetivo diario',
  },
  FORM_ACTIONS: {
    success: 'Guardado exitosamente',
    error: 'Error al guardar',
  },
  GOOGLE_BOOKS_URL: query =>
    `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${constants.API_KEY}`,
  LIBRARY: {
    0: 'Favoritos',
    2: 'Por leer',
    3: 'Leyendo ahora',
    4: 'Leídos',
  },
  LIBRARY_ACTIONS: {
    add: 'Añadido a la biblioteca',
    remove: 'Eliminado de la biblioteca',
    error: 'Error al añadir a la biblioteca',
  },
  MONTHS: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  PASSWORD: {
    password: 'Contraseña',
    passwordConfirmation: 'Confirmar contraseña',
  },
  PERSONAL_INFORMATION: {
    firstName: 'Nombre(s)',
    lastName: 'Apellido(s)',
    email: 'Correo electrónico',
    sex: 'Sexo',
  },
  STATISTICS_MENU: ['Hoy', 'Esta semana', 'Este mes', 'Este año'],
};

export const {
  DAILY_GOAL,
  FORM_ACTIONS,
  GOOGLE_BOOKS_URL,
  LIBRARY,
  LIBRARY_ACTIONS,
  MONTHS,
  PASSWORD,
  PERSONAL_INFORMATION,
  STATISTICS_MENU,
} = constants;

export default constants;
