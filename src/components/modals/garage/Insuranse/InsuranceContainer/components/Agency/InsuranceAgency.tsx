import { Grid, useTheme } from '@mui/material';
import React, { FC, useMemo, useState } from 'react';
import { Control, Controller, useFieldArray, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import MuiDotAccordion from '../../../../../../accordions/MuiDotAccordion';
import CircularButton from '../../../../../../buttons/CilrcularButton';
import MuiIconButton from '../../../../../../buttons/MuiIconButton';
import MuiBaseTextFiled from '../../../../../../formElements/MuiBaseTextFiled';
import MuiPhoneNumberTextFiled from '../../../../../../formElements/MuiPhoneNumberTextFiled';
import LocationEdit from '../../../../../../locations/LocationEdit';
import { insuranceDefaultValues, InsuranceForm } from '../../InsuranceUtils';
import useGetConnections, {
  ConnectionsOptionsType,
} from '../../../../../../../shared/hooks/useGetConnections';
import MuiSelect from '../../../../../../formElements/MuiSelect';
import { AgentDataType } from '../../InsuranceContainer';

type Props = {
  control: Control<InsuranceForm, any>;
  handleChangeCountryAgency: (index: number, country: string) => void;
  handleSetAgentData: (agentData: AgentDataType) => void;
};
const InsuranceAgency: FC<Props> = ({ control, handleChangeCountryAgency, handleSetAgentData }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { connectionsLoading, connectionsOptions } = useGetConnections(false, true);
  const [isOpen, setIsOpen] = useState(false);

  const agencyNameState = useWatch({ control, name: 'agency.name' });

  const agencyEmails = useFieldArray({
    control,
    name: 'agency.emails',
  });

  const agencyPhones = useFieldArray({
    control,
    name: 'agency.phones',
  });

  const agencySites = useFieldArray({
    control,
    name: 'agency.sites',
  });

  useMemo(() => {
    if (
      (agencyEmails.fields.length > 0 && agencyEmails.fields[0].email !== '') ||
      (agencyPhones.fields.length > 0 && agencyPhones.fields[0].phone !== '') ||
      (agencySites.fields.length > 0 &&
        (agencySites.fields[0].url !== '' || agencySites.fields[0].login !== '')) ||
      agencyNameState !== null
    ) {
      setIsOpen(true);
    }
  }, [agencyEmails.fields, agencyNameState, agencyPhones.fields, agencySites.fields]);

  return (
    <MuiDotAccordion
      label={t('general.containers.agency')}
      isDefaultExpand={false}
      isCustomExpandState
      isCustomExpand={isOpen}
      setCustomExpand={(value) => setIsOpen(value)}
      isShowInfoDialog
      infoTooltipText={t('general.tooltips.addInformationInsurance')}
    >
      <Grid container rowSpacing="16px" columnSpacing="20px">
        <Grid item xs={12}>
          <Controller
            name="agency.name"
            control={control}
            render={({ field, fieldState }) => (
              <MuiSelect
                {...field}
                isClearable
                isCreatable
                isSearchable
                onChange={(e: ConnectionsOptionsType) => {
                  field.onChange(e);
                  // if (e.contacts) {
                  const newData = {
                    emails: e?.contacts?.emails.map((el) => ({ email: el.value })) || [],
                    phones: e?.contacts?.phones.map((el) => ({ phone: el.value, country: el.country })) || [],
                    address: e?.contacts?.addresses ? e.contacts?.addresses[0] : null,
                    urls: e?.contacts?.urls.map((el) => ({ url: el.value, login: '', password: '' })) || [],
                  };
                  handleSetAgentData(newData);
                  // }
                }}
                isLoading={connectionsLoading}
                options={connectionsOptions
                  .filter((item) => item.entity_type === 'contact' && !!item?.contacts?.is_company === true)
                  .map((item) => ({ ...item, label: item?.contacts?.company || '' }))}
                label={t('general.fieldNames.name')}
                placeholder={t('general.placeholders.enter_name')}
                isError={!!fieldState?.error?.message}
                helpText={fieldState?.error?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Grid container rowSpacing="16px" columnSpacing="20px">
            {agencyPhones.fields.map((item, index) => (
              <Grid key={item.id} item xs={12} md={6}>
                <Grid container columnSpacing="20px">
                  <Grid item xs={11} md={10}>
                    <Controller
                      name={`agency.phones.${index}.phone`}
                      control={control}
                      render={({ field, fieldState }) => (
                        <MuiPhoneNumberTextFiled
                          {...field}
                          label={t('general.fieldNames.phone')}
                          placeholder={t('general.placeholders.enter_number')}
                          onChange={(values: string | 'undefined', country: string | undefined) => {
                            field.onChange(values || '');
                            handleChangeCountryAgency(index, country || '');
                          }}
                          isError={!!fieldState?.error?.message}
                          errorMessage={fieldState?.error?.message}
                          type="text"
                        />
                      )}
                    />
                  </Grid>
                  <Grid
                    xs={1}
                    md={2}
                    item
                    sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', pt: '35px' }}
                  >
                    {index === 0 && agencyPhones.fields.length < 5 ? (
                      <CircularButton
                        size="small"
                        onClick={() => agencyPhones.append(insuranceDefaultValues.agency.phones[0])}
                      />
                    ) : (
                      <MuiIconButton
                        size="small"
                        onClick={() => {
                          agencyPhones.remove(index);
                        }}
                      >
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
        </Grid>

        <Grid item xs={12}>
          <Grid container rowSpacing="16px" columnSpacing="20px">
            {agencyEmails.fields.map((item, index) => (
              <Grid key={item.id} item xs={12} md={6}>
                <Grid container columnSpacing="20px">
                  <Grid item xs={11} md={10}>
                    <Controller
                      name={`agency.emails.${index}.email`}
                      control={control}
                      render={({ field, fieldState }) => (
                        <MuiBaseTextFiled
                          {...field}
                          label={t('general.fieldNames.email')}
                          placeholder={t('general.placeholders.enter_email')}
                          isError={!!fieldState?.error?.message}
                          errorMessage={fieldState?.error?.message}
                          type="text"
                        />
                      )}
                    />
                  </Grid>
                  <Grid
                    xs={1}
                    md={2}
                    item
                    sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', pt: '35px' }}
                  >
                    {index === 0 && agencyEmails.fields.length < 5 ? (
                      <CircularButton
                        size="small"
                        onClick={() => agencyEmails.append(insuranceDefaultValues.agency.emails[0])}
                      />
                    ) : (
                      <MuiIconButton
                        size="small"
                        onClick={() => {
                          agencyEmails.remove(index);
                        }}
                      >
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
        </Grid>

        {agencySites.fields.map((item, index) => (
          <Grid item key={item.id} xs={12}>
            <Grid container rowSpacing="16px" columnSpacing="20px">
              <Grid item xs={12}>
                <Grid container columnSpacing="20px">
                  <Grid xs={11} item>
                    <Controller
                      name={`agency.sites.${index}.url`}
                      control={control}
                      render={({ field, fieldState }) => {
                        return (
                          <MuiBaseTextFiled
                            label={t('general.fieldNames.website')}
                            placeholder={t('general.placeholders.enter_website')}
                            isError={!!fieldState?.error?.message}
                            errorMessage={fieldState?.error?.message}
                            {...field}
                          />
                        );
                      }}
                    />
                  </Grid>
                  <Grid
                    xs={1}
                    item
                    sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', pt: '35px' }}
                  >
                    {index === 0 && agencySites.fields.length < 5 ? (
                      <CircularButton
                        size="small"
                        onClick={() => agencySites.append(insuranceDefaultValues.agency.sites[0])}
                      />
                    ) : (
                      <MuiIconButton
                        size="small"
                        onClick={() => {
                          agencySites.remove(index);
                        }}
                      >
                        <DeleteForeverOutlinedIcon
                          sx={{ '&:hover': { color: theme.palette.case.warning.high, transition: '0.3s' } }}
                        />
                      </MuiIconButton>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid xs={6} item>
                <Controller
                  name={`agency.sites.${index}.login`}
                  control={control}
                  render={({ field, fieldState }) => (
                    <MuiBaseTextFiled
                      {...field}
                      label={t('general.fieldNames.login')}
                      placeholder={t('general.placeholders.enter_login')}
                      isError={!!fieldState?.error?.message}
                      errorMessage={fieldState?.error?.message}
                      type="text"
                    />
                  )}
                />
              </Grid>
              <Grid xs={6} item>
                <Controller
                  name={`agency.sites.${index}.password`}
                  control={control}
                  render={({ field, fieldState }) => (
                    <MuiBaseTextFiled
                      label={t('general.fieldNames.password')}
                      placeholder={t('general.placeholders.enter_password')}
                      isError={!!fieldState?.error?.message}
                      errorMessage={fieldState?.error?.message}
                      type="password"
                      {...field}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Controller
            name="agency.address"
            control={control}
            render={({ field, fieldState }) => (
              // @ts-ignore
              <LocationEdit
                {...field}
                label={t('general.fieldNames.location')}
                placeholder={t('general.placeholders.enter_location')}
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

export default InsuranceAgency;
