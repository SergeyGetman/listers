import { Box, styled } from '@mui/material';

export const VariantItemContainerV2 = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: '560px',
  height: '72px',
  padding: '12px',
  marginBottom: '12px',
  '&:last-child': {
    marginBottom: '0',
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: '8px',
  },
  borderRadius: '8px',
  border: `1px solid ${theme.palette.case.neutral.n200}`,
  backgroundColor: theme.palette.case.neutral.n0,
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  '&:active': {
    transition: 'all 0.3s',
    '.variant-icon-container': {
      backgroundColor: theme.palette.case.neutral.n200,
    },
  },
  '&:hover': {
    '.variant-icon-container': {
      transition: 'all 0.3s',
      backgroundColor: theme.palette.case.neutral.n100,
    },
  },
}));

export const VariantItemIconContainerV2 = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  border: `1px solid ${theme.palette.case.neutral.n200}`,
  width: '48px',
  height: '48px',
  backgroundColor: theme.palette.case.neutral.n0,
  marginRight: '16px',
  svg: {
    width: '24px',
    height: '24px',
    path: {
      fill: theme.palette.case.neutral.n700,
    },
  },
}));
