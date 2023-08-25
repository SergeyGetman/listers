import { Box, Typography, styled } from '@mui/material';

export const NetworkUserCardContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['isActive'].includes(prop),
})<{ isActive: boolean }>(({ isActive, theme }) => ({
  width: '100%',
  cursor: 'pointer',
  marginBottom: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: '8px',
  border: `1px solid ${theme.palette.case.neutral.n100}`,
  padding: '14px 12px',

  borderColor: isActive ? theme.palette.case.neutral.n200 : theme.palette.case.neutral.n100,
  background: isActive ? theme.palette.case.neutral.n0 : 'initial',
  '&:hover': {
    borderColor: theme.palette.case.neutral.n200,
    background: theme.palette.case.neutral.n0,
  },
}));

export const FlexContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const TextContainer = styled(Typography)(() => ({
  maxWidth: '300px',
  wordBreak: 'break-word',
  display: '-webkit-box',
  '-webkit-box-orient': 'vertical',
  overflow: 'hidden',
  '-webkit-line-clamp': '2',
  textOverflow: 'ellipsis',
}));
