import React, { FC, memo } from 'react';
import { Control, Controller } from 'react-hook-form';
import { Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import MuiCustomEditor from '../../formElements/MuiCustomEditor';

type DescriptionContainerProps = {
  control: Control<any>;
  isDefaultExpand?: boolean;
  maxHintValue?: number;
  name?: string;
  placeholder?: string;
  title?: string;
  isDisabledExpand?: boolean;
};
const DescriptionContainer: FC<DescriptionContainerProps> = ({
  control,
  name = 'description',
  placeholder,
  maxHintValue = 5000,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h3" color={theme.palette.case.neutral.n800}>
        {t('general.containers.description')}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <MuiCustomEditor
            maxHintValue={maxHintValue}
            placeholder={placeholder}
            isError={!!fieldState?.error?.message}
            errorMessage={fieldState?.error?.message}
            {...field}
          />
        )}
      />
    </>
  );
};

export default memo(DescriptionContainer);
