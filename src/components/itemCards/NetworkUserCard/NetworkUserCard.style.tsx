import { Box, styled, Typography } from '@mui/material';

export const NetworkUserCardContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['isContact'].includes(prop),
})<{
  isContact?: boolean;
}>(({ theme, isContact }) => ({
  width: '223px',
  height: isContact ? '221px' : '262px',
  display: 'flex',
  cursor: 'pointer',
  boxShadow: `0px 0px 3px ${theme.palette.case.neutral.n200}`,
  background: theme.palette.case.contrast.white,
  borderRadius: '5px',
  alignItems: 'center',
  flexDirection: 'column',
  '&:hover': {
    boxShadow: theme.palette.case.shadow.big,
  },
}));

export const NetworkUserCardHeader = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '16px 0',
  padding: '0 18px 0 22px',
}));

export const NetworkUserMobileCardHeader = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));
type NetworkUserCardNameContainerType = {
  isIncomingContact?: boolean;
  isCenter?: boolean;
};
export const NetworkUserCardNameContainer = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isCenter' && prop !== 'isIncomingContact',
})<NetworkUserCardNameContainerType>(({ theme, isCenter, isIncomingContact }) => ({
  width: '100%',
  padding: '0 15px',
  margin:
    isIncomingContact && isCenter
      ? '10px 0'
      : isIncomingContact && !isCenter
      ? '0 0 1px 0'
      : isCenter
      ? '11px 0 0 0'
      : 'initial',
  textAlign: 'center',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: theme.palette.case.neutral.n700,
}));

export const NetworkUserCardNameMobileContainer = styled(Typography)(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: theme.palette.case.neutral.n700,
}));

export const NetworkUserCardSecondNameMobileContainer = styled(Typography)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const NetworkUserCardTextMobileContainer = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  margin: ' 0 10px',
  overflow: 'hidden',
}));

export const NetworkUserCardNameRoleMobileContainer = styled(Box)(() => ({
  width: '100%',
  margin: ' 0 10px',
  overflow: 'hidden',
}));
