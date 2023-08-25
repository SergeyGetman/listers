import { styled, Box } from '@mui/material';

export const GroupModalContainerBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflow: 'auto',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '& ::-webkit-scrollbar': {
    width: '0px !important',
  },
}));

export const AddGroupAvatarContainer = styled(Box)(({ theme }) => ({
  width: '80px',
  height: '80px',
  background: 'green',
  borderRadius: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  backgroundColor: theme.palette.primary.main,
}));
