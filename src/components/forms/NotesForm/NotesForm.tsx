import React, { FC, memo, useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Moment from 'moment';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { NotesFormPayloadModel } from '../../../shared/models/notes/notesFormPayload.model';
import MuiPreloader from '../../MuiPreloader';
import CircularButton from '../../buttons/CilrcularButton';
import ErrorMessage from '../../formElements/ErrorMessage';
import {
  NotesFormBodyContainer,
  NotesFormContainer,
  NotesFormFooterContainer,
  NotesFormHeaderContainer,
} from './NotesForm.style';
import { useAppSelector } from '../../../shared/hooks/redux';
import AvatarContainer from '../../avatars/AvatarContainer';

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .test({
      name: 'title',
      test: (title, schema) => {
        if (!!title && title.length >= 1 && title.length <= 1) {
          return schema.createError({
            path: schema.path,
            message: i18next.t('validation.general.min', {
              field: i18next.t('general.fieldNames.title'),
              count: 2,
            }),
          });
        }
        return true;
      },
    })
    .max(28, i18next.t('validation.notesForm.title.max')),
  body: Yup.string()
    .trim()
    .required(i18next.t('validation.notesForm.body.required'))
    .min(2, i18next.t('validation.notesForm.body.min'))
    .max(255, i18next.t('validation.notesForm.body.max')),
});

type NotesFormProps = {
  isShowInputLoader: boolean;
  callback: (val: NotesFormPayloadModel, reset: () => void) => void;
  creatorId?: number;
};

const NotesForm: FC<NotesFormProps> = ({ callback, isShowInputLoader, creatorId }) => {
  const { data } = useAppSelector(({ profile }) => profile);

  const initialValues = {
    title: '',
    body: '',
  };

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<NotesFormPayloadModel>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const hasError = useMemo(() => {
    return !!errors.body?.message || !!errors.title?.message;
  }, [errors.body?.message, errors.title?.message]);

  const errorMessage = useMemo(() => {
    return errors.title?.message || errors.body?.message;
  }, [errors.title?.message, errors.body?.message]);

  const { t } = useTranslation();

  const onSubmit = useCallback(
    (val: NotesFormPayloadModel) => {
      callback(val, reset);
    },
    [callback, reset],
  );

  return (
    <form
      style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <NotesFormContainer hasError={hasError}>
        <Box sx={{ padding: '10px' }}>
          <NotesFormHeaderContainer>
            <AvatarContainer
              id={data?.id}
              firstName={data?.first_name}
              lastName={data?.last_name}
              size="small"
              isOwner={creatorId === data?.id}
              src={data?.avatar?.additional_info?.size_urls?.avatar_icon || data?.avatar?.url || ''}
            />
            <Box sx={{ marginLeft: '10px', width: '100%' }}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder={t('general.placeholders.writeTitle')}
                    disabled={isShowInputLoader}
                  />
                )}
              />
            </Box>
          </NotesFormHeaderContainer>
          <NotesFormBodyContainer>
            <Controller
              name="body"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  rows={5}
                  placeholder={t('general.placeholders.writeNotesText')}
                  disabled={isShowInputLoader}
                />
              )}
            />
          </NotesFormBodyContainer>

          <NotesFormFooterContainer>
            <Typography variant="small" sx={{ lineHeight: '21px' }}>
              {Moment().format('dddd, Do MMMM, YYYY')}
            </Typography>
            {isShowInputLoader ? (
              <Box sx={{ height: '21px' }}>
                <MuiPreloader size="small" isShow />
              </Box>
            ) : (
              <CircularButton size="small" onClick={handleSubmit(onSubmit)} />
            )}
          </NotesFormFooterContainer>
        </Box>
      </NotesFormContainer>
      <ErrorMessage isShow={hasError} message={errorMessage} />
    </form>
  );
};

export default memo(NotesForm);
