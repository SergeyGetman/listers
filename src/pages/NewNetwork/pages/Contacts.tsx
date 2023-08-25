import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CircularButton from '../../../components/buttons/CilrcularButton';
import { AddBottomButtonContainer } from '../../../shared/styles/AddBottomButtonContainer';
import modalObserver from '../../../shared/utils/observers/modalObserver';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import { setBreadcrumbs } from '../../../store/Common/commonThunk';
import { useAppDispatch } from '../../../shared/hooks/redux';

const Contacts: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setBreadcrumbs([{ title: t('general.breadcrumbs.network.contacts') }]));
  }, [t, dispatch]);

  return (
    <AddBottomButtonContainer>
      <CircularButton
        size="large"
        onClick={() => {
          modalObserver.addModal(ModalNamesEnum.createContactModal, {});
        }}
      />
    </AddBottomButtonContainer>
  );
};

export default Contacts;
