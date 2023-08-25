import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { ReactComponent as ResetFiltersIcon } from '../../../../../assets/Images/resetFilters.svg';
import MuiDefaultDrawerHeader from '../../../../modalsElements/containers/MuiDrawer/MuiDrawersHeders/MuiDefaultDrawerHeader';
import ModalFooter from '../../../../modalsElements/containers/Footer/ModalFooter';
import IconTextSelect from '../../../../formElements/IconTextSelect';
import { networkRequestStatusesConfig } from '../../../../../shared/configs/networkUserStatuses.config';
import {
  NetworkFilterInputContainer,
  NetworkFilterModalContainer,
} from '../../../../../shared/styles/NetworkFiltersModal.style';
import router from '../../../../../shared/services/router';
import { NetworkTypeEnum } from '../../../../../shared/enums/networkType.enum';
import { useAppDispatch } from '../../../../../shared/hooks/redux';
import { setNetworkFilterType } from '../../../../../store/network/networkSlice';
import SelectRole from '../../../../formElements/SelectRole';

type NetworkFiltersModalContainerProps = {
  onClose: (isSubmitted?: boolean) => void;
  type: any;
};
type FormType = {
  selectedType: {
    label: string;
    icon: any;
    value: NetworkTypeEnum;
  };
  role: string;
};

const NetworkFiltersModalContainer: FC<NetworkFiltersModalContainerProps> = ({ onClose, type }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const roleValue = useMemo(() => {
    if (!!searchParams.get('role')) {
      return searchParams.get('role');
    }
    return false;
  }, [searchParams]);

  const initialValues = {
    selectedType: networkRequestStatusesConfig.find((element) => element.value === type),
    role: roleValue ? roleValue : '',
  };

  const { handleSubmit, setValue, formState, control } = useForm<FormType>({
    defaultValues: initialValues,
  });

  const handleResetFilters = () => {
    setValue('selectedType', networkRequestStatusesConfig[0], { shouldDirty: true });
    setValue('role', '', { shouldDirty: true });
  };

  const onSubmit = (formValue: FormType) => {
    if (!!formValue.role.length) {
      navigate(`${router.network.path}/${formValue.selectedType.value}?role=${formValue.role}`);
      dispatch(setNetworkFilterType(`${formValue.selectedType.value}?role=${formValue.role}`));
    } else {
      navigate(`${router.network.path}/${formValue.selectedType.value}`);
      dispatch(setNetworkFilterType(formValue.selectedType.value));
    }

    onClose();
  };

  const handleChangeRole = (value: string) => {
    setValue(`role`, value, { shouldDirty: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <NetworkFilterModalContainer>
        <MuiDefaultDrawerHeader onClose={onClose} title={t('general.modalNavigation.filters')} />
        <NetworkFilterInputContainer sx={{ padding: '30px 10px 0 10px' }}>
          <Controller
            name="selectedType"
            control={control}
            render={({ field }) => (
              <IconTextSelect
                {...field}
                onChange={(value) => {
                  // @ts-ignore
                  field.onChange(value);
                }}
                name="network-status-filter-select"
                items={networkRequestStatusesConfig}
              />
            )}
          />
        </NetworkFilterInputContainer>

        <NetworkFilterInputContainer sx={{ padding: '16px 10px 0 10px' }}>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <SelectRole
                value={field.value}
                placeholder={t('general.placeholders.selectRole')}
                label={t('general.fieldNames.role')}
                onChange={(role) => {
                  handleChangeRole(role);
                }}
              />
            )}
          />
        </NetworkFilterInputContainer>

        <ModalFooter
          isSpaceBetweenBtn
          isShowSecurityInfo={false}
          position="absolute"
          middleBtnProps={{
            isShow: true,
            label: t('general.buttons.reset'),
            startIcon: <ResetFiltersIcon />,
            variant: 'outlined',
            onClick: () => {
              handleResetFilters();
            },
          }}
          rightBtnProps={{
            isShow: true,
            isLoadingBtn: true,
            loading: false,
            label: t('general.buttons.save'),
            variant: 'contained',
            isStopPropagation: false,
            isDisabled: !formState.isDirty,
            type: 'submit',
          }}
        />
      </NetworkFilterModalContainer>
    </form>
  );
};

export default NetworkFiltersModalContainer;
