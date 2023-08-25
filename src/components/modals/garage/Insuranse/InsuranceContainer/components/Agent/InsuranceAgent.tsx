import { Grid, useTheme } from '@mui/material';
import React, { FC, useMemo, useState } from 'react';
import { Control, Controller, FieldArrayWithId, useFieldArray, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import MuiDotAccordion from '../../../../../../accordions/MuiDotAccordion';
import CircularButton from '../../../../../../buttons/CilrcularButton';
import MuiButton from '../../../../../../buttons/MuiButton';
import MuiBaseTextFiled from '../../../../../../formElements/MuiBaseTextFiled';
import MuiPhoneNumberTextFiled from '../../../../../../formElements/MuiPhoneNumberTextFiled';

import { insuranceDefaultValues, InsuranceForm } from '../../InsuranceUtils';
import MuiIconButton from '../../../../../../buttons/MuiIconButton';
import useGetConnections, {
  ConnectionsOptionsType,
} from '../../../../../../../shared/hooks/useGetConnections';
import MuiSelect from '../../../../../../formElements/MuiSelect';
import { AgentDataType } from '../../InsuranceContainer';

type Props = {
  control: Control<InsuranceForm, any>;
  agentIndex: number;
  item: FieldArrayWithId<InsuranceForm, 'agents', 'id'>;
  handleChangeCountryAgent: (index: number, agentIndex: number, country: string) => void;
  agentsLength: number;
  createAgent: () => void;
  deleteAgent: () => void;
  handleSetAgentData: (
    data: { emails: AgentDataType['emails']; phones: AgentDataType['phones'] },
    index: number,
  ) => void;
};
const InsuranceAgent: FC<Props> = ({
  control,
  agentIndex,
  item,
  handleChangeCountryAgent,
  agentsLength,
  createAgent,
  deleteAgent,
  handleSetAgentData,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { connectionsLoading, connectionsOptions } = useGetConnections(false, true);
  const [isOpen, setIsOpen] = useState(false);

  const agencyNameState = useWatch({ control, name: `agents.${agentIndex}.name` });

  const agentEmails = useFieldArray({
    control,
    name: `agents.${agentIndex}.emails`,
  });

  const agentPhones = useFieldArray({
    control,
    name: `agents.${agentIndex}.phones`,
  });

  useMemo(() => {
    if (
      (agentEmails.fields.length > 0 && agentEmails.fields[0].email !== '') ||
      (agentPhones.fields.length > 0 && agentPhones.fields[0].phone !== '') ||
      agencyNameState !== null
    ) {
      setIsOpen(true);
    }
  }, [agencyNameState, agentEmails.fields, agentPhones.fields]);
  return (
    <MuiDotAccordion
      key={item.id}
      isCustomExpandState
      isCustomExpand={isOpen}
      setCustomExpand={(value) => setIsOpen(value)}
      isDefaultExpand={agentsLength > 1}
      label={`${t('general.containers.agent')} ${item.name?.label || ''}`}
      isShowDeleteBlockBtn={agentsLength > 1}
      handleDeleteBlock={() => deleteAgent()}
    >
      <Grid container rowSpacing="16px" columnSpacing="20px">
        {/* <Grid item xs={12}> */}
        {/*  <Controller */}
        {/*    name={`agents.${agentIndex}.name`} */}
        {/*    control={control} */}
        {/*    render={({ field, fieldState }) => ( */}
        {/*      <MuiBaseTextFiled */}
        {/*        label={t('general.fieldNames.agentName')} */}
        {/*        isError={!!fieldState?.error?.message} */}
        {/*        errorMessage={fieldState?.error?.message} */}
        {/*        {...field} */}
        {/*      /> */}
        {/*    )} */}
        {/*  /> */}
        {/* </Grid> */}
        <Grid item xs={12}>
          <Controller
            name={`agents.${agentIndex}.name`}
            control={control}
            render={({ field, fieldState }) => (
              <MuiSelect
                {...field}
                isClearable
                isCreatable
                isSearchable
                onChange={(e: ConnectionsOptionsType) => {
                  field.onChange(e);
                  const newData = {
                    emails: e?.contacts?.emails.map((el) => ({ email: el.value })) || [],
                    phones: e?.contacts?.phones.map((el) => ({ phone: el.value, country: el.country })) || [],
                  };
                  handleSetAgentData(newData, agentIndex);
                }}
                isLoading={connectionsLoading}
                options={connectionsOptions.filter((el) => !!el?.contacts?.is_company === false)}
                label={t('general.fieldNames.name')}
                placeholder={t('general.placeholders.select_or_enter_agent_name')}
                isError={!!fieldState?.error?.message}
                helpText={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container rowSpacing="16px" columnSpacing="20px">
            {agentPhones.fields.map((phone, index) => (
              <Grid key={phone.id} item xs={12} md={6}>
                <Grid container columnSpacing="20px">
                  <Grid item xs={11} md={10}>
                    <Controller
                      name={`agents.${agentIndex}.phones.${index}.phone`}
                      control={control}
                      render={({ field, fieldState }) => (
                        <MuiPhoneNumberTextFiled
                          {...field}
                          label={t('general.fieldNames.phone')}
                          placeholder={t('general.placeholders.enter_number')}
                          onChange={(values: string | 'undefined', country: string | undefined) => {
                            field.onChange(values || '');
                            handleChangeCountryAgent(index, agentIndex, country || '');
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
                    {index === 0 && agentPhones.fields.length < 5 ? (
                      <CircularButton
                        size="small"
                        onClick={() => agentPhones.append(insuranceDefaultValues.agents[0].phones[0])}
                      />
                    ) : (
                      <MuiIconButton
                        size="small"
                        onClick={() => {
                          agentPhones.remove(index);
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
            {agentEmails.fields.map((email, index) => (
              <Grid key={email.id} item xs={12} md={6}>
                <Grid container columnSpacing="20px">
                  <Grid item xs={11} md={10}>
                    <Controller
                      name={`agents.${agentIndex}.emails.${index}.email`}
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
                    {index === 0 && agentEmails.fields.length < 5 ? (
                      <CircularButton
                        size="small"
                        onClick={() => agentEmails.append(insuranceDefaultValues.agents[0].emails[0])}
                      />
                    ) : (
                      <MuiIconButton
                        size="small"
                        onClick={() => {
                          agentEmails.remove(index);
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
        {agentIndex === agentsLength - 1 && agentsLength < 5 && (
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
            <MuiButton
              variant="text"
              label={t('general.buttons.addAgent')}
              onClick={createAgent}
              startIcon={<AddCircleOutlineOutlinedIcon sx={{ color: theme.palette.primary.main }} />}
            />
          </Grid>
        )}
      </Grid>
    </MuiDotAccordion>
  );
};

export default InsuranceAgent;
