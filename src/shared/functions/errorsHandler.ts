import { forIn, head } from 'lodash';
import { PayloadAction } from '@reduxjs/toolkit';
import { FieldValues, UseFormSetError } from 'react-hook-form';
import { ErrorType } from '../interfaces/error.interfaces';

/**
 * Manually set errors in the 'react-hook-form' state.
 *
 * @param result - Response data
 * @param setError - Callback function for setting errors in 'react-hook-form' state
 */

const errorsHandler = <T extends FieldValues>(
  result: PayloadAction<ErrorType | undefined>,
  setError?: UseFormSetError<T>,
): void => {
  if (setError && result.payload) {
    forIn(result.payload.errors, (value, key) => {
      setError(key as any, { type: 'manual', message: head(value) });
    });
  }
};

export default errorsHandler;
