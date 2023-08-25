import { styled } from '@mui/material';

export const GeneralInformationContainerForm = styled('form')(() => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  height: '100%',
  overflow: 'auto',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '& ::-webkit-scrollbar': {
    width: '0px !important',
  },
}));
