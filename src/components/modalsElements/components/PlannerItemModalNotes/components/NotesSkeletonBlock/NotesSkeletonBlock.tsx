import React, { FC } from 'react';
import { Box, Skeleton } from '@mui/material';

const NotesSkeletonBlock: FC = () => {
  const skeletonArr = Array(8).fill('');

  return (
    <>
      {skeletonArr.map((item, index) => (
        <Box key={index} sx={{ height: '160px', marginBottom: '16px', width: '100%' }}>
          <Skeleton sx={{ borderRadius: '5px' }} variant="rectangular" width="100%" height={160} />
        </Box>
      ))}
    </>
  );
};

export default NotesSkeletonBlock;
