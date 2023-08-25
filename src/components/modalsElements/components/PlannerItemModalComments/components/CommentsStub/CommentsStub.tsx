import React, { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';

type CommentsStubProps = { description: string; img: string };

const CommentsStub: FC<CommentsStubProps> = ({ description, img }) => {
  const theme = useTheme();

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        sx={{
          color: theme.palette.case.neutral.n500,
          mb: '25px',
          maxWidth: '223px',
          textAlign: 'center',
        }}
        variant="default"
      >
        {description}
      </Typography>
      {img && <img src={img} alt="hubmeek" style={{ width: '80px' }} />}
    </Box>
  );
};

export default CommentsStub;
