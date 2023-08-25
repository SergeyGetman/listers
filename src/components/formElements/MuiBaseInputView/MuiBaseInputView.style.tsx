import { Box, Typography, styled } from '@mui/material';

type MuiBaseInputViewLabelProps = {
  isLate?: boolean;
};

type MuiBaseInputViewContainerProps = {
  isShowBottomBorder?: boolean;
};

export const MuiBaseInputViewContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['isShowBottomBorder'].includes(prop),
})<MuiBaseInputViewContainerProps>(({ theme, isShowBottomBorder }) => ({
  borderBottom: isShowBottomBorder ? ` 1px solid ${theme.palette.case.neutral.n200}` : 'none',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

export const MuiBaseInputViewLabel = styled(Typography, {
  shouldForwardProp: (prop: string) => !['isLate'].includes(prop),
})<MuiBaseInputViewLabelProps>(({ theme, isLate }) => ({
  color: isLate ? theme.palette.case.warning.high : theme.palette.case.neutral.n700,
  marginBottom: '5px',
}));

export const MuiBaseInputViewContentContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));
export const MuiBaseInputViewContentContainerText = styled(Typography)(({ theme }) => ({
  height: '20px',
  overflow: 'hidden',
  alignItems: 'flex-start',

  '& p': { margin: '0', width: '100%', overflow: 'hidden', textOverflow: 'ellipsis' },
  '& pre': { margin: '0' },
  '& ol': { margin: '0', paddingLeft: '16px' },
  '& a': { color: `${theme.palette.case.main.blue.high} !important`, '&:hover': { opacity: '0.7' } },
  '& span': {
    backgroundColor: 'transparent !important',
    color: `${theme.palette.case.contrast.black} !important`,
    fontSize: `${theme.typography.default.fontSize} !important`,
  },
}));

export const DragIndicatorButtonContainer = styled('div')(() => ({
  position: 'absolute',
  top: '20px',
  right: '7px',
}));
