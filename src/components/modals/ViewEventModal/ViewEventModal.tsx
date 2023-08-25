/* eslint-disable react-hooks/exhaustive-deps */

import React, { useCallback, useEffect, useState, memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material';
import { useAppDispatch } from '../../../shared/hooks/redux';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import MuiDrawer from '../../modalsElements/containers/MuiDrawer';
import PlannerItemModalSkeleton from '../../modalsElements/components/PlannerItemModalSkeleton';
import { getEvent } from '../../../store/events/eventsThunk';
import ViewEventModalContainer from './components/ViewEventModalContainer';
import modalObserver, { ModalProps } from '../../../shared/utils/observers/modalObserver';

const ViewEventModal = ({ isOpen, props }: ModalProps) => {
  const [isShowUnsavedDataModal, setIsShowUnsavedDataModal] = useState<boolean>(false);
  const [isFetchedTask, setIsFetchedTask] = useState<boolean>(false);
  const [, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const theme = useTheme();

  const onClose = useCallback(
    (isForceClose?: boolean) => {
      if (isShowUnsavedDataModal && !isForceClose) {
        modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
          props: {
            title: t('general.modals.unsavedData.title'),
            text: t('general.modals.unsavedData.text'),
            cancelBtnText: t('general.buttons.cancel'),
            confirmBtnText: t('general.buttons.confirm'),
            handleConfirm: () => {
              modalObserver.removeModal(ModalNamesEnum.viewEventModal);
            },
          },
        });
      } else {
        modalObserver.removeModal(ModalNamesEnum.viewEventModal);
      }
      setSearchParams({});
    },

    [isShowUnsavedDataModal, setSearchParams, t],
  );

  useEffect(() => {
    if (props?.eventId) {
      setIsFetchedTask(false);
      dispatch(getEvent({ eventId: props?.eventId })).then((result) => {
        if (getEvent.fulfilled.match(result)) {
          modalObserver.updateModalProps(ModalNamesEnum.viewEventModal, {
            props: {
              data: result.payload,
            },
          });
          setIsFetchedTask(true);
        } else {
          onClose();
        }
      });
    }
  }, [props?.eventId, dispatch]);

  return (
    <MuiDrawer backgroundColor={theme.palette.case.neutral.n50} isShow={!!isOpen} onClose={onClose}>
      {isFetchedTask && props?.data ? (
        <ViewEventModalContainer
          event={props.data}
          setIsShowUnsavedDataModal={setIsShowUnsavedDataModal}
          onClose={onClose}
        />
      ) : (
        <PlannerItemModalSkeleton />
      )}
    </MuiDrawer>
  );
};

export default memo(ViewEventModal);
