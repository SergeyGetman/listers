import { styled } from '@mui/material';

export const RadioButtonIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 17,
  height: 17,
  backgroundColor: theme.palette.case.neutral.n100,
}));

export const RadioButtonCheckedIcon = styled(RadioButtonIcon)(({ theme }) => ({
  backgroundColor: theme.palette.case.neutral.n100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:before': {
    display: 'block',
    width: 9,
    height: 9,
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    content: '""',
  },
  'input:disabled ~ &': {
    '&:before': {
      display: 'block',
      width: 9,
      height: 9,
      backgroundColor: theme.palette.case.neutral.n400,
      borderRadius: '50%',
      content: '""',
    },
  },
}));
