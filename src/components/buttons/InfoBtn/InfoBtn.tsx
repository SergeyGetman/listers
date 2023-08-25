import React, { FC, useCallback } from 'react';
import { Box } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MuiTooltip from '../../MuiTooltip';
import MuiIconButton from '../MuiIconButton';

type MuiDotAccordionProps = {
  callback?: () => void;
  infoTooltipText?: string;
};

const InfoBtn: FC<MuiDotAccordionProps> = ({ callback, infoTooltipText = 'Help' }) => {
  const onClickOpenInfoModal = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (callback) {
        callback();
      }
    },
    [callback],
  );
  return (
    <MuiTooltip title={infoTooltipText}>
      <Box component="span" sx={{ display: 'flex' }}>
        <MuiIconButton onClick={onClickOpenInfoModal} size="small" color="secondary">
          <InfoOutlinedIcon />
        </MuiIconButton>
      </Box>
    </MuiTooltip>
  );
};

export default InfoBtn;
