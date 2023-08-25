import { styled } from '@mui/material';

export const LicencePlateStickerContainerForm = styled('form')(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflow: 'auto',
  scrollbarWidth: 'none',
  MsOverflowStyle: 'none !important',
  '& ::-webkit-scrollbar': {
    width: '0px !important',
  },
}));
