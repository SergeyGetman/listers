import React, { FC } from 'react';
import { MuiSquareIconButtonContainer } from './MuiSquareIconButton.styled';

type Props = {
  onClick: () => void;
  children: React.ReactNode;
};

const MuiSquareIconButton: FC<Props> = ({ onClick, children }) => {
  return <MuiSquareIconButtonContainer onClick={onClick}>{children}</MuiSquareIconButtonContainer>;
};

export default MuiSquareIconButton;
