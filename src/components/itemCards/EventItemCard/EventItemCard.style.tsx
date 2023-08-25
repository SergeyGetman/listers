import { Box, styled } from '@mui/material';

export const EventItemCardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '320px',
  padding: '10px',
  margin: '10px 20px 10px 5px',
  boxSizing: 'border-box',
  backgroundColor: theme.palette.case.contrast.white,
  boxShadow: `0px 0px 3px ${theme.palette.case.neutral.n200}`,
  borderRadius: '5px',
  cursor: 'pointer',

  '&:hover': { boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.04)' },

  [theme.breakpoints.down('sm')]: {
    width: '100%',
    margin: '2px 2px 20px ',
  },
}));
