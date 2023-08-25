import { Box, styled, Typography } from '@mui/material';

export const ModalHeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexGrow: 0,
  alignItems: 'center',
  width: '100%',
  padding: '0 16px 0 24px',
  height: '68px',
  position: 'sticky',
  zIndex: 30,
  backgroundColor: theme.palette.case.contrast.white,
  top: 0,
  left: 0,
  borderBottom: `1px solid ${theme.palette.case.neutral.n200}`,
  borderRadius: '8px 8px 0px 0px',

  [theme.breakpoints.down('sm')]: {
    height: '48px',
    padding: '0 6px 0 16px',
    borderRadius: '0px',
  },
}));

export const ModalHeaderContentContainer = styled(Box)(() => ({
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'space-between',
  width: '100%',
}));

export const ModalHeaderTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.case.neutral.n900,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  padding: '5px 0',

  [theme.breakpoints.down('sm')]: {
    padding: '10px 0',
  },
}));
