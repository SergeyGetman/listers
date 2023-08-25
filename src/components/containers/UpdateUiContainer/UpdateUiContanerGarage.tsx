import React, { FC } from 'react';
import { StyledUpdateUiGarageContainer } from './UpdateUiConteinerGarage.style';

export interface IUpdateUiContainerGarage {
  title?: string;
  children: React.ReactNode;
  width?: string;
  height?: string;
  maxWidth?: string;
  paramsGridMultiplyFirstBlock?: string;
  paramsGridMultiplySecondBlock?: string;
}

const UpdateUiContainerGarage: FC<IUpdateUiContainerGarage> = ({
  title,
  children,
  paramsGridMultiplySecondBlock,
  paramsGridMultiplyFirstBlock,
  width,
  height,
  maxWidth,
  ...rest
}) => {
  const firstBlockSize = paramsGridMultiplyFirstBlock || '';
  const secondBlockSize = paramsGridMultiplySecondBlock || '';

  return (
    <StyledUpdateUiGarageContainer
      {...rest}
      width={width}
      height={height}
      maxWidth={maxWidth}
      paramsGridMultiplyFirstBlock={firstBlockSize}
      paramsGridMultiplySecondBlock={secondBlockSize}
    >
      {title}
      {children}
    </StyledUpdateUiGarageContainer>
  );
};

export default UpdateUiContainerGarage;
