import React, { FC } from 'react';
import VerificationInput from 'react-verification-input';
import { VereficationFieldContainer } from './VereficationField.style';
import ErrorMessage from '../ErrorMessage';

type VerificationFieldType = {
  onChange: (value: string) => void;
  validChars: string;
  autoFocus: boolean;
  placeholder: string;
  inputProps: object;
  isError?: boolean;
  errorMessage?: string;
};

const VerificationField: FC<VerificationFieldType> = ({
  onChange,
  validChars,
  autoFocus = true,
  placeholder,
  inputProps,
  isError,
  errorMessage,
}) => {
  return (
    <VereficationFieldContainer>
      <VerificationInput
        onChange={onChange}
        classNames={{
          container: 'container',
          character: 'character',
          characterInactive: 'character--inactive',
          characterSelected: 'character--selected',
        }}
        validChars={validChars}
        autoFocus={autoFocus}
        placeholder={placeholder}
        inputProps={inputProps}
      />
      <ErrorMessage isShow={isError} message={errorMessage} />
    </VereficationFieldContainer>
  );
};

export default VerificationField;
