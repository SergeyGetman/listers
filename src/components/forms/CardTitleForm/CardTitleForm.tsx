import React, { FC, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Box } from '@mui/material';
import * as Yup from 'yup';
import i18next from 'i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import MuiPreloader from '../../MuiPreloader';
import MuiBaseTextFiled from '../../formElements/MuiBaseTextFiled';

const validationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .required(i18next.t('validation.checklistForm.required'))
    .min(1, i18next.t('validation.checklistForm.min'))
    .max(36, i18next.t('validation.checklistForm.max')),
});
type CardTitleFormProps = {
  callBack: (data: { title: string }) => void;
  title?: string;
  isShowInputLoader?: boolean;
  handleCancelEdit?: () => void;
};
const CardTitleForm: FC<CardTitleFormProps> = ({ title, callBack, isShowInputLoader, handleCancelEdit }) => {
  const initialValues = {
    title: title ? title : '',
  };

  const { handleSubmit, control, formState, reset } = useForm<{ title: string }>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSubmit = (data: { title: string }) => {
    callBack(data);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleBlur = () => {
    reset();
    if (handleCancelEdit) {
      handleCancelEdit();
    }
  };
  const onBlur = useCallback(() => {
    if (formState.isValid) {
      handleSubmit(onSubmit)();
    } else {
      handleBlur();
    }
  }, [formState.isValid, handleBlur, handleSubmit, onSubmit]);

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="title"
        control={control}
        render={({ field, fieldState }) => (
          <MuiBaseTextFiled
            {...field}
            autoFocus
            sx={{
              minHeight: '36px !important',
              '.input-root': {
                padding: '10px 1px',
              },
              input: {
                fontSize: '16px !important',
                fontWeight: '500',
              },
            }}
            isFullWidth
            size="small"
            onBlur={onBlur}
            isDisabled={isShowInputLoader}
            isError={!!fieldState?.error?.message}
            endAdornment={
              isShowInputLoader ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <MuiPreloader size="small" isShow />
                </Box>
              ) : (
                <></>
              )
            }
          />
        )}
      />
    </form>
  );
};

export default CardTitleForm;
