import { Box, styled } from '@mui/material';

export const PersonalContainerBlock = styled(Box)(({ theme }) => ({
  paddingTop: '30px',
  position: 'sticky',
  zIndex: '10',
  top: '0',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.case.contrast.white,
  hr: {
    width: '100%',
    margin: 0,
    padding: '0',
    border: 'none',
    paddingTop: '3px',
    borderBottom: `1px dashed ${theme.palette.case.neutral.n400}`,
  },
}));
