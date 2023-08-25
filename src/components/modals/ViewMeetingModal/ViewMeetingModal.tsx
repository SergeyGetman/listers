/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState, memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material';
import { useAppDispatch } from '../../../shared/hooks/redux';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import MuiDrawer from '../../modalsElements/containers/MuiDrawer';
import PlannerItemModalSkeleton from '../../modalsElements/components/PlannerItemModalSkeleton';
import modalObserver, { ModalProps } from '../../../shared/utils/observers/modalObserver';
import ViewMeetingModalContainer from './components/ViewMeetingModalContainer';
import { getMeeting } from '../../../store/meetings/meetingsThunk';

const ViewMeetingModal = ({ isOpen, props }: ModalProps) => {
  const [isShowUnsavedDataModal, setIsShowUnsavedDataModal] = useState<boolean>(false);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const theme = useTheme();

  const onClose = (isForceClose?: boolean) => {
    if (isShowUnsavedDataModal && !isForceClose) {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.unsavedData.title'),
          text: t('general.modals.unsavedData.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () => {
            modalObserver.removeModal(ModalNamesEnum.viewMeetingModal);
          },
        },
      });
    } else {
      modalObserver.removeModal(ModalNamesEnum.viewMeetingModal);
    }
    setSearchParams({});
  };

  useEffect(() => {
    if (props?.meetingId) {
      setIsFetched(false);
      dispatch(getMeeting({ meetingId: props?.meetingId })).then((result) => {
        if (getMeeting.fulfilled.match(result)) {
          modalObserver.updateModalProps(ModalNamesEnum.viewMeetingModal, {
            props: {
              data: result.payload,
            },
          });
          setIsFetched(true);
        } else {
          onClose(true);
        }
      });
    }
  }, [props?.meetingId, dispatch]);

  return (
    <MuiDrawer backgroundColor={theme.palette.case.neutral.n50} isShow={!!isOpen} onClose={onClose}>
      {isFetched && props?.data ? (
        <ViewMeetingModalContainer
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

export default memo(ViewMeetingModal);
