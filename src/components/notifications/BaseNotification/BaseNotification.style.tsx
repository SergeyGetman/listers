import { styled, Box } from '@mui/material';

type BaseNotificationLeftBlockProps = {
  iconColor?: string;
  bgColor?: string;
};

export const BaseNotificationContainer = styled(Box)(({ theme }) => ({
  maxWidth: '285px',
  minWidth: '250px',
  width: '100%',
  height: '100%',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.case.background,
  minHeight: '60px',
  borderRadius: '5px',
  boxShadow: theme.palette.case.shadow.big,
  cursor: 'pointer',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
  },
}));

export const BaseNotificationLeftBlock = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'iconColor' && prop !== 'bgColor',
})<BaseNotificationLeftBlockProps>(({ iconColor, bgColor }) => ({
  position: 'absolute',
  backgroundColor: bgColor,
  height: '100%',
  width: '44px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  borderRadius: '5px 0 0 5px',
  svg: {
    width: '24px',
    height: '24px',
    path: {
      fill: iconColor,
    },
  },
}));

export const BaseNotificationRightBlock = styled(Box)(() => ({
  padding: '10px 10px 10px 60px',
  fontSize: '14px',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
}));
