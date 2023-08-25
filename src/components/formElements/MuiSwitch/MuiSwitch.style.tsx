import { styled, Switch } from '@mui/material';

export const SwitchBox = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-track': { backgroundColor: theme.palette.primary.main },
}));
