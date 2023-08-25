import { Box, styled } from '@mui/material';

type GalleryPhotoContainerProps = {
  isSmallFilesWidth?: boolean;
};

export const GalleryPhotoContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['isSmallFilesWidth'].includes(prop),
})<GalleryPhotoContainerProps>(({ isSmallFilesWidth }) => ({
  height: '86px',
  width: isSmallFilesWidth ? '44px' : '86px',
  borderRadius: '5px',
  cursor: 'pointer',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const LastGalleryPhotoContainer = styled(Box)(({ theme }) => ({
  height: '86px',
  width: '43px',
  position: 'absolute',
  top: '0',
  right: '0',
  backgroundColor: theme.palette.case.backdrop.light,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));
