import { Box, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { ModalNamesEnum } from '../../shared/enums/modalNames.enum';
import { MediaType } from '../../shared/models/media.model';
import MuiTooltip from '../MuiTooltip';
import { FileViewContainer, FileViewPhoto } from './FileView.style';
import { DocumentsEntityTypeEnum } from '../../shared/enums/documentEntityType.enum';
import { PhotoEntityTypeEnum } from '../../shared/enums/photoEntityType.enum';
import MuiIconButton from '../buttons/MuiIconButton';
import modalObserver from '../../shared/utils/observers/modalObserver';

type Props = {
  files: MediaType[];
  isIconView?: boolean;
  onOpen?: (index: number, files: MediaType[]) => void;
  permission?: { isDelete: boolean; isUpdate: boolean; isDownload: boolean };
  entityType?: DocumentsEntityTypeEnum | PhotoEntityTypeEnum;
};

const FileView: FC<Props> = ({
  files,
  onOpen,
  isIconView = false,
  permission = {
    isDelete: false,
    isUpdate: false,
    isDownload: true,
  },
  entityType,
}) => {
  const handleShowFile = (index: number, media: MediaType[]) => {
    if (onOpen) {
      onOpen(index, media);
      return;
    }
    modalObserver.addModal(ModalNamesEnum.mediaViewer, {
      props: {
        media,
        activeMedia: index,
        permission,
        entityType,
      },
    });
  };

  return isIconView ? (
    <Box>
      <MuiIconButton onClick={() => handleShowFile(0, files)} size="small">
        <InsertDriveFileOutlinedIcon />
      </MuiIconButton>
    </Box>
  ) : (
    <FileViewContainer>
      <Grid container spacing="10px">
        {files.map((file, index) => (
          <Grid key={file.id} item>
            <FileViewPhoto
              onClick={(e: any) => {
                e.stopPropagation();
                e.preventDefault();
                handleShowFile(index, files);
              }}
            >
              <img
                src={`${file.additional_info?.size_urls?.middle_icon || file?.url || ''}`}
                alt={`file-${file.original_filename}`}
              />
              <MuiTooltip isArrow placement="bottom" color="light" title={file.original_filename}>
                <Typography sx={{ mt: '5px', maxWidth: '40px' }} noWrap variant="small">
                  {file.original_filename}
                </Typography>
              </MuiTooltip>
            </FileViewPhoto>
          </Grid>
        ))}
      </Grid>
    </FileViewContainer>
  );
};

export default FileView;
