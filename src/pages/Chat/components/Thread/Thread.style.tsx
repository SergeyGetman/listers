import { styled } from '@mui/material';

export const ThreadContainer = styled('div')<{ active: boolean }>(({ theme, active }) => ({
  width: '100%',
  height: '77px',
  boxShadow: `0px 0px 3px ${theme.palette.case.neutral.n200}`,
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'all 0.3s',
  display: 'flex',
  alignItems: 'center',
  padding: '11px',
  backgroundColor: active ? theme.palette.case.contrast.white : 'initial',
  '&:hover': {
    boxShadow: theme.palette.case.shadow.big,
  },
}));
