import { Box, styled, Typography } from '@mui/material';

type MuiBaseInputViewContainerProps = {
  isShowBottomBorder?: boolean;
};

export const MuiPhoneNumberInputViewContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['isShowBottomBorder'].includes(prop),
})<MuiBaseInputViewContainerProps>(({ theme, isShowBottomBorder }) => ({
  borderBottom: isShowBottomBorder ? ` 1px solid ${theme.palette.case.neutral.n200}` : 'none',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  a: {
    '&: hover': { opacity: '0.7' },
    color: theme.palette.case.main.blue.high,
  },
}));

export const MuiPhoneNumberInputViewLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.case.neutral.n700,
  marginBottom: '5px',
}));

export const MuiPhoneNumberInputViewContentContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));
