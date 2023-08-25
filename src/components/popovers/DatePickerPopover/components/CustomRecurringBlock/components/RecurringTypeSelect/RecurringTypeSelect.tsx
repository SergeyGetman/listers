import React, { FC, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import PaperActionMenu from '../../../../../../actionMenus/PaperActionMenu';
import { ReactComponent as ArrowDown } from '../../../../../../../assets/Images/arrow-down-icon.svg';
import { RecurringTypeConfig } from '../../../../../../../shared/configs/selectors/recurringType.config';
import { RecurringTypeEnum } from '../../../../../../../shared/enums/recurringType.enum';
type RecurringTypeSelectType = {
  recurringType?: RecurringTypeEnum;
  handleChangeRecurringCustomType?: (val: RecurringTypeEnum) => void;
};
const RecurringTypeSelect: FC<RecurringTypeSelectType> = ({
  recurringType,
  handleChangeRecurringCustomType,
}) => {
  const theme = useTheme();
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const recurringTypeOptions = [
    {
      item: RecurringTypeConfig[RecurringTypeEnum.DAILY],
      callback: () => handleChangeRecurringCustomType?.(RecurringTypeEnum.DAILY),
    },
    {
      item: RecurringTypeConfig[RecurringTypeEnum.WEEKLY],
      callback: () => handleChangeRecurringCustomType?.(RecurringTypeEnum.WEEKLY),
    },
    {
      item: RecurringTypeConfig[RecurringTypeEnum.MONTHLY],
      callback: () => handleChangeRecurringCustomType?.(RecurringTypeEnum.MONTHLY),
    },
  ];

  return (
    <Box ml="16px">
      <PaperActionMenu
        onChangeMenuState={setIsOpenPopup}
        activeItem={recurringType || RecurringTypeEnum.DAILY}
        menuList={recurringTypeOptions}
      >
        <Box display="flex" alignItems="center">
          <Typography mr="4px" variant="t14r" color={theme.palette.case.neutral.n600}>
            {RecurringTypeConfig[recurringType || RecurringTypeEnum.DAILY].label}
          </Typography>
          <ArrowDown style={{ transform: isOpenPopup ? 'rotate(180deg)' : '', transition: '0.3s' }} />
        </Box>
      </PaperActionMenu>
    </Box>
  );
};

export default RecurringTypeSelect;
