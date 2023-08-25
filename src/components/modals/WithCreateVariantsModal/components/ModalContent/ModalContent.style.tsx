import { Box, styled } from '@mui/material';

export const CreateVariantItemContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '56px',
  background: '#F6F7FA',
  backgroundColor: theme.palette.case.neutral.n75,
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',

  '&:first-child': {
    marginBottom: '8px',
  },
}));

export const CreateVariantItemIconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  width: '42px',
  height: '42px',
  backgroundColor: theme.palette.case.neutral.n200,
  margin: '0 10px 0 8px',
  svg: {
    width: '20px',
    height: '20px',
    path: {
      fill: theme.palette.case.neutral.n700,
    },
  },
}));
