import * as React from 'react';
import {
  AuBankAccountElement,
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  FpxBankElement,
  IbanElement,
  IdealBankElement,
} from '@stripe/react-stripe-js';
import { TextFieldProps } from '@mui/material/TextField';
import i18next from 'i18next';
import StripeInput from '../StripeInput';
import MuiBaseTextFiled from '../../MuiBaseTextFiled';
import { StripeTextFieldContainer } from './StripeTextField.styled';

type StripeElement =
  | typeof AuBankAccountElement
  | typeof CardCvcElement
  | typeof CardExpiryElement
  | typeof CardNumberElement
  | typeof FpxBankElement
  | typeof IbanElement
  | typeof IdealBankElement;

interface StripeTextFieldProps<T extends StripeElement>
  extends Omit<TextFieldProps, 'onChange' | 'inputComponent' | 'inputProps'> {
  inputProps?: React.ComponentProps<T>;
  labelErrorMessage?: string;
  onChange?: React.ComponentProps<T>['onChange'];
  stripeElement?: T;
}

export const StripeTextField = <T extends StripeElement>(props: StripeTextFieldProps<T>) => {
  const {
    helperText,
    InputLabelProps,
    InputProps = {},
    inputProps,
    error,
    labelErrorMessage,
    stripeElement,
    ...other
  } = props;

  return (
    <StripeTextFieldContainer>
      <MuiBaseTextFiled
        inputLabelProps={{
          ...InputLabelProps,
        }}
        isError={error}
        inputProps={{
          ...InputProps,
          inputProps: {
            ...inputProps,
            ...InputProps.inputProps,
            component: stripeElement,
          },
          inputComponent: StripeInput,
        }}
        errorMessage={labelErrorMessage}
        helperText={error ? '' : helperText}
        {...(other as any)}
      />
    </StripeTextFieldContainer>
  );
};

export const StripeTextFieldNumber = (props: StripeTextFieldProps<typeof CardNumberElement>) => {
  return (
    <StripeTextField
      label={`${i18next.t('general.fieldNames.cardNumber')}`}
      stripeElement={CardNumberElement}
      {...props}
    />
  );
};

export const StripeTextFieldExpiry = (props: StripeTextFieldProps<typeof CardExpiryElement>) => {
  return (
    <StripeTextField
      label={`${i18next.t('general.fieldNames.MMYY')}`}
      stripeElement={CardExpiryElement}
      {...props}
    />
  );
};

export const StripeTextFieldCVC = (props: StripeTextFieldProps<typeof CardCvcElement>) => {
  return (
    <StripeTextField
      label={`${i18next.t('general.fieldNames.CVC')}`}
      stripeElement={CardCvcElement}
      {...props}
    />
  );
};
