import { Box, styled } from '@mui/material';

export const OrganizersItemContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['isComing'].includes(prop),
})<{ isComing?: boolean }>(({ theme, isComing }) => ({
  display: 'flex',
  cursor: isComing ? 'default' : 'pointer',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
  padding: '16px 0 0 0',
  backgroundColor: isComing ? theme.palette.case.neutral.n100 : theme.palette.case.background,
  borderRadius: '8px',
  '&:hover': {
    filter: isComing ? '' : 'drop-shadow(0px 0px 7px rgba(0, 0, 0, 0.1))',
  },
}));

export const OrganizersItemHeader = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '12px',
  svg: {
    width: 20,
    height: 20,
    path: {
      fill: theme.palette.case.neutral.n0,
    },
  },
}));

export const OrganizersItemIconContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['isComing'].includes(prop),
})<{ isComing?: boolean }>(({ theme, isComing }) => ({
  width: '36px',
  height: '36px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  marginRight: '16px',
  backgroundColor: isComing ? theme.palette.case.neutral.n500 : theme.palette.case.neutral.n600,
}));

export const OrganizersDescriptionContainer = styled(Box)(({ theme }) => ({
  minHeight: '83px',

  [theme.breakpoints.down('md')]: {
    minHeight: '100px',
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: '83px',
  },
}));

export const OrganizersItemFooter = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '33px',
  height: '54px',

  [theme.breakpoints.down('md')]: {
    marginTop: '16px',
  },

  [theme.breakpoints.down('sm')]: {
    marginTop: '33px',
  },
}));
