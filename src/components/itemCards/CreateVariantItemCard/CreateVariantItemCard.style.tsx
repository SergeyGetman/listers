import { Box, styled } from '@mui/material';

// TODO add new colors
export const CreateVariantItemContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'background' && prop !== 'hoverBackground',
})<{ background?: string; hoverBackground?: string }>(({ theme, background, hoverBackground }) => ({
  width: '100%',
  maxWidth: '381px',
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
  backgroundColor: background ? background : theme.palette.case.neutral.n0,
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  '&:active': {
    transition: 'all 0.3s',
    '.variant-icon-container': {
      backgroundColor: hoverBackground ? 'none' : theme.palette.case.neutral.n200,
    },
  },
  '&:hover': {
    background: hoverBackground ? hoverBackground : 'initial',
    '.variant-icon-container': {
      transition: 'all 0.3s',
      backgroundColor: hoverBackground ? 'none' : theme.palette.case.neutral.n100,
    },
  },
}));

export const CreateVariantItemIconContainer = styled(Box)(({ theme }) => ({
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

export const CreateVariantRightIconContainer = styled(Box)(({ theme }) => ({
  svg: {
    marginLeft: '8px',
    width: '24px',
    height: '24px',
    path: {
      fill: theme.palette.case.neutral.n700,
    },
  },
}));
