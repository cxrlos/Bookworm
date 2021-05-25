import * as Yup from 'yup';

import { FORM } from './constants';

// export default {
//   dailyGoal: Yup.number().required(FORM.requiredField),
//   email: Yup.string().email(FORM.invalidEmail).required(FORM.requiredField),
//   firstName: Yup.string().required(FORM.requiredField),
//   lastName: Yup.string().required(FORM.requiredField),
//   password: Yup.string().required(FORM.requiredField),
//   // .matches(FORM.passwordRegex, FORM.invalidPassword),
//   passwordConfirmation: Yup.string()
//     .required(FORM.requiredField)
//     .oneOf([Yup.ref('password'), null], FORM.invalidPasswordConfirmation),
//   sex: Yup.string().required(FORM.requiredField),
// };

export default {
  dailyGoal: Yup.number(),
  email: Yup.string().email(FORM.invalidEmail).required(FORM.requiredField),
  firstName: Yup.string(),
  lastName: Yup.string(),
  password: Yup.string(),
  // .matches(FORM.passwordRegex, FORM.invalidPassword),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    FORM.invalidPasswordConfirmation
  ),
  sex: Yup.string(),
};
