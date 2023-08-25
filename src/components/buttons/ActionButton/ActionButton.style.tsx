import { styled } from '@mui/material';
import { LoadingButton } from '@mui/lab';

type ItemStatusBtnProps = {
  isSelected?: boolean;
  selectedBgColor?: string;
  hoverBgColor?: string;
  isExstraSmallBtn?: boolean;
  isFullWidth?: boolean;
};

export const ActionButtonContainer = styled(LoadingButton, {
  shouldForwardProp: (prop: string) =>
    !['isSelected', 'isFullWidth', 'selectedBgColor', 'hoverBgColor', 'isExstraSmallBtn'].includes(prop),
})<ItemStatusBtnProps>(
  ({ theme, isSelected, selectedBgColor, hoverBgColor, isExstraSmallBtn, isFullWidth }) => ({
    padding: '10px 11px',
    borderColor: isSelected ? selectedBgColor : theme.palette.case.neutral.n100,
    fontSize: '13px',
    height: '26px',
    width: isFullWidth ? '100%' : isExstraSmallBtn ? '92px' : '140px',
    pointerEvents: isSelected ? 'none' : 'initial',
    fontWeight: '400',
    lineHeight: '13px',
    whiteSpace: 'nowrap',
    color: isSelected ? theme.palette.case.contrast.white : selectedBgColor,
    transition: 'all 0.3s',
    backgroundColor: isSelected ? selectedBgColor : 'transparent',
    svg: {
      path: {
        transition: 'all 0.3s',
        fill: isSelected ? theme.palette.case.contrast.white : '',
      },
    },

    [theme.breakpoints.down('sm')]: {
      padding: '10px 5px',
      width: isFullWidth ? '100%' : isExstraSmallBtn ? '52px' : '100px',
    },

    '&:hover': {
      color: selectedBgColor,
      backgroundColor: isSelected ? selectedBgColor : hoverBgColor,
      borderColor: isSelected ? selectedBgColor : hoverBgColor,
      boxShadow: 'none',
      svg: {
        path: {
          transition: 'all 0.3s',
          fill: isSelected ? theme.palette.case.contrast.white : selectedBgColor,
        },
      },
    },

    '&: disabled': {
      borderColor: theme.palette.case.neutral.n400,
      backgroundColor: theme.palette.case.neutral.n400,
      color: theme.palette.case.contrast.white,
      svg: {
        path: {
          fill: theme.palette.case.contrast.white,
        },
      },
    },
  }),
);
