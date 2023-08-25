import { Box, MenuItem, styled } from '@mui/material';

export const ItemSelectContainer = styled(Box)(() => ({
  display: 'flex',
  marginRight: '12px',
  alignItems: 'center',
}));

type ActionMenuItemSelectType = {
  isSelected?: boolean;
};

export const ActionMenuItemSelect = styled(MenuItem, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<ActionMenuItemSelectType>(({ theme, isSelected }) => ({
  padding: '5px 0 5px 8px',
  minHeight: '26px',
  borderRadius: '5px',
  margin: '8px 10px 0 10px ',
  '&:first-of-type': {
    margin: '2px 10px 0px 10px ',
  },
  '&:last-of-type': {
    margin: '8px 10px 2px 10px ',
  },
  '&:hover': {
    backgroundColor: theme.palette.case.neutral.n100,
    color: theme.palette.case.contrast.black,
  },
  color: isSelected ? theme.palette.case.contrast.black : 'initial',
  background: isSelected ? theme.palette.case.neutral.n100 : 'initial',
}));
