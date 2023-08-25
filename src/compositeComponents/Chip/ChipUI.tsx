import React, { FC, ReactNode } from 'react';
import { ChipProps } from '@mui/material';
import { ChipUIContainer } from './ChipUI.style';

type ChipUIPropsType = ChipProps & {
  label: string;
  icon?: ReactNode;
};

export const ChipUI: FC<ChipUIPropsType> = ({ icon, label, ...restProps }) => {
  return <ChipUIContainer icon={icon} label={label} isHaveLabel={!!label} {...restProps} />;
};
