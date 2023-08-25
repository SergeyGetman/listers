import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import PaperActionMenu from '../../../../actionMenus/PaperActionMenu';
import { ReactComponent as ReminderIcon } from '../../../../../assets/Images/reminder-icon.svg';
import theme from '../../../../../theme/theme';
import { ReminderTimeConfig } from '../../../../../shared/configs/selectors/reminderTime.config';
import { ReminderTimeEnum } from '../../../../../shared/enums/reminderTime.enum';
import { splitStringToHighlight } from '../../../../../shared/utils/splitStringToHighlight';
import { PaperActionMenuItemModel } from '../../../../../shared/models/paperActionMenuItem.model';
type ReminderSelectBlockProps = {
  reminder: ReminderTimeEnum;
  menuList?: {
    item: PaperActionMenuItemModel;
    callback: () => void;
  }[];
};
const ReminderSelectBlock: FC<ReminderSelectBlockProps> = ({ reminder, menuList }) => {
  const [highlight, remaining] = splitStringToHighlight(
    ReminderTimeConfig[reminder].label,
    reminder === ReminderTimeEnum.never_remind ? 1 : 2,
  );
  if (!menuList) {
    return <></>;
  }

  return (
    <PaperActionMenu activeItem={reminder} menuList={menuList}>
      <Box display="flex" alignItems="center">
        <ReminderIcon />
        <Typography ml="6px" variant="t14r" color={theme.palette.case.primary.p600}>
          {highlight}
        </Typography>
        <Typography ml="4px" variant="t14r" color={theme.palette.case.neutral.n600}>
          {remaining}
        </Typography>
      </Box>
    </PaperActionMenu>
  );
};

export default ReminderSelectBlock;
