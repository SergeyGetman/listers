import { Grid, useTheme } from '@mui/material';
import React, { FC, useMemo, useState } from 'react';
import { Control, Controller, useFieldArray } from 'react-hook-form';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import { useTranslation } from 'react-i18next';
import MuiDotAccordion from '../../../../../../accordions/MuiDotAccordion';
import CircularButton from '../../../../../../buttons/CilrcularButton';
import MuiIconButton from '../../../../../../buttons/MuiIconButton';
import MuiBaseTextFiled from '../../../../../../formElements/MuiBaseTextFiled';
import { insuranceDefaultValues, InsuranceForm } from '../../InsuranceUtils';

type Props = {
  control: Control<InsuranceForm, any>;
};
const InsuranceCoveredPeople: FC<Props> = ({ control }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'covered_people',
  });

  useMemo(() => {
    if (fields.length > 0 && fields[0].full_name !== '') {
      setIsOpen(true);
    }
  }, [fields]);

  return (
    <MuiDotAccordion
      label={t('general.containers.coveredPeople')}
      isCustomExpandState
      isCustomExpand={isOpen}
      setCustomExpand={(value) => setIsOpen(value)}
      isShowInfoDialog
      infoTooltipText={t('general.tooltips.addPeopleInsurance')}
    >
      <Grid container rowSpacing="16px" columnSpacing="20px">
        {fields.map((item, index) => (
          <Grid key={item.id} item xs={12}>
            <Grid container columnSpacing="20px">
              <Grid xs={11} item>
                <Controller
                  name={`covered_people.${index}.full_name`}
                  control={control}
                  render={({ field, fieldState }) => (
                    <MuiBaseTextFiled
                      label={t('general.fieldNames.fullName')}
                      placeholder={t('general.placeholders.enter_name')}
                      isError={!!fieldState?.error?.message}
                      errorMessage={fieldState?.error?.message}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid
                xs={1}
                item
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: '20px' }}
              >
                {index === 0 && fields.length < 3 ? (
                  <CircularButton
                    size="small"
                    onClick={() => append(insuranceDefaultValues.covered_people[0])}
                  />
                ) : (
                  <MuiIconButton size="small" onClick={() => remove(index)}>
                    <DeleteForeverOutlinedIcon
                      sx={{ '&:hover': { color: theme.palette.case.warning.high, transition: '0.3s' } }}
                    />
                  </MuiIconButton>
                )}
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </MuiDotAccordion>
  );
};

export default InsuranceCoveredPeople;
