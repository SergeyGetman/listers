import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';

type Props = { title?: string; description?: string };

const TermsModalBlock: FC<Props> = ({ title, description }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="large_bolt" sx={{ mt: '10px' }}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="default" sx={{ whiteSpace: 'pre-line', mb: '10px' }}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default TermsModalBlock;
