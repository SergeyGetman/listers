import { Box, styled } from '@mui/material';

export const ModalFooterContainer = styled(Box)(({ theme }) => ({
  flexGrow: 0,
  position: 'sticky',
  borderTop: '1px solid #E6E8F0',
  borderRadius: '0px 0px 8px 8px',
  bottom: 0,
  left: 0,
  height: '70px',
  zIndex: 10,
  backgroundColor: theme.palette.case.contrast.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: '0 24px',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    padding: '0 16px',
    borderRadius: '0px',
    justifyContent: 'center',
  },
}));
