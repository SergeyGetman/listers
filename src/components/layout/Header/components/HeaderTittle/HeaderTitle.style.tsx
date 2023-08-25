import { Box, styled } from '@mui/material';

export const HeaderTitleContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const HeaderTittleItem = styled(Box)(({ theme }) => ({
  marginRight: '5px',
  color: `${theme.palette.case.neutral.n500} !important`,

  a: {
    color: `${theme.palette.case.neutral.n800} !important`,
    textDecoration: 'none',
    paddingRight: '10px',
    '&:hover': {
      opacity: 0.6,
    },
  },
}));
