import { styled } from '@mui/material';
import { LoadingButton } from '@mui/lab';

type ItemStatusBtnProps = {
  isSelected?: boolean;
  selectedBgColor?: string;
  hoverBgColor?: string;
  customWidth?: string;
  isExstraSmallBtn?: boolean;
};

export const ItemStatusBtn = styled(LoadingButton, {
  shouldForwardProp: (prop) =>
    prop !== 'isSelected' &&
    prop !== 'selectedBgColor' &&
    prop !== 'hoverBgColor' &&
    prop !== 'isExstraSmallBtn',
})<ItemStatusBtnProps>(({ theme, isSelected, selectedBgColor, hoverBgColor, isExstraSmallBtn }) => ({
  padding: '4px 12px',
  borderColor: isSelected ? selectedBgColor : theme.palette.case.neutral.n100,
  fontSize: '14px',
  height: isExstraSmallBtn ? 26 : 32,
  fontWeight: '500',
  lineHeight: '24px',
  whiteSpace: 'nowrap',
  color: isSelected ? selectedBgColor : theme.palette.case.neutral.n600,
  transition: 'all 0.3s',
  backgroundColor: 'transparent',

  [theme.breakpoints.down('sm')]: {
    padding: '4px 12px',
  },

  '&:hover': {
    color: isSelected ? theme.palette.case.contrast.white : selectedBgColor,
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
}));
