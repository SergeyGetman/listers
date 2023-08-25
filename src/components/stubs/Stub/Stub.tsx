import React, { FC, ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import { StubContainer } from './Stub.style';

type ValueProps = {
  title: string;
  description?: string;
  subDescription?: string;
  img: string;
  subtitle?: string;
  imageAlt?: string;
};

type Props = {
  value: ValueProps;
  isBoltSubtitleText?: boolean;
  renderButtonComponent?: () => ReactNode;
};

const Stub: FC<Props> = ({ value, isBoltSubtitleText = true, renderButtonComponent }) => {
  return (
    <StubContainer>
      <Typography sx={{ whiteSpace: 'pre-wrap' }} variant="h1">
        {value.title}
      </Typography>

      <Typography
        sx={(theme) => ({
          margin: '8px 0 16px 0',
          maxWidth: '400px',
          color: theme.palette.case.neutral.n700,
        })}
        variant="t14r"
      >
        {value.description}
      </Typography>

      <Box sx={{ width: '100%', maxWidth: { sm: '400px', xs: '350px' } }}>
        <img src={value.img} alt={value.imageAlt} width="100%" />
      </Box>
      <Typography
        sx={(theme) => ({
          width: '100%',
          maxWidth: '592px',
          margin: '16px 0 16px 0',
          color: isBoltSubtitleText ? 'initial' : theme.palette.case.neutral.n700,
        })}
        variant={`${isBoltSubtitleText ? 'h3' : 'large'}`}
      >
        {value.subtitle ? value.subtitle : value.subDescription}
      </Typography>
      {renderButtonComponent && renderButtonComponent()}
    </StubContainer>
  );
};

export default Stub;
