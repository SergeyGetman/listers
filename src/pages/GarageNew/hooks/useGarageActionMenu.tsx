import { ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import router from '../../../shared/services/router';
import { useAppDispatch } from '../../../shared/hooks/redux';
import modalObserver from '../../../shared/utils/observers/modalObserver';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import { deleteTransport, selfCancelShare, syncUserShare } from '../store/garageThunkV2';
import { ReactComponent as ViewIcon } from '../../../assets/Images/newGarage/action-menu/Eye.svg';
import { ReactComponent as EditIcon } from '../../../assets/Images/newGarage/action-menu/Edit.svg';
import { ReactComponent as ShareIcon } from '../../../assets/Images/newGarage/action-menu/Family.svg';
import { ReactComponent as CoverIcon } from '../../../assets/Images/newGarage/action-menu/Cover.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/Images/newGarage/action-menu/Delete.svg';
import { AssignPeopleSelectValueModel } from '../../../shared/models/assignPeopleSelectValue.model';
import { setLoadingGarage } from '../store/garageSliceV2';
import { RootObjectDataOwner, RootObjectDataUsers } from '../store/types';

type GarageActionMenuType = {
  isEditor: boolean;
  isCreator: boolean;
  isDraft: boolean;
  isViewer: boolean;
};
export type TransportInfo = {
  transportID: number;
  vehicleName: string;
  owner: RootObjectDataOwner;
  users: RootObjectDataUsers[];
};

// TODO i18n

export const useGarageActionMenu = (userStatus: GarageActionMenuType, transportInfo: TransportInfo) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const deleteCurrentTransport = ({
    transportID,
    vehicleName,
  }: Pick<TransportInfo, 'transportID' | 'vehicleName'>) => {
    modalObserver.addModal(ModalNamesEnum.alertModal, {
      props: {
        modalContent: {
          header: `Delete ${vehicleName}`,
          title: 'Your data will be lost!',
          subtitle: `Are you sure you want to delete ${vehicleName}?\nThis action cannot be undone.`,

          isShow: true,
          variantIcon: 'delete',
        },
        rightBtnProps: {
          isShow: true,
          label: 'Delete',
          color: 'error',
          onClick: () =>
            dispatch(
              deleteTransport({
                transportID,
                vehicleName,
              }),
            )
              .unwrap()
              .then(() => modalObserver.removeModal(ModalNamesEnum.alertModal)),
        },
        leftBtnProps: {
          isShow: true,
          label: 'Cancel',
        },
      },
    });
  };
  const handleOpenShareModal = (
    transportInfoUsers: Pick<TransportInfo, 'users' | 'owner' | 'transportID'>,
  ) => {
    modalObserver.addModal(ModalNamesEnum.shareModal, {
      props: {
        users: transportInfoUsers?.users,
        owner: transportInfoUsers?.owner,
        title: t('general.header.shareWith'),
        handleConfirm: (users: AssignPeopleSelectValueModel[]) =>
          Promise.resolve().then(() => {
            dispatch(syncUserShare({ transportID: transportInfoUsers.transportID, users }));
          }),
      },
    });
  };

  const selfCanselShareHandler = ({ transportID }: Pick<TransportInfo, 'transportID'>) =>
    dispatch(selfCancelShare(transportID));

  const createAction = (
    label: string,
    startIcon: ReactNode,
    callback: () => void,
    isDisabled: boolean = false,
  ) => {
    return {
      label,
      callback,
      isContainStartIcon: true,
      startIcon,
      isDisabled,
    };
  };

  const view = createAction('View', ViewIcon, () => {
    dispatch(setLoadingGarage({ isLoading: false }));
    navigate(
      `${router.garageNew.children.garageCardInformation.path}/${transportInfo.transportID}/${router.garageNew.children.garageCardInformation.generalInfo.path}`,
    );
  });
  const stopShare = createAction('Cancel sharing', ShareIcon, () =>
    selfCanselShareHandler({ ...transportInfo }),
  );
  const del = createAction('Delete', DeleteIcon, () => deleteCurrentTransport({ ...transportInfo }));
  const changeCoverPhoto = createAction('Change cover photo', CoverIcon, () => {});
  const share = createAction('Share', ShareIcon, () => handleOpenShareModal({ ...transportInfo }));
  const continueCreating = createAction('Continue creating', EditIcon, () => {});

  if (userStatus.isCreator && !userStatus.isDraft) {
    return [...[view, share, changeCoverPhoto, del]];
  }
  if (userStatus.isEditor) {
    return [...[view, changeCoverPhoto, stopShare]];
  }
  if (userStatus.isViewer) {
    return [...[view, stopShare]];
  }
  if (userStatus.isCreator && userStatus.isDraft) {
    return [...[continueCreating, del]];
  }
  return [];
};
