import React, { useCallback, useEffect, useState, memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../shared/hooks/redux';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import MuiDrawer from '../../modalsElements/containers/MuiDrawer';
import PlannerItemModalSkeleton from '../../modalsElements/components/PlannerItemModalSkeleton';
import { getPaymentItem } from '../../../store/payment/paymentThunk';
import ViewPaymentModalContainer from './components/ViewPaymentModalContainer';
import modalObserver, { ModalProps } from '../../../shared/utils/observers/modalObserver';

const ViewPaymentModal = ({ isOpen, props }: ModalProps) => {
  const [isShowUnsavedDataModal, setIsShowUnsavedDataModal] = useState<boolean>(false);
  const [isFetchedTask, setIsFetchedTask] = useState<boolean>(false);
  const [, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (props?.paymentId) {
      setIsFetchedTask(false);
      dispatch(getPaymentItem({ paymentId: props?.paymentId })).then((result) => {
        if (getPaymentItem.fulfilled.match(result)) {
          modalObserver.updateModalProps(ModalNamesEnum.viewPaymentModal, {
            props: {
              data: result.payload,
            },
          });
          setIsFetchedTask(true);
        }
      });
    }
  }, [props?.paymentId, dispatch]);

  const onClose = useCallback(() => {
    if (isShowUnsavedDataModal && !props?.isOpenEditMode) {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.unsavedData.title'),
          text: t('general.modals.unsavedData.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () => {
            modalObserver.removeModal(ModalNamesEnum.viewPaymentModal);
            setSearchParams({});
            setIsShowUnsavedDataModal(false);
          },
        },
      });
    } else {
      modalObserver.removeModal(ModalNamesEnum.viewPaymentModal);
      setSearchParams({});
    }
  }, [isShowUnsavedDataModal, t, setIsShowUnsavedDataModal, setSearchParams, props?.isOpenEditMode]);

  return (
    <MuiDrawer isShow={!!isOpen} onClose={onClose}>
      {isFetchedTask && props?.data ? (
        <ViewPaymentModalContainer
          payment={props.data}
          isOpenEditMode={props?.isOpenEditMode}
          isShowUnsavedDataModal={isShowUnsavedDataModal}
          setIsShowUnsavedDataModal={setIsShowUnsavedDataModal}
          onClose={onClose}
        />
      ) : (
        <PlannerItemModalSkeleton />
      )}
    </MuiDrawer>
  );
};

export default memo(ViewPaymentModal);
