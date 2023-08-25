import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { GalleryPhotoContainer, LastGalleryPhotoContainer } from '../MediaGallery.style';
import { ReactComponent as SelectedImageIcon } from '../../../../assets/Images/gallery/selecte-corner.svg';
import { ReactComponent as ArrowIcon } from '../../../../assets/Images/modalNavigation/arrow-left.svg';

import PhotoItem from './PhotoItem/PhotoItem';

import FileItem from './FileItem/FileItem';
import { MediaType } from '../../../../shared/models/media.model';

type MediaGalleryItemsContainerProps = {
  media?: MediaType;
  isSelected: boolean;
  isLastImage: boolean;
  imageCount: number;
  maxView: number;
  isShowActionBtn: boolean;
  isShowSelectedIcon: boolean;
  isSmallFilesWidth?: boolean;
  progress?: number;
  index: number;
  type: 'gallery' | 'files';
  handleOpenViewModal: (isSmallGallery?: boolean, active?: number) => void;
  onShowMore: () => void;
  onHideMore: () => void;
};

const MediaGalleryItemsContainer: FC<MediaGalleryItemsContainerProps> = ({
  media,
  isSelected,
  isLastImage,
  imageCount,
  maxView,
  onShowMore,
  onHideMore,
  isShowActionBtn,
  isShowSelectedIcon,
  isSmallFilesWidth = false,
  progress,
  handleOpenViewModal,
  index,
  type,
}) => {
  return (
    <GalleryPhotoContainer isSmallFilesWidth={isSmallFilesWidth}>
      {progress !== undefined ? (
        <Box
          sx={(theme) => ({
            backgroundColor: theme.palette.case.neutral.n100,
            borderRadius: '5px',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          })}
        >
          <CircularProgress variant="determinate" value={progress} />
        </Box>
      ) : type === 'gallery' ? (
        <Box sx={{ width: '86px', height: '86px' }} onClick={() => handleOpenViewModal(true, index)}>
          <PhotoItem img={media?.additional_info?.size_urls?.big_icon || media?.url || ''} />
        </Box>
      ) : (
        <Box sx={{ width: '86px', height: '86px' }} onClick={() => handleOpenViewModal(true, index)}>
          <FileItem
            img={media?.additional_info?.size_urls?.big_icon || media?.url || ''}
            name={media?.original_filename}
          />
        </Box>
      )}

      {isShowSelectedIcon && isSelected && (
        <Box
          sx={{
            position: 'absolute',
            zIndex: 1,
            top: '-6px',
            left: '50%',
            transform: 'translate(-50%,0)',
          }}
        >
          <SelectedImageIcon />
        </Box>
      )}

      {isShowActionBtn === false || type === 'files' ? null : (
        <Box>
          {isLastImage && imageCount - maxView !== 0 ? (
            <LastGalleryPhotoContainer onClick={onShowMore}>
              <Typography variant="default_bolt"> +{imageCount - maxView}</Typography>
            </LastGalleryPhotoContainer>
          ) : isLastImage && maxView <= imageCount ? (
            <LastGalleryPhotoContainer
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onHideMore();
              }}
            >
              <ArrowIcon />
            </LastGalleryPhotoContainer>
          ) : null}
        </Box>
      )}
    </GalleryPhotoContainer>
  );
};

export default MediaGalleryItemsContainer;
