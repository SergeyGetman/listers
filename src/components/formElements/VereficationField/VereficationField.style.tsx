import { Box, styled } from '@mui/material';

export const VereficationFieldContainer = styled(Box)(({ theme }) => ({
  '& .container': {
    width: '248px',
    height: '38px',
  },
  '& .character': {
    color: theme.palette.case.neutral.n700,
    maxWidth: '32px',
    height: '38px',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '24px',
    background: theme.palette.case.neutral.n0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${theme.palette.case.neutral.n300}`,
    borderRadius: '4px',
  },
  '& #field-2': {
    marginRight: '18px',
  },
  '& .character--inactive': {
    background: theme.palette.case.neutral.n50,
  },
  '& .character--selected': {
    outline: `1px solid ${theme.palette.case.neutral.n300}`,
  },
}));
