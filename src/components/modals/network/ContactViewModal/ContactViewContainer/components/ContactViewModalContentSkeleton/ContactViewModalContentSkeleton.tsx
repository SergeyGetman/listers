import React from 'react';
import { Box, Skeleton } from '@mui/material';
import { ContactViewModalContentSkeletonRow } from './ContactViewModalContentSkeleton.style';

const ContactViewModalContentSkeleton = () => {
  return (
    <Box sx={{ height: '100%' }}>
      <Box sx={{ position: 'sticky' }}>
        <Skeleton variant="rectangular" height={65} />
      </Box>
      <Box sx={{ p: '0 10px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Box sx={{ width: '300px' }}>
            <ContactViewModalContentSkeletonRow>
              <Skeleton variant="rectangular" height={37} />
            </ContactViewModalContentSkeletonRow>
            <ContactViewModalContentSkeletonRow>
              <Skeleton variant="rectangular" height={37} />
            </ContactViewModalContentSkeletonRow>
            <ContactViewModalContentSkeletonRow>
              <Skeleton variant="rectangular" height={37} />
            </ContactViewModalContentSkeletonRow>
            <ContactViewModalContentSkeletonRow>
              <Skeleton variant="rectangular" height={37} />
            </ContactViewModalContentSkeletonRow>
          </Box>

          <Box sx={{ width: '300px' }}>
            <ContactViewModalContentSkeletonRow>
              <Skeleton variant="rectangular" height={37} />
            </ContactViewModalContentSkeletonRow>
            <ContactViewModalContentSkeletonRow>
              <Skeleton variant="rectangular" height={37} />
            </ContactViewModalContentSkeletonRow>
            <ContactViewModalContentSkeletonRow>
              <Skeleton variant="rectangular" height={37} />
            </ContactViewModalContentSkeletonRow>
            <ContactViewModalContentSkeletonRow>
              <Skeleton variant="rectangular" height={37} />
            </ContactViewModalContentSkeletonRow>
          </Box>
        </Box>
        <Box sx={{ mt: '16px' }}>
          <Skeleton variant="rectangular" height={37} />
        </Box>
        <Box sx={{ mt: '16px' }}>
          <Skeleton variant="rectangular" height={190} />
        </Box>
        <Box sx={{ mt: '30px' }}>
          <Skeleton variant="rectangular" height={100} />
        </Box>
        <Box sx={{ mt: '30px' }}>
          <Skeleton variant="rectangular" height={100} />
        </Box>
      </Box>
    </Box>
  );
};

export default ContactViewModalContentSkeleton;
