import React, { FC, KeyboardEventHandler } from 'react';
import { Controller, useForm, UseFormSetError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import i18next from 'i18next';
import MuiBaseTextFiled from '../../formElements/MuiBaseTextFiled';
import MuiPreloader from '../../MuiPreloader';
import { NotesFormPayloadModel } from '../../../shared/models/notes/notesFormPayload.model';

const validationSchema = Yup.object({
  body: Yup.string()
    .trim()
    .required(i18next.t('validation.checklistForm.required'))
    .min(1, i18next.t('validation.checklistForm.min'))
    .max(5000, i18next.t('validation.checklistForm.max')),
});
type NoteFormProps = {
  callBack: (data: NotesFormPayloadModel, reset: () => void, setError: UseFormSetError<any>) => void;
  isShowInputLoader?: boolean;
  initialBody?: string;
  isDisabled?: boolean;
};

const NoteForm: FC<NoteFormProps> = ({ callBack, isShowInputLoader, initialBody, isDisabled }) => {
  const { t } = useTranslation();
  const initialValues = {
    title: '',
    body: initialBody ? initialBody : '',
  };

  const { handleSubmit, control, reset, setValue, watch, setError } = useForm<NotesFormPayloadModel>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data: NotesFormPayloadModel) => {
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
            placeholder={t('general.placeholders.addNewItem')}
            size="small"
            isError={!!fieldState?.error?.message}
            isDisabled={isShowInputLoader || isDisabled}
            multiline
            maxRows={7}
            minRows={7}
            onKeyPress={onPress}
            endAdornment={
              isShowInputLoader ? (
                <Box sx={{ width: 16, height: 16, display: 'flex', alignItems: 'center' }}>
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

export default NoteForm;
