/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useEffect, useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../../shared/hooks/redux';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import MuiDrawer from '../../modalsElements/containers/MuiDrawer';
import PlannerItemModalSkeleton from '../../modalsElements/components/PlannerItemModalSkeleton';
import ViewTodoModalContainer from './components/ViewTodoModalContainer';
import { getTodo } from '../../../store/todo/todoThunk';
import modalObserver, { ModalProps } from '../../../shared/utils/observers/modalObserver';

const ViewTodoModal = ({ isOpen, props }: ModalProps) => {
  const [isShowUnsavedDataModal, setIsShowUnsavedDataModal] = useState<boolean>(false);
  const [isFetchedTodo, setIsFetchedTodo] = useState<boolean>(false);
  const [, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onClose = useCallback(() => {
    if (isShowUnsavedDataModal) {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.unsavedData.title'),
          text: t('general.modals.unsavedData.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () => {
            modalObserver.removeModal(ModalNamesEnum.viewTodoModal);
            setSearchParams({});
          },
        },
      });
    } else {
      modalObserver.removeModal(ModalNamesEnum.viewTodoModal);
      setSearchParams({});
    }
  }, [dispatch, isShowUnsavedDataModal, setSearchParams, t]);

  useEffect(() => {
    if (props?.todoId) {
      setIsFetchedTodo(false);
      dispatch(getTodo(props?.todoId)).then((result) => {
        if (getTodo.fulfilled.match(result)) {
          modalObserver.updateModalProps(ModalNamesEnum.viewTodoModal, {
            props: {
              data: result.payload,
            },
          });
          setIsFetchedTodo(true);
        } else {
          onClose();
        }
      });
    }
  }, [props?.todoId, dispatch]);
  return (
    <MuiDrawer isShow={!!isOpen} onClose={onClose}>
      {isFetchedTodo && props?.data ? (
        <ViewTodoModalContainer
          isOpenEditMode={props?.isOpenEditMode}
          todo={props.data}
          setIsShowUnsavedDataModal={setIsShowUnsavedDataModal}
          onClose={onClose}
        />
      ) : (
        <PlannerItemModalSkeleton />
      )}
    </MuiDrawer>
  );
};

export default memo(ViewTodoModal);
