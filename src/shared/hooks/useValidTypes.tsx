import { useCallback } from 'react';

export const acceptedFileTypes = [
  'image/png',
  'image/bmp',
  'image/jpg',
  'image/jpeg',
  'application/pdf',
  'application/msword',
  'application/vnd.ms-excel',
  'application/vnd.mspowerpoint',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.oasis.opendocument.presentation',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.oasis.opendocument.text',
  'text/plain',
  'text/rtf',
  'text/csv',
  '.pps',
  '.doc',
  '.xls',
  '.xlsx',
  '.docx',
  '.ppt',
  '.pptx',
  '.odp',
  '.txt',
  '.text',
  '.rtf',
  '.odt',
  '.ppsx',
  '.pot',
  '.potx',
];

const acceptedPhotoTypes = ['image/png', 'image/bmp', 'image/jpg', 'image/jpeg'];

const useValidTypes = () => {
  const getAcceptedFormat = useCallback((type: 'photo' | 'file') => {
    switch (type) {
      case 'photo':
        return acceptedPhotoTypes.join(',');
      case 'file':
        return acceptedFileTypes.join(',');
      default:
        return '';
    }
  }, []);

  const validateMediaFormat = useCallback((mediaType: 'photo' | 'file', fileType: string) => {
    if (mediaType === 'photo') {
      if (acceptedPhotoTypes.find((item) => item === fileType)) {
        return true;
      }
      return false;
    }
    if (mediaType === 'file') {
      if (acceptedFileTypes.find((item) => item === fileType)) {
        return true;
      }
      return false;
    }
    return false;
  }, []);

  return { validateMediaFormat, getAcceptedFormat };
};

export default useValidTypes;
