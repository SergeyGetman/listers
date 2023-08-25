import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import moment from 'moment';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FrequencyTypeConfig } from '../../../../../shared/configs/selectors/insurance.config';
import { FrequencyEnum } from '../../../../../shared/enums/frequency.enum';
import errorsHandler from '../../../../../shared/functions/errorsHandler';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';
import { InsuranceModel } from '../../../../../shared/models/insurance.model';
import { createTransportInsurance, editTransportInsurance } from '../../../../../store/garage/garageThunk';
import { OptionType } from '../../../../formElements/MuiSelect/MuiSelect';
import ModalFooter from '../../../../modalsElements/containers/Footer/ModalFooter';
import MuiDefaultDrawerHeader from '../../../../modalsElements/containers/MuiDrawer/MuiDrawersHeders/MuiDefaultDrawerHeader';
import DocumentsContainer from '../../../../viewContainers/DocumentsContainer';
import InsuranceAgency from './components/Agency';
import InsuranceAgent from './components/Agent';
import InsuranceCoveredPeople from './components/CoveredPeople';
import InsuranceDeductibles from './components/Deductibles';
import InsuranceCard from './components/InsuranceCard';
import InsuranceMain from './components/Main';
import InsurancePayment from './components/Payment';
import { InsuranceContainerForm } from './InsuranceContainer.style';
import {
  insuranceDefaultValues,
  InsuranceForm,
  insuranceFormToRequest,
  insuranceRequestToForm,
} from './InsuranceUtils';
import { insuranceSchema } from './schema';
import { DocumentsEntityTypeEnum } from '../../../../../shared/enums/documentEntityType.enum';
import InsuranceDate from './components/Date';
import { PackageEnum } from '../../../../../shared/enums/package.enum';
import { ModalNamesEnum } from '../../../../../shared/enums/modalNames.enum';
import modalObserver from '../../../../../shared/utils/observers/modalObserver';

type Props = {
  onClose: (isSkip?: boolean) => void;
  setIsShowUnsavedDataModal: (isDirty: boolean) => void;
  data?: InsuranceModel;
  transportId: string;
};

export type AgentDataType = {
  address: {
    map: {
      lat?: number;
      lng?: number;
    };
    type?: string;
    address?: string;
  } | null;
  emails: { email: string }[];
  urls: { url: string; login: string; password: string }[];
  phones: { phone: string; country: string }[];
};

const frequencyDefaultOptions: OptionType[] = [
  FrequencyTypeConfig[FrequencyEnum.none],
  FrequencyTypeConfig[FrequencyEnum.once_a_week],
  FrequencyTypeConfig[FrequencyEnum.once_a_two_weeks],
  FrequencyTypeConfig[FrequencyEnum.once_a_mounts],
  FrequencyTypeConfig[FrequencyEnum.once_a_6_mounts],
];

const InsuranceContainer: FC<Props> = ({ onClose, data, setIsShowUnsavedDataModal, transportId }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const profile = useAppSelector((state) => state.profile.data);
  const isPackageRight = useMemo(() => {
    return profile?.subscription?.package === PackageEnum.premium;
  }, [profile?.subscription?.package]);
  const handleOpenUpgradePackageModal = () => {
    modalObserver.addModal(ModalNamesEnum.purchaseModal, {
      props: { isPlatinum: true },
    });
  };

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    reset,
    formState: { isDirty, errors },
  } = useForm<InsuranceForm>({
    defaultValues: insuranceDefaultValues,
    resolver: yupResolver(insuranceSchema),
  });

  const [loading, setLoading] = useState(false);
  const [frequencyOptions, setFrequencyOptions] = useState<OptionType[]>(frequencyDefaultOptions);
  const [isTwoWeek, setIsTwoWeek] = useState(false);

  const frontDocumentArray = useFieldArray({
    control,
    name: 'insurance_card_front',
  });

  const backDocumentArray = useFieldArray({
    control,
    name: 'insurance_card_back',
  });

  const agentsArray = useFieldArray({
    control,
    name: 'agents',
  });

  const handleChangeFrequencyData = useCallback(
    (payment_due_day: Date | null, expiration: Date | null) => {
      if (payment_due_day !== null && expiration !== null) {
        const difDays = moment(expiration).diff(moment(payment_due_day), 'day') + 1;

        if (difDays <= 14) {
          setIsTwoWeek(true);
          if (watch('frequency').value !== FrequencyEnum.none) {
            setValue('frequency', insuranceDefaultValues.frequency, { shouldValidate: true });
            setValue('minimum_due', watch('account_balance'), { shouldValidate: true });
          }
          setFrequencyOptions((prev) =>
            prev.map((item) => {
              if (item.value !== FrequencyEnum.none) {
                return { ...item, isDisabled: true };
              }
              return { ...item, isDisabled: false };
            }),
          );
        } else {
          setIsTwoWeek(false);
          if (difDays / 364 >= 1) {
            setFrequencyOptions((prev) => prev.map((item) => ({ ...item, isDisabled: false })));
            return;
          }

          if (difDays / 58 >= 1) {
            setFrequencyOptions((prev) =>
              prev.map((item) => {
                if (item.value === FrequencyEnum.once_a_6_mounts) {
                  return { ...item, isDisabled: true };
                }
                return { ...item, isDisabled: false };
              }),
            );
            return;
          }

          if (difDays / 28 >= 1) {
            setFrequencyOptions((prev) =>
              prev.map((item) => {
                if (item.value === FrequencyEnum.once_a_mounts) {
                  return { ...item, isDisabled: true };
                }
                if (item.value === FrequencyEnum.once_a_6_mounts) {
                  return { ...item, isDisabled: true };
                }
                return { ...item, isDisabled: false };
              }),
            );
            return;
          }

          if (difDays / 14 >= 1) {
            setFrequencyOptions((prev) =>
              prev.map((item) => {
                if (item.value === FrequencyEnum.none) {
                  return { ...item, isDisabled: false };
                }
                if (item.value === FrequencyEnum.once_a_week) {
                  return { ...item, isDisabled: false };
                }
                return { ...item, isDisabled: true };
              }),
            );
            return;
          }

          setFrequencyOptions((prev) => prev.map((item) => ({ ...item, isDisabled: false })));
        }
      }
    },
    [setValue, watch],
  );

  const handleChangeCountryAgency = (index: number, country: string) => {
    setValue(`agency.phones.${index}.country`, country);
  };
  const handleChangeCountryAgent = (index: number, agentIndex: number, country: string) => {
    setValue(`agents.${agentIndex}.phones.${index}.country`, country);
  };

  const handleChangeAccountBalance = (value: number | null) => {
    if (watch('amount') === null) {
      setValue('amount', watch('amount'), { shouldValidate: true });
    }
    if (watch('frequency').value === FrequencyEnum.none) {
      setValue('minimum_due', value);
    }
  };

  const onSubmit = (form: InsuranceForm) => {
    if (!isPackageRight) {
      handleOpenUpgradePackageModal();
      return;
    }
    setLoading(true);
    if (!transportId) return;
    if (data?.id) {
      dispatch(
        editTransportInsurance({ data: insuranceFormToRequest(form, +transportId), id: data.id }),
      ).then((result) => {
        if (editTransportInsurance.fulfilled.match(result)) {
          setLoading(false);
          onClose(true);
        } else {
          errorsHandler(result, setError);
          setLoading(false);
        }
      });
    } else {
      dispatch(createTransportInsurance(insuranceFormToRequest(form, +transportId))).then((result) => {
        if (createTransportInsurance.fulfilled.match(result)) {
          setLoading(false);
          onClose(true);
        } else {
          errorsHandler(result, setError);
          setLoading(false);
        }
      });
    }
  };

  const handleSetAgencyData = (agentData: AgentDataType) => {
    setValue('agency.emails', insuranceDefaultValues.agency.emails);
    setValue('agency.phones', insuranceDefaultValues.agency.phones);
    setValue('agency.sites', insuranceDefaultValues.agency.sites);

    if (agentData.emails.length) {
      setValue('agency.emails', agentData.emails);
    }
    if (agentData.phones.length) {
      setValue('agency.phones', agentData.phones);
    }
    if (agentData.urls.length > 0) {
      for (let i = 0; i < agentData.urls.length; i++) {
        setValue(`agency.sites.${i}`, agentData.urls[i]);
      }
    } else {
      setValue('agency.sites.0', insuranceDefaultValues.agency.sites[0]);
    }
    if (agentData.address && agentData.address.address !== null) {
      setValue('agency.address', {
        map: agentData.address.map,
        address: agentData.address.address,
      } as {
        address: string;
        map?: {
          lat: number;
          lng: number;
        };
      });
    } else {
      setValue('agency.address', {
        address: '',
      });
    }
  };

  const handleSetAgentData = (
    agentData: {
      emails: AgentDataType['emails'];
      phones: AgentDataType['phones'];
    },
    index: number,
  ) => {
    setValue(`agents.${index}.emails`, insuranceDefaultValues.agents[0].emails);
    setValue(`agents.${index}.phones`, insuranceDefaultValues.agents[0].phones);

    if (agentData.emails.length) {
      setValue(`agents.${index}.emails`, agentData.emails);
    }
    if (agentData.phones.length) {
      setValue(`agents.${index}.phones`, agentData.phones);
    }
  };

  useEffect(() => {
    if (data) {
      reset(insuranceRequestToForm(data));
      handleChangeFrequencyData(
        moment(data.payment_due_day?.date).toDate(),
        moment(data.expiration?.date).toDate(),
      );
    }
  }, [data, handleChangeFrequencyData, reset]);

  useEffect(() => {
    setIsShowUnsavedDataModal(isDirty);
  }, [isDirty, setIsShowUnsavedDataModal]);

  return (
    <InsuranceContainerForm onSubmit={handleSubmit(onSubmit)}>
      <MuiDefaultDrawerHeader
        isEditMode={!!data}
        onClose={onClose}
        isUpgradeToGold={false}
        isShowUpgradePackagesBtn={!isPackageRight}
        handleClickUpgradePackage={handleOpenUpgradePackageModal}
        title={t('general.containers.insurance')}
      />

      <Box sx={{ flexGrow: 1, p: '20px 10px 50px 10px' }}>
        <InsuranceCard frontDocumentArray={frontDocumentArray} backDocumentArray={backDocumentArray} />
        <Box sx={{ mt: '30px' }}>
          <InsuranceMain
            control={control}
            watch={watch}
            setValue={setValue}
            handleChangeFrequencyData={handleChangeFrequencyData}
          />
        </Box>

        <Box sx={{ mt: '30px' }}>
          <InsuranceDate
            control={control}
            watch={watch}
            setValue={setValue}
            frequencyOptions={frequencyOptions}
            handleChangeFrequencyData={handleChangeFrequencyData}
          />
        </Box>

        <Box sx={{ mt: '30px' }}>
          <InsurancePayment
            errors={errors}
            isPaymentDue={!!watch('payment_due_day').date}
            control={control}
            isDisableMinimumDue={isTwoWeek || watch('frequency').value === FrequencyEnum.none}
            handleChangeAccountBalance={handleChangeAccountBalance}
            setValue={setValue}
          />
        </Box>
        <Box sx={{ mt: '30px' }}>
          <InsuranceDeductibles control={control} />
        </Box>
        <Box sx={{ mt: '30px' }}>
          <InsuranceCoveredPeople control={control} />
        </Box>
        <Box sx={{ mt: '30px' }}>
          <InsuranceAgency
            control={control}
            handleChangeCountryAgency={handleChangeCountryAgency}
            handleSetAgentData={handleSetAgencyData}
          />
        </Box>
        {agentsArray.fields.map((item, index) => (
          <Box key={item.id} sx={{ mt: '30px' }}>
            <InsuranceAgent
              item={item}
              agentIndex={index}
              control={control}
              agentsLength={agentsArray.fields.length}
              handleChangeCountryAgent={handleChangeCountryAgent}
              createAgent={() => agentsArray.append(insuranceDefaultValues.agents[0])}
              deleteAgent={() => agentsArray.remove(index)}
              handleSetAgentData={handleSetAgentData}
            />
          </Box>
        ))}

        <Box sx={{ mt: '30px' }}>
          <DocumentsContainer
            entityType={DocumentsEntityTypeEnum.insurance_document}
            files={watch('documents')}
            onAddMedia={(files) => setValue('documents', files)}
            isCounter={false}
            placeholder={t('general.placeholders.add_documents')}
            isContentInformation={false}
            isDisabledExpand
          />
        </Box>
      </Box>

      <ModalFooter
        isShow
        middleBtnProps={{
          color: 'primary',
          isShow: true,
          label: t('general.buttons.cancel'),
          onClick: () => onClose(),
        }}
        rightBtnProps={{
          isLoadingBtn: true,
          isStopPropagation: false,
          isShow: true,
          loading,
          label: t('general.buttons.save'),
          variant: 'contained',
          onClick: () => (!isPackageRight ? handleOpenUpgradePackageModal() : true),
          type: !isPackageRight ? 'button' : 'submit',
        }}
      />
    </InsuranceContainerForm>
  );
};

export default InsuranceContainer;
