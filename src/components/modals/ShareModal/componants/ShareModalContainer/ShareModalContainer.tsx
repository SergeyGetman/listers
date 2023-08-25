import React, { FC, useCallback, useMemo, useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import MuiDefaultDrawerHeader from '../../../../modalsElements/containers/MuiDrawer/MuiDrawersHeders/MuiDefaultDrawerHeader';
import ModalFooter from '../../../../modalsElements/containers/Footer/ModalFooter';
import { BaseConfirmModalContainer } from '../../../confirmModals/BaseConfirmModal/BaseConfirmModal.style';
import { useAppSelector } from '../../../../../shared/hooks/redux';
import { AssignPeoplePermissionsEnum } from '../../../../../shared/enums/assignPeoplePermissions.enum';
import { transformToAssignUserSelectValueWithRole } from '../../../../../shared/functions/transformToAssignUserSelectValueWithRole';
import { AssignPeopleSelectValueModel } from '../../../../../shared/models/assignPeopleSelectValue.model';
import GeneralShareEdit from '../../../../assignPeople/GeneralShareEdit';
import ModalHeader from '../../../../headers/ModalHeader';

type ShareModalContainerProps = {
  title: string;
  onClose: () => void;
  owner?: any;
  handleConfirm?: (users: AssignPeopleSelectValueModel[]) => void;
  users?: AssignPeopleSelectValueModel[];
  disableRemoveYourself?: boolean;
};
const ShareModalContainer: FC<ShareModalContainerProps> = ({
  title,
  onClose,
  owner = {},
  users = [],
  handleConfirm,
  disableRemoveYourself = true,
}) => {
  const { id } = useAppSelector(({ profile }) => profile.data);
  const { t } = useTranslation();
  const { connections } = useAppSelector(({ profile }) => profile);
  const [isShowConfirmLoader, setIsShowConfirmLoader] = useState<boolean>(false);

  const creator = useMemo(() => {
    return {
      ...owner,
      value: owner?.id,
      role: AssignPeoplePermissionsEnum.editor,
      label: owner?.full_name ? owner?.full_name : `${owner?.first_name} ${owner?.last_name}`,
    };
  }, [owner]);

  const formatConnectionToOptions = useMemo(() => {
    if (connections && owner?.id) {
      return transformToAssignUserSelectValueWithRole(connections, owner?.id);
    }
    return [];
  }, [connections, owner?.id]);

  const formatUsersToOptions = useMemo(() => {
    if (users && owner?.id) {
      return transformToAssignUserSelectValueWithRole(users, owner?.id);
    }
    return [];
  }, [users, owner?.id]);

  const [assignPeopleList, setAssignPeopleList] = useState<AssignPeopleSelectValueModel[]>(
    disableRemoveYourself ? [creator, ...formatUsersToOptions] : [...formatUsersToOptions],
  );

  const handleSubmit = useCallback(() => {
    const formatUsers = disableRemoveYourself
      ? assignPeopleList.filter((item) => item.id !== id)
      : assignPeopleList;

    if (handleConfirm) {
      setIsShowConfirmLoader(true);
      Promise.resolve()
        .then(() => handleConfirm(formatUsers))
        .then(() => onClose())
        .finally(() => setIsShowConfirmLoader(false));
    }
  }, [assignPeopleList, disableRemoveYourself, handleConfirm, id, onClose]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return isMobile ? (
    <Box display="flex" width="100%" height="100%" flexDirection="column">
      <MuiDefaultDrawerHeader
        isShowCloseBtn={false}
        isRoundCloseButton
        onClose={() => (onClose ? onClose() : true)}
        title={title}
      />
      <Box mt="20px" p="0 16px" width="100%" sx={{ flexGrow: 1 }}>
        <Box mb="16px" width="100%" display="flex" justifyContent="center">
          <GeneralShareEdit
            assignPeopleList={assignPeopleList}
            setAssignPeopleList={setAssignPeopleList}
            creator={creator}
            disableRemoveYourself
            currentUserId={id}
            options={formatConnectionToOptions}
          />
        </Box>
      </Box>
      <ModalFooter
        isShow
        isSpaceBetweenBtn
        middleBtnProps={{
          isShow: true,
          label: t('general.buttons.cancel'),
          variant: 'outlined',
          fullWidth: true,
          onClick: () => onClose(),
        }}
        rightBtnProps={{
          isShow: true,
          isLoadingBtn: true,
          isDisabled: !disableRemoveYourself && assignPeopleList.length === 0,
          label: t('general.buttons.save'),
          variant: 'contained',
          fullWidth: true,
          loading: isShowConfirmLoader,
          onClick: () => handleSubmit(),
        }}
      />
    </Box>
  ) : (
    <>
      <BaseConfirmModalContainer sx={{ height: '340px', overflowY: 'scroll', pt: 0 }}>
        <Box
          sx={{
            position: 'sticky',
            zIndex: 10,
            top: 0,
            borderRadius: '5px',
            backgroundColor: theme.palette.case.contrast.white,
          }}
        >
          <ModalHeader title={title} onClose={onClose} />
        </Box>

        <Box sx={{ width: '100%', padding: '24px' }}>
          <GeneralShareEdit
            assignPeopleList={assignPeopleList}
            setAssignPeopleList={setAssignPeopleList}
            creator={creator}
            disableRemoveYourself={disableRemoveYourself}
            currentUserId={id}
            options={formatConnectionToOptions}
          />
        </Box>
      </BaseConfirmModalContainer>
      <ModalFooter
        isBottomRounded
        position="initial"
        middleBtnProps={{
          isShow: true,
          label: t('general.buttons.cancel'),
          variant: 'outlined',
          onClick: () => onClose(),
        }}
        rightBtnProps={{
          isShow: true,
          isLoadingBtn: true,
          label: t('general.buttons.save'),
          variant: 'contained',
          loading: isShowConfirmLoader,
          isDisabled: !disableRemoveYourself && assignPeopleList.length === 0,
          onClick: () => handleSubmit(),
        }}
      />
    </>
  );
};

export default ShareModalContainer;
