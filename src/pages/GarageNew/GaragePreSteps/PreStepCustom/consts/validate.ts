export const licensePlateValidate = {
  maxLength: {
    value: 7,
    message: 'The field can be max 7 characters',
  },
  minLength: {
    value: 2,
    message: 'The field must be at least 2 characters',
  },
  pattern: {
    value: /^[A-Z0-9\s]+$/,
    message: 'VIN number must contain only letters and numbers',
  },
};
export const vinValidate = {
  maxLength: {
    value: 17,
    message: 'The field can be max 17 characters',
  },
  minLength: {
    value: 2,
    message: 'The field must be at least 2 characters',
  },
  pattern: {
    value: /^[A-Z0-9\s]+$/,
    message: 'License Plate  must contain only letters and numbers',
  },
};
