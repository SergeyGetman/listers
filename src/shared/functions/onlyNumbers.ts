import React from 'react';

export const onlyNumbers = (event: React.KeyboardEvent<HTMLInputElement>) => {
  const keyCode = event.keyCode || event.which;
  const keyValue = String.fromCharCode(keyCode);
  const regex = /^[0-9]*$/;

  if (!regex.test(keyValue)) {
    event.preventDefault();
  }
};
