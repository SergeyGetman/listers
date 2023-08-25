import { Box, styled } from '@mui/material';
type HubsItemContainerProps = {
  isComing?: boolean;
  color?: string;
};
export const HubsItemContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['isComing'].includes(prop),
})<HubsItemContainerProps>(({ theme, isComing }) => ({
  display: 'flex',
  cursor: isComing ? 'default' : 'pointer',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
  padding: '16px 0 0 0',
  backgroundColor: isComing ? theme.palette.case.neutral.n100 : theme.palette.case.background,
  borderRadius: '5px',
  '&:hover': {
    filter: isComing ? '' : 'drop-shadow(0px 0px 7px rgba(0, 0, 0, 0.1))',
  },
}));

export const HubsItemContent = styled(Box)(({ theme }) => ({
  minHeight: '164px',
  padding: '0 16px',

  [theme.breakpoints.down('md')]: {
    minHeight: 'initial',
  },
}));

export const HubsItemHeader = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '12px',
  svg: {
    width: '20px',
    path: {
      fill: theme.palette.case.contrast.white,
    },
  },
}));

export const HubsItemFooter = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '54px',

  [theme.breakpoints.down('md')]: {
    marginTop: '16px',
  },

  [theme.breakpoints.down('sm')]: {
    marginTop: '33px',
  },
}));

export const HubsDescriptionContainer = styled(Box)(({ theme }) => ({
  minHeight: '83px',

  [theme.breakpoints.down('md')]: {
    minHeight: '100px',
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: '83px',
  },
}));

export const HubIconContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['isComing', 'color'].includes(prop),
})<HubsItemContainerProps>(({ theme, isComing, color }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '36px',
  height: '36px',
  background: isComing ? theme.palette.case.neutral.n400 : color,
  borderRadius: '20px',
  marginRight: '16px',
}));
