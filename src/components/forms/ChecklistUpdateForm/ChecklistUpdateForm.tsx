import React, { FC, KeyboardEventHandler, memo, useCallback, useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import i18next from 'i18next';
import { ChecklistFormPayloadModel } from '../../../shared/models/checklists/checklistFormPayload.model';
import MuiBaseTextFiled from '../../formElements/MuiBaseTextFiled';
import MuiPreloader from '../../MuiPreloader';
import { ChecklistItemStatusEnum } from '../../../shared/enums/checklistItemStatus.enum';

const validationSchema = Yup.object().shape({
  body: Yup.string()
    .trim()
    .required(i18next.t('validation.checklistForm.required'))
    .min(1, i18next.t('validation.checklistForm.min'))
    .max(255, i18next.t('validation.checklistForm.max')),
});
const descriptionValidationSchema = Yup.object().shape({
  body: Yup.string().trim().max(5000, i18next.t('validation.checklistForm.max')),
});

type ChecklistFormProps = {
  callBack: (data: ChecklistFormPayloadModel, reset: () => void) => void;
  isShowInputLoader: boolean;
  initialBody?: string;
  status?: ChecklistItemStatusEnum;
  handleCancelEdit?: () => void;
  maxRows?: number;
  minRows?: number;
  isDescription?: boolean;
  isMobile?: boolean;
};

const ChecklistUpdateForm: FC<ChecklistFormProps> = ({
  callBack,
  isShowInputLoader,
  initialBody,
  handleCancelEdit,
  minRows = 1,
  isDescription,
  maxRows = 7,
  isMobile,
}) => {
  const initialValues = {
    body: initialBody ? initialBody : '',
  };
  const inputRef = useRef<any>(null);

  const { handleSubmit, control, reset, setFocus, setValue, watch, formState } =
    useForm<ChecklistFormPayloadModel>({
      defaultValues: initialValues,
      resolver: yupResolver(isDescription ? descriptionValidationSchema : validationSchema),
    });
  const onSubmit = useCallback(
    (data: any) => {
      callBack(data, reset);
    },
    [callBack, reset],
  );
  const onPress: KeyboardEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      const keyCode = e.which || e.keyCode;
      if (keyCode === 13 && e.ctrlKey) {
        setValue('body', `${watch('body')}\n`);
      }
      if (!isMobile) {
        if (keyCode === 13 && !e.ctrlKey && !e.shiftKey) {
          e.preventDefault();
          handleSubmit(onSubmit)();
        }
      }
    },
    [handleSubmit, isMobile, onSubmit, setValue, watch],
  );
  useEffect(() => {
    setFocus('body');
    if (inputRef?.current) {
      inputRef.current.focus();
      inputRef.current.selectionStart = inputRef.current.value.length;
    }
    return () => {
      reset();
    };
  }, [reset, setFocus, inputRef]);

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
    <form style={{ width: '100%', position: 'relative' }} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="body"
        control={control}
        render={({ field, fieldState }) => (
          <MuiBaseTextFiled
            {...field}
            ref={inputRef}
            size="small"
            onBlur={onBlur}
            multiline
            autoFocus
            minRows={minRows}
            maxRows={maxRows}
            isError={!!fieldState?.error?.message}
            isDisabled={isShowInputLoader}
            onKeyPress={onPress}
            sx={{
              width: '100%',
              minHeight: '27px !important',
              '.input-root': {
                padding: '3px 1px',
                minHeight: '27px !important',
              },
              input: {
                fontSize: '14px !important',
                fontWeight: '400',
              },
            }}
            endAdornment={isShowInputLoader ? <MuiPreloader size="extraSmall" isShow /> : null}
          />
        )}
      />
    </form>
  );
};

export default memo(ChecklistUpdateForm);
