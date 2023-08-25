import { Box, styled } from '@mui/material';

export const ChecklistItemContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['hoverColor', 'isBorderRadius'].includes(prop),
})<{
  isBorderRadius?: boolean;
  hoverColor?: string | null;
}>(({ theme, isBorderRadius, hoverColor }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  minHeight: '43px',

  borderBottom: `1px solid ${theme.palette.case.neutral.n100}`,
  backgroundColor: theme.palette.case.contrast.white,
  borderRadius: isBorderRadius ? '0px 0px 5px 5px' : '',
  '& .checklist-item-remove-btn': {
    opacity: '0',
    transition: 'opacity 0.3s',
  },

  '&:hover': {
    transition: 'all 0.5s',
    backgroundColor: hoverColor ? `${hoverColor}26` : theme.palette.case.neutral.n100,
    '& .checklist-item-remove-btn': {
      opacity: '1',
    },
  },

  [theme.breakpoints.down('md')]: {
    '& .checklist-item-remove-btn': {
      opacity: '1',
    },
  },
}));

export const ChecklistItemMainInfo = styled(Box, {
  shouldForwardProp: (prop: string) => !['isChecked'].includes(prop),
})<{ isChecked?: boolean }>(({ isChecked }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'flex-start',
  margin: '10px 5px 10px 10px',
  wordBreak: 'break-word',
  textDecoration: isChecked ? 'line-through' : '',
}));
