import React, { FC } from 'react';
import { Box } from '@mui/material';
import InfoCardHeader from '../../headers/InfoCardHeader';
import { StyledBaseContainer } from './BaseContainer.style';
type BaseContainerProps = {
  children?: React.ReactNode;
  title: string;
  subTitle?: string;
  isShowHeaderBtn?: boolean;
  headerCallback?: () => void;
  rightText?: string;
};
const BaseContainer: FC<BaseContainerProps> = ({
  children,
  title,
  subTitle,
  isShowHeaderBtn,
  headerCallback,
  rightText,
}) => {
  return (
    <StyledBaseContainer>
      <InfoCardHeader
        title={title}
        rightText={rightText}
        subTitle={subTitle}
        callback={headerCallback}
        isShowBtn={isShowHeaderBtn}
      />
      <Box sx={{ width: '100%', p: '24px' }}>{children}</Box>
    </StyledBaseContainer>
  );
};

export default BaseContainer;
