import { Box, Popover, styled, Typography } from '@mui/material';

export const ListPopover = styled(Popover)(({ theme }) => ({
  '& .MuiBackdrop-root': {
    backgroundColor: 'transparent',
  },
  '& .MuiPaper-root': {
    padding: '8px',
    maxHeight: '211px',
    minHeight: '100px',
    width: '208px',
    boxShadow: theme.palette.case.shadow.small,
  },
}));

type UserListPopoverItemType = {
  isButton?: boolean;
};

export const UserListPopoverItemStyle = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isButton',
})<UserListPopoverItemType>(({ isButton }) => ({
  width: isButton ? '208px' : '208px',
  height: '30px',
  marginBottom: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  '&:last-of-type': {
    marginBottom: 0,
  },
  cursor: isButton ? 'pointer' : 'default',
  '&:hover': {
    opacity: isButton ? 0.6 : 1,
  },
}));

export const UserListPopoverInfo = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginLeft: '10px',
}));

export const UserListPopoverConnectionRole = styled(Typography)(({ theme }) => ({
  color: theme.palette.case.neutral.n400,
  lineHeight: '16px',
}));

export const ShowMoreUsersButtonIconWrap = styled(Box)(({ theme }) => ({
  width: '27px',
  height: '27px',
  borderRadius: '50%',
  color: theme.palette.primary.main,
  background: theme.palette.case.contrast.white,
  border: `1px solid ${theme.palette.primary.main}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
