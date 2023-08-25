export const validateTextField = (text: string) => {
  return text
    .toUpperCase()
    .trim()
    .replace(/[^A-Z0-9]/g, '');
};
