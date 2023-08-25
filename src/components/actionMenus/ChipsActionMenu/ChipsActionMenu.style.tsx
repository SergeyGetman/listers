import { Box, Menu, MenuItem, styled } from '@mui/material';

export const ChipsActionMenuContainer = styled(Menu)(({ theme }) => ({
  '& .MuiBackdrop-root': {
    backgroundColor: 'transparent',
  },

  '& .MuiMenu-paper': {
    boxShadow: '0px 4px 16px rgba(38, 44, 74, 0.16)',
    padding: '0px',
    width: '186px',
    backgroundColor: theme.palette.case.background,
    '& .MuiList-root': {
      padding: 0,
    },
  },
}));

export const IconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  width: '36px',
  height: '36px',
  backgroundColor: theme.palette.case.neutral.n200,
  marginRight: '8px',
}));

export const ChipsActionMenuElement = styled(MenuItem)(({ theme }) => ({
  boxShadow: 'none',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '5px',
  height: '44px',
  mt: '10px',
  mb: '1px',
  width: '100%',
  fontSize: theme.typography.default.fontSize,
  lineHeight: theme.typography.default.lineHeight,
  fontWeight: theme.typography.default.fontWeight,
  padding: '4px 8px',
  color: theme.palette.case.neutral.n700,
  backgroundColor: theme.palette.case.background,
  [theme.breakpoints.down('sm')]: {
    minHeight: '29px',
  },
  '&:last-of-type': {
    marginBottom: 0,
  },
  svg: {
    width: '20px',
    height: '20px',
    path: {
      fill: theme.palette.case.neutral.n700,
    },
  },

  '&:hover': {
    transition: 'all 0.3s',
    backgroundColor: theme.palette.case.neutral.n100,
    '.chips-action-icon-container': {
      transition: 'all 0.3s',
      backgroundColor: theme.palette.case.neutral.n400,
      svg: {
        path: {
          fill: theme.palette.case.neutral.n900,
        },
      },
    },
  },
}));
