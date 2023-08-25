import { Typography } from '@mui/material';
import React, { FC } from 'react';
import useFixFileName from '../../../../../shared/hooks/useFixFileName';
import MuiTooltip from '../../../../MuiTooltip';
import { FileItemContainer } from './FileItem.style';

const FileItem: FC<{ img?: string; name?: string }> = ({ img = '', name = '' }) => {
  const { fixFileName } = useFixFileName();
  return (
    <FileItemContainer>
      <img src={`${img}`} alt={`file-${name}`} />
      <MuiTooltip isArrow placement="bottom" color="light" title={name}>
        <Typography sx={{ mt: '5px' }} variant="small">
          {fixFileName(name, 3, '.')}
        </Typography>
      </MuiTooltip>
    </FileItemContainer>
  );
};

export default FileItem;
