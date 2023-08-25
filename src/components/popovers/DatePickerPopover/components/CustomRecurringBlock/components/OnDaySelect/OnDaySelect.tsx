import React, { FC, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { ReactComponent as ArrowDown } from '../../../../../../../assets/Images/arrow-down-icon.svg';
import PaperActionMenu from '../../../../../../actionMenus/PaperActionMenu';
import { createIntervalConfig } from '../../../../../../../shared/utils/createIntervalConfig';
type OnDaySelectProps = {
  onDay?: number | string | null;
  handleChangeOnDay?: (val: number) => void;
};
const OnDaySelect: FC<OnDaySelectProps> = ({ onDay, handleChangeOnDay }) => {
  const theme = useTheme();
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const intervalMenu = createIntervalConfig(handleChangeOnDay, 32);

  return (
    <Box ml="28px">
      <PaperActionMenu
        onChangeMenuState={setIsOpenPopup}
        activeItem={onDay?.toString() || '1'}
        menuList={intervalMenu}
      >
        <Box display="flex" alignItems="center">
          <Typography mr="4px" variant="t14r" color={theme.palette.case.neutral.n600}>
            {onDay?.toString() || '1'}
          </Typography>
          <ArrowDown style={{ transform: isOpenPopup ? 'rotate(180deg)' : '', transition: '0.3s' }} />
        </Box>
      </PaperActionMenu>
    </Box>
  );
};

export default OnDaySelect;
