import { Box, styled, Typography } from '@mui/material';

export const ChatInputContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.case.contrast.white,
  borderRadius: '5px',
  boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.12)',
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    borderRadius: 0,
    boxShadow: theme.palette.case.shadow.small,
  },
}));

export const ChatInputInputContainer = styled(Box)(() => ({
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export const ChatInputButtonContainer = styled(Box)(({ theme }) => ({
  marginLeft: '10px',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    marginLeft: '5px',
  },
}));

export const ChatInputTextField = styled(Box)(({ theme }) => ({
  marginLeft: '13px',
  '& .custom-text-area': {
    width: '100%',
    position: 'relative',
    border: 'none',
    resize: 'none',
    backgroundColor: 'transparent',
    fontFamily: theme.typography.fontFamily,
    fontStyle: theme.typography.default.fontStyle,
    fontWeight: theme.typography.default.fontWeight,
    fontSize: theme.typography.default.fontSize,
    lineHeight: theme.typography.default.lineHeight,
    '&:focus': {
      border: 'none',
      outlineOffset: '0px !important',
      outline: 'none !important',
    },
    '&:placeholder': {
      color: theme.palette.case.neutral.n400,
    },
    '&::-webkit-scrollbar': {
      width: '6px',
    },
  },
}));

export const ChatInputFileName = styled(Typography)<{ isLoading: boolean }>(({ theme, isLoading }) => ({
  cursor: isLoading ? 'default' : 'pointer',
  transition: 'all 0.3s',
  opacity: isLoading ? 0.5 : 1,
  color: theme.palette.primary.main,
  '&:hover': {
    textDecoration: isLoading ? 'none' : 'underline',
  },
}));
