import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { ReactComponent as ResetFiltersIcon } from '../../../../../assets/Images/resetFilters.svg';
import MuiDefaultDrawerHeader from '../../../../modalsElements/containers/MuiDrawer/MuiDrawersHeders/MuiDefaultDrawerHeader';
import ModalFooter from '../../../../modalsElements/containers/Footer/ModalFooter';
import {
  NetworkFilterInputContainer,
  NetworkFilterModalContainer,
} from '../../../../../shared/styles/NetworkFiltersModal.style';
import router from '../../../../../shared/services/router';
import { NetworkTypeEnum } from '../../../../../shared/enums/networkType.enum';
import SelectRole from '../../../../formElements/SelectRole';
import { useAppDispatch } from '../../../../../shared/hooks/redux';
import { setContactsFilterType } from '../../../../../store/network/networkSlice';

type ContactsFiltersModalContainerProps = {
  onClose: (isSubmitted?: boolean) => void;
};

type FormType = {
  role: string;
};

const ContactsFiltersModalContainer: FC<ContactsFiltersModalContainerProps> = ({ onClose }) => {
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
    role: roleValue ? roleValue : '',
  };

  const { handleSubmit, control, formState, setValue } = useForm<FormType>({
    defaultValues: initialValues,
  });

  const handleResetFilters = () => {
    setValue('role', '', { shouldDirty: true });
  };

  const onSubmit = (formValue: FormType) => {
    if (!!formValue.role.length) {
      navigate(`${router.network.path}/${NetworkTypeEnum.contacts}?role=${formValue.role}`);
      dispatch(setContactsFilterType(`${NetworkTypeEnum.contacts}?role=${formValue.role}`));
    } else {
      navigate(`${router.network.path}/${NetworkTypeEnum.contacts}`);
      dispatch(setContactsFilterType(`${NetworkTypeEnum.contacts}`));
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
            onClick: () => handleResetFilters(),
          }}
          rightBtnProps={{
            isShow: true,
            isLoadingBtn: true,
            loading: false,
            label: t('general.buttons.save'),
            variant: 'contained',
            isStopPropagation: false,
            type: 'submit',
            isDisabled: !formState.isDirty,
          }}
        />
      </NetworkFilterModalContainer>
    </form>
  );
};

export default ContactsFiltersModalContainer;
