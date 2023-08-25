import { Link } from 'react-router-dom';
import { Box, styled } from '@mui/material';

type NotificationRequestCardContainerPropsType = {
  borderColor: string;
};

export const NotificationRequestCardWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '357px',
  marginTop: '8px',
  borderRadius: '0px 4px 4px 0px',

  ':hover': {
    background: theme.palette.case.neutral.n100,
  },

  ' a:hover': {
    opacity: '1',
  },
}));

export const NotificationRequestCardContainer = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'borderColor',
})<NotificationRequestCardContainerPropsType>(({ borderColor }) => ({
  textDecoration: 'unset',
  display: 'flex',
  width: '100%',
  maxWidth: '359px',
  padding: '8px',
  borderLeft: `2px solid ${borderColor}`,
  borderRadius: '0px 4px 4px 0px',
  cursor: 'pointer',
  color: 'initial !important',
}));

export const NotificationRequestCardButtonsContainer = styled(Box)(() => ({
  marginTop: '12px',
  display: 'flex',
  width: '100%',
  overflow: 'hidden',
  justifyContent: 'space-between',
}));

export const NotificationRequestCardButtonContainer = styled(Box)(({ theme }) => ({
  borderRadius: '5px',
  backgroundColor: theme.palette.case.contrast.white,
}));
