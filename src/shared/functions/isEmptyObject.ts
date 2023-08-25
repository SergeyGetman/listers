const isEmptyObject = (obj: object) => {
  if (!obj) {
    return false;
  }
  // eslint-disable-next-line no-restricted-syntax,@typescript-eslint/no-unused-vars
  for (const [key, value] of Object.entries(obj)) {
    // eslint-disable-next-line no-restricted-syntax,@typescript-eslint/no-unused-vars
    for (const [k, v] of Object.entries(value)) {
      if (v !== null) {
        return false;
      }
    }
  }
  return true;
};

export default isEmptyObject;
