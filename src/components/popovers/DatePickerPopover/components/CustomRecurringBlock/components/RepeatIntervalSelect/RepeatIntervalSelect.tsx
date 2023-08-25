import React, { FC, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { ReactComponent as ArrowDown } from '../../../../../../../assets/Images/arrow-down-icon.svg';
import PaperActionMenu from '../../../../../../actionMenus/PaperActionMenu';
import { createIntervalConfig } from '../../../../../../../shared/utils/createIntervalConfig';
type RepeatIntervalSelectProps = {
  repeatInterval?: number;
  handleChangeRecurringRepeatInterval?: (val: number) => void;
};
const RepeatIntervalSelect: FC<RepeatIntervalSelectProps> = ({
  repeatInterval,
  handleChangeRecurringRepeatInterval,
}) => {
  const theme = useTheme();
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const intervalMenu = createIntervalConfig(handleChangeRecurringRepeatInterval);

  return (
    <Box ml="34px">
      <PaperActionMenu
        onChangeMenuState={setIsOpenPopup}
        activeItem={repeatInterval?.toString() || '1'}
        menuList={intervalMenu}
      >
        <Box display="flex" alignItems="center">
          <Typography mr="4px" variant="t14r" color={theme.palette.case.neutral.n600}>
            {repeatInterval || '1'}
          </Typography>
          <ArrowDown style={{ transform: isOpenPopup ? 'rotate(180deg)' : '', transition: '0.3s' }} />
        </Box>
      </PaperActionMenu>
    </Box>
  );
};

export default RepeatIntervalSelect;
