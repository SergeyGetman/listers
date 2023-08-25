import { Badge, IconButton, styled } from '@mui/material';

type NavigationBtnProps = {
  background?: string;
};
export const NavigationBtn = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'background',
})<NavigationBtnProps>(({ theme, background }) => ({
  '&.MuiIconButton-root': {
    backgroundColor: background ? background : theme.palette.case.neutral.n100,
    color: theme.palette.case.contrast.black,
    '&: disabled': {
      backgroundColor: theme.palette.case.neutral.n100,
    },
  },
  '&.MuiIconButton-sizeLarge': {
    width: 40,
    height: 40,
    svg: {
      width: 24,
      height: 24,
    },
  },

  '&.MuiIconButton-sizeMedium': {
    width: 32,
    height: 32,
    svg: {
      width: 19,
      height: 19,
    },
  },
  '&.MuiIconButton-sizeSmall': {
    width: 20,
    height: 20,
    svg: {
      width: 12,
      height: 12,
    },
  },
}));

export const NavigationButtonBadge = styled(Badge)({
  '& .BaseBadge-badge': {
    transform: 'scale(1) translate(25%, -25%)',
  },
});
