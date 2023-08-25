import React, { FC, KeyboardEventHandler, memo } from 'react';
import { Controller, useForm, UseFormSetError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import AddIcon from '@mui/icons-material/Add';
import { Box, useTheme } from '@mui/material';
import { ChecklistFormPayloadModel } from '../../../shared/models/checklists/checklistFormPayload.model';
import MuiBaseTextFiled from '../../formElements/MuiBaseTextFiled';
import MuiPreloader from '../../MuiPreloader';
import CircularButton from '../../buttons/CilrcularButton';
const validationSchema = Yup.object({
  body: Yup.string()
    .trim()
    .required(i18next.t('validation.checklistForm.required'))
    .min(1, i18next.t('validation.checklistForm.min'))
    .max(255, i18next.t('validation.checklistForm.max')),
});

type ChecklistFormProps = {
  callBack: (data: ChecklistFormPayloadModel, reset: () => void, setError: UseFormSetError<any>) => void;
  isShowInputLoader?: boolean;
  initialBody?: string;
  isDisabled?: boolean;
};

const ChecklistForm: FC<ChecklistFormProps> = ({ callBack, isShowInputLoader, initialBody, isDisabled }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const initialValues = {
    body: initialBody ? initialBody : '',
  };

  const { handleSubmit, control, reset, setValue, watch, setError, formState } =
    useForm<ChecklistFormPayloadModel>({
      defaultValues: initialValues,
      resolver: yupResolver(validationSchema),
    });
  const onSubmit = (data: ChecklistFormPayloadModel) => {
    callBack(data, reset, setError);
  };

  const onPress: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    const keyCode = e.which || e.keyCode;
    if (keyCode === 13 && e.ctrlKey) {
      setValue('body', `${watch('body')}\n`);
    }
    if (keyCode === 13 && !e.ctrlKey && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="body"
        control={control}
        render={({ field, fieldState }) => (
          <MuiBaseTextFiled
            {...field}
            variant="outlined"
            required
            placeholder={t('general.placeholders.addNewItem')}
            size="medium"
            startAdornment={isShowInputLoader ? <MuiPreloader size="small" isShow /> : <AddIcon />}
            isError={!!fieldState?.error?.message}
            isDisabled={isShowInputLoader || isDisabled}
            multiline
            maxRows={7}
            onKeyPress={onPress}
            sx={{
              width: '100%',
              '& textarea': {
                zIndex: '10',
              },
              '.MuiInputAdornment-root': {
                svg: {
                  path: {
                    fill: !formState.isDirty ? '#787F9D' : theme.palette.case.primary.p500,
                  },
                },
              },
            }}
            endAdornment={
              isShowInputLoader ? (
                <Box sx={{ width: 16, height: 16, display: 'flex', alignItems: 'center' }}>
                  <MuiPreloader size="small" isShow />
                </Box>
              ) : (
                <Box sx={{ width: '20px' }}>
                  <CircularButton
                    isDisabled={!formState.isDirty}
                    size="small"
                    onClick={handleSubmit(onSubmit)}
                  />
                </Box>
              )
            }
          />
        )}
      />
    </form>
  );
};

export default memo(ChecklistForm);
