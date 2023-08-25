export const isOnlyText = (text: string) => {
  const regExp = /\d*[a-zA-Z_@./#&-]\d*$/;

  return regExp.test(text.trim());
};
