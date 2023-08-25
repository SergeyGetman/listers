import React, { FC, ReactNode } from 'react';
import { StyleSimpleBorderContainer } from './SimpleBorderContainer.style';
type SimpleBorderContainerProps = {
  children: ReactNode;
};
const SimpleBorderContainer: FC<SimpleBorderContainerProps> = ({ children }) => {
  return <StyleSimpleBorderContainer>{children}</StyleSimpleBorderContainer>;
};

export default SimpleBorderContainer;
