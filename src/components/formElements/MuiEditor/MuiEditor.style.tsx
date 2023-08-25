import { Box, styled } from '@mui/material';

export const MuiEditorContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '180px',
  border: `1px solid ${theme.palette.case.neutral.n100}`,
  borderRadius: '5px',
  padding: '10px',

  '& ::-webkit-scrollbar': {
    width: '8px !important',
  },
  '& .DraftEditor-root': {
    fontSize: theme.typography.default.fontSize,
    lineHeight: '19px',
  },
  '& .rdw-emoji-modal': {
    left: '-200px',
  },

  '& .public-DraftStyleDefault-block': {
    '& > span ': {
      backgroundColor: 'transparent !important',
      fontSize: `${theme.typography.default.fontSize} !important`,
      color: `${theme.palette.case.contrast.black} !important`,
    },
    '& > h2': {
      backgroundColor: 'transparent !important',
      fontSize: `${theme.typography.default.fontSize} !important`,
      color: `${theme.palette.case.contrast.black} !important`,
    },
    'a > span': { color: `${theme.palette.case.main.blue.high} !important`, '&:hover': { opacity: '0.7' } },
    margin: '0',
  },
  '& .rdw-editor-toolbar': {
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${theme.palette.case.neutral.n100}`,
    padding: '0px',
    marginBottom: '10px',
  },
  '& .rdw-option-wrapper': {
    backgroundColor: 'transparent',
    border: 'none',
  },
  '& .rdw-editor-main': {
    maxHeight: '300px',
  },
}));
