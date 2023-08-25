import React, { FC } from 'react';
import { Box, Skeleton, Typography, useTheme } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import useFixFileName from '../../../../../../../shared/hooks/useFixFileName';
import { MediaType } from '../../../../../../../shared/models/media.model';
import MuiIconButton from '../../../../../../buttons/iconButtons/MuiIconButton';
import { ReactComponent as CloseIcon } from '../../../../../../../assets/Images/exit-icon.svg';

type AttachmentsItemCardProps = {
  attachmentsItem: MediaType;
  handleOpenViewModal: (activeIndex: number) => void;
  onDeleteAttachment: (id: number, token: string) => void;
  isCanDelete?: boolean;
  index: number;
};
// TODO DECOMPOSE AFTER REDESIGN
const AttachmentsItemCard: FC<AttachmentsItemCardProps> = ({
  attachmentsItem,
  index,
  handleOpenViewModal,
  isCanDelete,
  onDeleteAttachment,
}) => {
  const theme = useTheme();
  const { fixFileName } = useFixFileName();
  const isLoading = attachmentsItem.progress !== undefined;
  return (
    <Box
      onClick={() => {
        return isLoading ? true : handleOpenViewModal(index);
      }}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: isLoading ? 'default' : 'pointer',
      }}
    >
      {isLoading ? (
        <Skeleton
          sx={{
            borderRadius: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&.MuiSkeleton-root>*': {
              visibility: 'initial',
            },
          }}
          variant="rectangular"
          height="115px"
          width="100%"
        >
          <CircularProgress variant="determinate" value={attachmentsItem.progress} />
        </Skeleton>
      ) : (
        <Box
          sx={{
            position: 'relative',
            border: '1px solid transparent',
            borderRadius: '5px',
            '.attachment-icon-btn': {
              display: 'none',
              opacity: 0,
              position: 'absolute',
              top: '8px',
              right: '8px',
            },
            '&:hover': {
              transition: 'all 0.3s',
              borderColor: theme.palette.case.primary.p500,
              '.attachment-icon-btn': {
                opacity: 1,
                display: 'block',
              },
            },
            img: {
              width: '100%',
              height: '115px',
              borderRadius: '5px',
              objectFit: 'fill',
            },
          }}
        >
          <img
            src={`${
              attachmentsItem?.additional_info?.size_urls?.attachment_middle || attachmentsItem?.url || ''
            }`}
            alt={`file-${
              attachmentsItem?.additional_info?.size_urls?.attachment_small || attachmentsItem?.url || ''
            }`}
          />
          {isCanDelete && (
            <Box className="attachment-icon-btn">
              <MuiIconButton
                onClick={() => onDeleteAttachment(attachmentsItem.id, attachmentsItem.token)}
                variant="white"
                size="small"
              >
                <CloseIcon />
              </MuiIconButton>
            </Box>
          )}
        </Box>
      )}

      <Typography sx={{ mt: '8px', color: theme.palette.case.neutral.n800 }} variant="default_bolt">
        {attachmentsItem?.original_filename ? fixFileName(attachmentsItem.original_filename, 20, '.') : ''}
      </Typography>
      <Typography sx={{ color: theme.palette.case.neutral.n500 }} variant="default">
        {attachmentsItem?.size ? `${(attachmentsItem.size / 1000000).toFixed(2)} MB` : ''}
      </Typography>
    </Box>
  );
};

export default AttachmentsItemCard;
