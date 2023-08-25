import React, { FC } from 'react';
import { Typography } from '@mui/material';
import { CardInfoContainer, CardInfoContant, CardInfoTitleContainer } from './CardInfo.style';

type Props = { title: string; children: React.ReactNode };

const CardInfo: FC<Props> = ({ title, children }) => {
  return (
    <CardInfoContainer>
      <CardInfoTitleContainer>
        <Typography variant="t16m">{title}</Typography>
      </CardInfoTitleContainer>
      <CardInfoContant>{children}</CardInfoContant>
    </CardInfoContainer>
  );
};

export default CardInfo;
