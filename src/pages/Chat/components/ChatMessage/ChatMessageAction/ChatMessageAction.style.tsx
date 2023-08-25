import { Box, ButtonBase, styled } from '@mui/material';

export const ChatMessageActionsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${theme.palette.case.neutral.n200}`,
  borderRadius: '20px',
}));

export const ChatMessageActionsItemContainer = styled(Box)(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.case.neutral.n200}`,
  margin: '3px 0',

  '&:last-of-type': {
    borderRight: 'none',
  },
}));

export const ChatMessageActionsItem = styled(ButtonBase)(({ theme }) => ({
  height: '16px',
  padding: '0 12px',
  color: theme.palette.case.neutral.n400,
  fontSize: theme.typography.default.fontSize,
  cursor: 'pointer',
  svg: {
    width: '16px',
    height: '16px',
  },
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));
