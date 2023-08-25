import { IconButton, styled } from '@mui/material';
type StyledIconButtonProps = {
  isRounded: boolean;
  isSelected: boolean;
};
export const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'isRounded' && prop !== 'isSelected',
})<StyledIconButtonProps>(({ theme, isRounded, isSelected }) => ({
  '&.MuiIconButton-root': {
    borderRadius: isRounded ? '8px' : '50%',
    backgroundColor: isSelected ? theme.palette.case.neutral.n200 : '',
    svg: {
      path: {
        fill: isSelected ? theme.palette.case.neutral.n800 : '',
      },
    },

    '&: hover': {
      backgroundColor: isSelected ? theme.palette.case.neutral.n200 : theme.palette.case.neutral.n100,
    },
    '&: disabled': {
      backgroundColor: theme.palette.case.neutral.n100,
    },

    '&.MuiIconButton-sizeLarge': {
      width: 38,
      height: 38,
      padding: '0px !important',
      svg: {
        width: 20,
        height: 20,
      },
    },
  },
}));
