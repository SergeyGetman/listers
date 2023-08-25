import { Box, styled } from '@mui/material';

export const ChatAssignUserItemContainer = styled(Box)<{ hovered: boolean }>(({ theme, hovered }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '15px 5px',
  borderBottom: `1px solid ${theme.palette.case.neutral.n200}`,
  borderRadius: '5px',
  boxShadow: hovered ? '0px 0px 7px rgba(0, 0, 0, 0.1);' : 'initial',
}));
