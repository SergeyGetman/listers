import React, { FC } from 'react';
import { MuiLinkButtonContainer } from './MuiLinkButton.style';

type MuiLinkButtonProps = {
  children: React.ReactNode;
  [x: string]: any;
};

const MuiLinkButton: FC<MuiLinkButtonProps> = ({ children, ...args }) => {
  return <MuiLinkButtonContainer {...args}>{children}</MuiLinkButtonContainer>;
};

export default MuiLinkButton;
