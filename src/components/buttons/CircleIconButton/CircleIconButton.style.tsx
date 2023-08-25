import { Box, ButtonBase, styled } from '@mui/material';
import { palette } from '../../../theme/palette';

export const CircleIconButtonContainer = styled(ButtonBase, {
  shouldForwardProp: (prop: string) => !['color', 'disabled', 'isButtonPadding'].includes(prop),
})<{
  isButtonPadding: boolean;
}>(({ isButtonPadding, disabled }) => ({
  color: disabled ? palette.case.neutral.n600 : 'initial',

  borderRadius: '5px',
  padding: isButtonPadding ? '5px' : '5px 0',
}));

export const CircleIconButtonIcon = styled(Box, {
  shouldForwardProp: (prop: string) => !['color', 'disabled', 'isButtonPadding'].includes(prop),
})<{
  color: string;
  disabled: boolean;
  isButtonPadding: boolean;
}>(({ theme, color, disabled, isButtonPadding }) => ({
  width: isButtonPadding ? '28px' : 'initial',
  height: isButtonPadding ? '28px' : 'initial',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color,

  svg: {
    path: {
      fill: disabled ? palette.case.neutral.n600 : '',
    },
  },
  '& .MuiSvgIcon-root': {
    fontSize: '14px',
    color: theme.palette.case.contrast.white,
  },
}));
