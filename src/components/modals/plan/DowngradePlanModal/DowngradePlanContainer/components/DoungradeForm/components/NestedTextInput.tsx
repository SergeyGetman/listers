import React, { useEffect } from 'react';
import { Controller, useWatch, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import MuiBaseTextFiled from '../../../../../../../formElements/MuiBaseTextFiled';

const NestedTextInput = () => {
  const { control, setFocus } = useFormContext();
  const other = useWatch({ control, name: 'other' });
  const { t } = useTranslation();

  useEffect(() => {
    if (other) {
      setFocus('text');
    }
  }, [other, setFocus]);

  return (
    <Controller
      render={({ field }) => (
        <MuiBaseTextFiled
          {...field}
          isDisabled={!other}
          label={t('plans.downgrade.step1.textFieldLabel')}
          placeholder={t('general.placeholders.write_feedback')}
          multiline
          minRows={3}
        />
      )}
      name="text"
      control={control}
    />
  );
};

export default NestedTextInput;
