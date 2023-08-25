import React, { FC } from 'react';
import {
  PayDateInputViewContainer,
  PayDateInputViewDate,
  PayDateInputViewLabel,
} from './PayDateInputView.style';

type PayDateInputViewProps = {
  label: string;
  date: string;
};

const PayDateInputView: FC<PayDateInputViewProps> = ({ label, date }) => {
  return (
    <PayDateInputViewContainer>
      <PayDateInputViewDate variant="default_bolt">{date}</PayDateInputViewDate>
      <PayDateInputViewLabel variant="small">{label}</PayDateInputViewLabel>
    </PayDateInputViewContainer>
  );
};

export default PayDateInputView;
