import React, { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import PaperActionMenu from '../../../../actionMenus/PaperActionMenu';
import { RecurringTypeConfig } from '../../../../../shared/configs/selectors/recurringType.config';
import { RecurringTypeEnum } from '../../../../../shared/enums/recurringType.enum';
import { ReactComponent as RepeatIcon } from '../../../../../assets/Images/repeat-icon.svg';
import { splitStringToHighlight } from '../../../../../shared/utils/splitStringToHighlight';
type RepeatSelectBlockProps = {
  repeat: RecurringTypeEnum;
  setRepeat: (repeat: RecurringTypeEnum) => void;
};
const RepeatSelectBlock: FC<RepeatSelectBlockProps> = ({ repeat, setRepeat }) => {
  const theme = useTheme();
  const [highlight, remaining] = splitStringToHighlight(RecurringTypeConfig[repeat].label, 1);
  const priorityMenu = [
    {
      item: RecurringTypeConfig[RecurringTypeEnum.NONE],
      callback: () => setRepeat(RecurringTypeEnum.NONE),
    },
    {
      item: RecurringTypeConfig[RecurringTypeEnum.DAILY],
      callback: () => setRepeat(RecurringTypeEnum.DAILY),
    },
    {
      item: RecurringTypeConfig[RecurringTypeEnum.WEEKLY],
      callback: () => setRepeat(RecurringTypeEnum.WEEKLY),
    },
    {
      item: RecurringTypeConfig[RecurringTypeEnum.MONTHLY],
      callback: () => setRepeat(RecurringTypeEnum.MONTHLY),
    },
    {
      item: RecurringTypeConfig[RecurringTypeEnum.CUSTOM],
      callback: () => setRepeat(RecurringTypeEnum.CUSTOM),
    },
  ];

  return (
    <PaperActionMenu activeItem={repeat} menuList={priorityMenu}>
      <Box display="flex" alignItems="center">
        <RepeatIcon />
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

export default RepeatSelectBlock;
