/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useEffect, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { useAppDispatch } from '../../../shared/hooks/redux';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import MuiDrawer from '../../modalsElements/containers/MuiDrawer';
import ViewTaskModalContainer from './components/ViewTaskModalContainer';
import { getTask } from '../../../store/roadmap/roadmapThunk';
import PlannerItemModalSkeleton from '../../modalsElements/components/PlannerItemModalSkeleton';
import modalObserver, { ModalProps } from '../../../shared/utils/observers/modalObserver';

const ViewTaskModal = ({ isOpen, props }: ModalProps) => {
  const [isShowUnsavedDataModal, setIsShowUnsavedDataModal] = useState<boolean>(false);
  const [isFetchedTask, setIsFetchedTask] = useState<boolean>(false);
  const [, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const theme = useTheme();

  const handleChangeSetIsShowUnsavedDataModal = useCallback(
    (val: boolean) => {
      setIsShowUnsavedDataModal(val);
    },
    [setIsShowUnsavedDataModal],
  );

  const onClose = useCallback(() => {
    if (isShowUnsavedDataModal) {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.unsavedData.title'),
          text: t('general.modals.unsavedData.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () => {
            modalObserver.removeModal(ModalNamesEnum.viewTaskModal);
            setSearchParams({});
          },
        },
      });
    } else {
      modalObserver.removeModal(ModalNamesEnum.viewTaskModal);
      setSearchParams({});
    }
  }, [dispatch, isShowUnsavedDataModal, setSearchParams, t]);

  useEffect(() => {
    if (props?.taskId) {
      setIsFetchedTask(false);
      dispatch(getTask({ taskId: props?.taskId })).then((result) => {
        if (getTask.fulfilled.match(result)) {
          modalObserver.updateModalProps(ModalNamesEnum.viewTaskModal, {
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
  }, [props?.taskId, dispatch]);

  return (
    <MuiDrawer backgroundColor={theme.palette.case.neutral.n50} isShow={!!isOpen} onClose={onClose}>
      {isFetchedTask && props?.data ? (
        <ViewTaskModalContainer
          task={props?.data}
          isShowUnsavedDataModal={isShowUnsavedDataModal}
          setIsShowUnsavedDataModal={handleChangeSetIsShowUnsavedDataModal}
          onClose={onClose}
        />
      ) : (
        <PlannerItemModalSkeleton />
      )}
    </MuiDrawer>
  );
};

export default memo(ViewTaskModal);
