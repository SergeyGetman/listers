import React, { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

import MuiBaseTextFiled from '../../formElements/MuiBaseTextFiled';
import PaperActionMenu from '../../actionMenus/PaperActionMenu';
import PopoverButton from '../../buttons/PopoverButton';
import { plannerItemColorConfig } from '../../../shared/configs/plannerItemColor.config';
import { PlannerItemColorEnum } from '../../../shared/enums/plannerItemColor.enum';
import EmojiPicker from '../../formElements/EmojiPicker';
import theme from '../../../theme/theme';
type TodoTitleContainerProps = {
  control: Control<any>;
  color: PlannerItemColorEnum;
  icon: any;
  setIcon: (value: any) => void;
  setColor: (val: PlannerItemColorEnum) => void;
};
const TodoTitleContainer: FC<TodoTitleContainerProps> = ({ control, setColor, color, icon, setIcon }) => {
  const priorityItem = plannerItemColorConfig[color];
  const { t } = useTranslation();

  const priorityMenu = [
    {
      item: plannerItemColorConfig[PlannerItemColorEnum.red],
      callback: () => setColor(PlannerItemColorEnum.red),
    },
    {
      item: plannerItemColorConfig[PlannerItemColorEnum.yellow],
      callback: () => setColor(PlannerItemColorEnum.yellow),
    },
    {
      item: plannerItemColorConfig[PlannerItemColorEnum.green],
      callback: () => setColor(PlannerItemColorEnum.green),
    },
    {
      item: plannerItemColorConfig[PlannerItemColorEnum.purple],
      callback: () => setColor(PlannerItemColorEnum.purple),
    },
    {
      item: plannerItemColorConfig[PlannerItemColorEnum.none],
      callback: () => setColor(PlannerItemColorEnum.none),
    },
  ];

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <Box sx={{ maxWidth: '380px', width: '100%' }}>
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <MuiBaseTextFiled
              label={t('general.fieldNames.title')}
              placeholder={t('general.placeholders.enterTitle', { props: 'checklist' })}
              isError={!!fieldState?.error?.message}
              errorMessage={fieldState?.error?.message}
              type="text"
              {...field}
            />
          )}
        />
      </Box>

      <Box sx={{ ml: { xs: '16px', sm: '30px' } }}>
        <PaperActionMenu activeItem={color} menuList={priorityMenu}>
          <PopoverButton
            isHideTextOnMobile
            startIcon={<priorityItem.icon sx={{ color: priorityItem.iconColor }} />}
            label={priorityItem.label}
          />
        </PaperActionMenu>
      </Box>
      <Box sx={{ ml: { xs: '16px', sm: '30px' }, flexShrink: '0' }}>
        <EmojiPicker
          anchorOriginVertical="top"
          anchorOriginHorizontal="center"
          transformOriginHorizontal="center"
          transformOriginVertical="bottom"
          onSelect={(emoji) => {
            if ('native' in emoji) {
              setIcon(emoji.native);
            }
          }}
        >
          <PopoverButton
            isHideTextOnMobile
            startIcon={
              icon ? (
                <Box sx={{ fontSize: '13px !important' }}>{icon}</Box>
              ) : (
                <InsertEmoticonIcon sx={{ color: theme.palette.case.neutral.n400 }} />
              )
            }
            label="Icon"
          />
        </EmojiPicker>
      </Box>
    </Box>
  );
};

export default TodoTitleContainer;
