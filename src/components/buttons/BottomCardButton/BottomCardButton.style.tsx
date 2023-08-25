import { styled } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

export const BottomCardButtonItem = styled(LoadingButton, {
  shouldForwardProp: (prop: string) => !['textColor', 'hoverTextColor'].includes(prop),
})<{ textColor?: string; hoverTextColor?: string }>(({ theme, textColor, hoverTextColor }) => ({
  borderTop: `1px solid ${theme.palette.case.neutral.n300}`,
  borderRadius: '0px 0px 8px 8px',
  height: '54px',
  backgroundColor: theme.palette.case.contrast.white,
  boxShadow: 'none',
  color: textColor ? textColor : theme.palette.case.primary.p600,
  fontWeight: 700,
  width: '100%',
  '&:hover': {
    color: hoverTextColor ? hoverTextColor : theme.palette.case.primary.p800,
    backgroundColor: theme.palette.case.contrast.white,
    boxShadow: 'none',
  },
  '&:disabled': {
    color: theme.palette.case.neutral.n400,
    background: theme.palette.case.neutral.n100,
  },
}));
