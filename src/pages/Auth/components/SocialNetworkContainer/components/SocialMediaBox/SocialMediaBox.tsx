import React, { FC } from 'react';
import { ButtonBase } from './SocialMediaBox.style';
type SocialMediaBoxProps = {
  onClick: () => void;
  children: React.ReactNode;
};
const SocialMediaBox: FC<SocialMediaBoxProps> = ({ onClick, children }) => {
  return <ButtonBase onClick={onClick}>{children}</ButtonBase>;
};

export default SocialMediaBox;
