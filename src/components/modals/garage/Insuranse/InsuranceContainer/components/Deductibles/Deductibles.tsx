import { Grid } from '@mui/material';
import React, { FC, useMemo, useState } from 'react';
import { Control, Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import MuiDotAccordion from '../../../../../../accordions/MuiDotAccordion';
import MuiCurrencyTextFiled from '../../../../../../formElements/MuiCurrencyTextFiled';
import { InsuranceForm } from '../../InsuranceUtils';

type Props = {
  control: Control<InsuranceForm, any>;
};
const InsuranceDeductibles: FC<Props> = ({ control }) => {
  const { t } = useTranslation();
  const collisionState = useWatch({ control, name: 'collision' });
  const comprehensiveState = useWatch({ control, name: 'comprehensive' });
  const [isOpen, setIsOpen] = useState(false);

  useMemo(() => {
    if (collisionState || comprehensiveState) {
      setIsOpen(true);
    }
  }, [collisionState, comprehensiveState]);

  return (
    <MuiDotAccordion
      label={t('general.containers.deductibles')}
      isCustomExpandState
      isCustomExpand={isOpen}
      setCustomExpand={(value) => setIsOpen(value)}
      isDefaultExpand={false}
    >
      <Grid container rowSpacing="16px" columnSpacing="20px">
        <Grid item xs={6}>
          <Controller
            name="collision"
            control={control}
            render={({ field, fieldState }) => (
              <MuiCurrencyTextFiled
                {...field}
                label={t('general.fieldNames.сollision')}
                placeholder={t('general.placeholders.enter_number')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="comprehensive"
            control={control}
            render={({ field, fieldState }) => (
              <MuiCurrencyTextFiled
                {...field}
                label={t('general.fieldNames.comprehensive')}
                placeholder={t('general.placeholders.enter_number')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </MuiDotAccordion>
  );
};

export default InsuranceDeductibles;
