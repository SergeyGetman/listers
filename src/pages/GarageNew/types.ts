import React from 'react';
import { MuiButtonProps } from '../../components/buttons/MuiButton/MuiButton';

export type ButtonsType = MuiButtonProps & {
  isShow: boolean | undefined;
  isLoadingBtn?: boolean;
  loading?: boolean;
  tooltipText?: string;
  isReadyForSBM?: boolean;
};

export type IFooterNavigateGarage = {
  children?: React.ReactNode;
  skipBtnProps?: ButtonsType;
  backBtnProps?: ButtonsType;
  nextBtnProps?: ButtonsType;
  isReadyForSubmit?: ButtonsType;
};

export type CardInformationPathTabs = 'general-information' | 'insurance' | 'gallery' | 'share';
