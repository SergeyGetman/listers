import { Box, styled } from '@mui/material';

export const StyledRatingBlock = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '30px',
}));

export const StyledRatingStars = styled(Box)(() => ({
  marginLeft: '20px',
  label: {
    paddingLeft: '20px',
  },
}));
