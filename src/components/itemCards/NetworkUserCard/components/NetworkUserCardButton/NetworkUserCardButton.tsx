import React, { FC } from 'react';
import { Box, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import NetworkIconButton from '../../../../buttons/NetworkIconButton';
import BottomCardButton from '../../../../buttons/BottomCardButton';
import { NetworkUserStatusesItemConfigType } from '../../../../../shared/configs/networkUserStatuses.config';

type Props = {
  statusConfigItem: NetworkUserStatusesItemConfigType;
  onClickButton: () => void;
  isDisable: () => boolean;
  label?: string | undefined;
  textColor?: string;
  hoverTextColor?: string;
  startIcon?: React.ReactNode;
  colorIconBtn?: string;
};

const NetworkUserCardButton: FC<Props> = ({
  statusConfigItem,
  onClickButton,
  isDisable,
  label,
  textColor,
  hoverTextColor,
  startIcon,
  colorIconBtn,
}) => {
  const themed = useTheme();
  const isSmallDisplay = useMediaQuery(themed.breakpoints.down('sm'));

  return isSmallDisplay ? (
    <NetworkIconButton
      onClick={(e) => {
        e.stopPropagation();
        onClickButton();
      }}
      colorIconBtn={colorIconBtn ? colorIconBtn : statusConfigItem.buttonColor}
      isDisabled={isDisable()}
      label=""
      startIcon={startIcon ? startIcon : <statusConfigItem.buttonIcon />}
    />
  ) : (
    <Box sx={{ width: '100%' }}>
      <BottomCardButton
        variant="contained"
        onClick={(e) => {
          e.stopPropagation();
          onClickButton();
        }}
        isActivated
        textColor={textColor}
        hoverTextColor={hoverTextColor}
        colorIconBtn={statusConfigItem.buttonColor}
        isDisabled={isDisable()}
        label={label ? label : ''}
      />
    </Box>
  );
};

export default NetworkUserCardButton;
