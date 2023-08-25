import React, { FC, memo } from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Control, Controller } from 'react-hook-form';
import MuiBaseTextFiled from '../../formElements/MuiBaseTextFiled';

import RowWithTitleContainer from '../../containers/RowWithTitleContainer';
type TaskTitleContainerProps = {
  control: Control<any>;
};
const TaskTitleContainer: FC<TaskTitleContainerProps> = ({ control }) => {
  const { t } = useTranslation();

  return (
    <RowWithTitleContainer title="Title">
      <Box sx={{ width: '100%' }}>
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <MuiBaseTextFiled
              placeholder={t('general.placeholders.enter_title')}
              isError={!!fieldState?.error?.message}
              errorMessage={fieldState?.error?.message}
              type="text"
              {...field}
            />
          )}
        />
      </Box>
    </RowWithTitleContainer>
  );
};

export default memo(TaskTitleContainer);
