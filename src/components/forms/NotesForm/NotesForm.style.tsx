import { Box, styled } from '@mui/material';

type NotesFormContainerProps = {
  hasError: boolean;
};

export const NotesFormContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['hasError'].includes(prop),
})<NotesFormContainerProps>(({ theme, hasError }) => ({
  width: '100%',
  maxWidth: '315px',
  flexGrow: '1',
  minWidth: '266px',
  height: '203px',
  border: `1px solid ${hasError ? `${theme.palette.error.main}` : `${theme.palette.case.neutral.n100}`}`,
  borderRadius: '5px',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    boxShadow: theme.palette.case.shadow.big,
  },
}));

export const NotesFormHeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '13px',
  input: {
    width: '100%',
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent !important',
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.default_bolt.fontWeight,
    fontSize: theme.typography.default_bolt.fontSize,
    color: theme.palette.case.contrast.black,
    '&::placeholder': {
      color: theme.palette.case.neutral.n400,
    },
  },
}));

export const NotesFormBodyContainer = styled(Box)(({ theme }) => ({
  marginBottom: '12px',
  overflow: 'hidden',
  flexGrow: '1',
  '&::-webkit-scrollbar': {
    width: '0px',
  },
  textarea: {
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    width: '100%',
    border: 'none',
    backgroundColor: 'transparent !important',
    outline: 'none',
    resize: 'none',
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.default.fontWeight,
    fontSize: theme.typography.default.fontSize,
    lineHeight: theme.typography.default.lineHeight,
    color: theme.palette.case.contrast.black,
    '&::placeholder': {
      color: theme.palette.case.neutral.n400,
    },
  },
}));

export const NotesFormFooterContainer = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));
