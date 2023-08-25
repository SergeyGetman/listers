import React, { forwardRef, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { ReactComponent as AddFileIcon } from '../../../assets/Images/add-image-icon.svg';
type UploadFileContainerProps = {
  handleGetDataFromInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGetDataFromDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  acceptedFormat: any;
  isFullWidth?: boolean;
  isMultipleInput?: boolean;
  size?: 'small' | 'medium';
};
const UploadFileContainer = forwardRef<HTMLInputElement, UploadFileContainerProps>((props, ref) => {
  const theme = useTheme();
  const [isDragging, setIsDragging] = useState(false);

  const {
    acceptedFormat,
    handleGetDataFromInputChange,
    handleGetDataFromDrop,
    size = 'small',
    isFullWidth = false,
    isMultipleInput = false,
  } = props;

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleGetDataFromDrop(e);
  };
  // TODO NEED TEXTS
  return (
    <Box
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      sx={{
        width: size === 'small' && !isFullWidth ? '195px' : '100%',
        height: '165px',
        border: `2px dashed ${
          isDragging ? theme.palette.case.primary.p500 : theme.palette.case.neutral.n200
        }`,
        minWidth: isFullWidth ? '100%' : '195px',
        transition: 'all 0.3s',
        borderRadius: '6px',
        padding: size === 'small' ? '7px' : '24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          '&:hover': {
            opacity: '0.7',
            transition: 'all 0.3s',
          },
        }}
        onClick={() => {
          if (ref) {
            // @ts-ignore
            ref?.current?.click();
          }
        }}
      >
        <AddFileIcon />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: size === 'small' ? 'column' : 'row',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="default"
            sx={{
              color: theme.palette.case.primary.p700,
              fontWeight: '500',
              mr: '6px',
              cursor: 'pointer',
            }}
          >
            Upload a file
          </Typography>
          {size === 'small' ? (
            <Typography variant="subheader3" sx={{ color: theme.palette.case.neutral.n500 }}>
              or drag and drop
            </Typography>
          ) : (
            <Typography variant="subheader3" sx={{ color: theme.palette.case.neutral.n700 }}>
              or drag and drop
            </Typography>
          )}
        </Box>
        {size === 'small' ? (
          <Typography
            variant="badge"
            sx={{
              color: theme.palette.case.neutral.n700,
              maxWidth: { xs: '120px', sm: '100%' },
              textAlign: 'center',
            }}
          >
            PNG, JPG, HEIC up to 15 MB
          </Typography>
        ) : (
          <Typography variant="badge" sx={{ color: theme.palette.case.neutral.n500 }}>
            PNG, JPG, HEIC up to 15 MB
          </Typography>
        )}
      </Box>
      <input
        ref={ref}
        onChange={handleGetDataFromInputChange}
        accept={acceptedFormat}
        type="file"
        name="media"
        multiple={isMultipleInput}
        hidden
      />
    </Box>
  );
});

export default UploadFileContainer;
