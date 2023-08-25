import { ButtonBase, styled } from '@mui/material';

export const MuiSquareIconButtonContainer = styled(ButtonBase)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.light}`,
  borderRadius: '5px',
  width: 24,
  height: 24,
  display: 'flex',
  alighItems: 'center',
  justifyContent: 'center',

  '&:hover': {
    background: theme.palette.primary.light,
  },
}));
