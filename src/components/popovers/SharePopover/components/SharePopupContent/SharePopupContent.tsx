import React, { FC, useCallback, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import MuiSelect from '../../../../formElements/MuiSelect';
import { ReactComponent as AssignPeopleIcon } from '../../../../../assets/Images/sidebar/profile.svg';
import { AssignPeopleSelectValueModel } from '../../../../../shared/models/assignPeopleSelectValue.model';
import { useAppSelector } from '../../../../../shared/hooks/redux';
import { AssignPeoplePermissionsEnum } from '../../../../../shared/enums/assignPeoplePermissions.enum';
import { transformToAssignUserSelectValueWithRole } from '../../../../../shared/functions/transformToAssignUserSelectValueWithRole';
import { ItemUserModel } from '../../../../../shared/models/itemUser.model';
import SharePopupFooter from '../SharePopupFooter';
import SharePopupItem from '../SharePopupItem';
import { PlannerItemStatusesEnum } from '../../../../../shared/enums/plannerItemStatuses.enum';
import { plannerItemStatusesConfig } from '../../../../../shared/configs/plannerItemStatuses.config';
type SharePopupContentProps = {
  users: ItemUserModel[];
  owner: ItemUserModel;
  handleConfirm?: (users: ItemUserModel[]) => void;
  onClose: () => void;
  disableRemoveYourself?: boolean;
  defaultStatusFroNewUsers?: PlannerItemStatusesEnum;
  isCanChangeStatus?: boolean;
  isShowStatusesForViewer?: boolean;
  isCanOwnerChangeYourPermission?: boolean;
};
const SharePopupContent: FC<SharePopupContentProps> = ({
  users,
  disableRemoveYourself,
  owner,
  handleConfirm,
  onClose,
  defaultStatusFroNewUsers,
  isCanChangeStatus,
  isShowStatusesForViewer,
  isCanOwnerChangeYourPermission,
}) => {
  const { id } = useAppSelector(({ profile }) => profile.data);
  const { t } = useTranslation();
  const { connections } = useAppSelector(({ profile }) => profile);
  const [isShowConfirmLoader, setIsShowConfirmLoader] = useState<boolean>(false);

  const formattedConnectionToOptions = useMemo(() => {
    if (connections && owner?.id) {
      return transformToAssignUserSelectValueWithRole(connections, owner?.id, defaultStatusFroNewUsers);
    }
    return [];
  }, [connections, defaultStatusFroNewUsers, owner?.id]);

  const formattedUsersToOptions = useMemo(() => {
    if (users && owner?.id) {
      return transformToAssignUserSelectValueWithRole(users, owner?.id);
    }
    return [];
  }, [users, owner?.id]);

  const [assignPeopleList, setAssignPeopleList] = useState<ItemUserModel[]>([...formattedUsersToOptions]);

  const handleChangerPermission = (userID: number, permission: AssignPeoplePermissionsEnum) => {
    const newArr = assignPeopleList.map((item) => {
      if (item.id === userID) {
        return {
          ...item,
          role: permission,
        };
      }
      return item;
    });

    setAssignPeopleList(newArr);
  };

  const handleChangeAssignUserStatus = (userID: number, status: PlannerItemStatusesEnum) => {
    const newArr = assignPeopleList.map((item) => {
      if (item.id === userID) {
        return {
          ...item,
          status,
        };
      }
      return item;
    });

    setAssignPeopleList(newArr);
  };

  const handleDeleteAssignUser = (userID: number) => {
    const newArr = assignPeopleList.filter((item) => item.id !== userID);
    setAssignPeopleList(newArr);
  };

  const statusesMenu = [
    plannerItemStatusesConfig[PlannerItemStatusesEnum.todo],
    plannerItemStatusesConfig[PlannerItemStatusesEnum.in_progress],
    plannerItemStatusesConfig[PlannerItemStatusesEnum.done],
  ];

  const handleSubmit = useCallback(() => {
    if (handleConfirm) {
      setIsShowConfirmLoader(true);
      Promise.resolve()
        .then(() => handleConfirm(assignPeopleList))
        .then(() => onClose())
        .finally(() => setIsShowConfirmLoader(false));
    }
  }, [assignPeopleList, handleConfirm, onClose]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: '16px' }}>
        <MuiSelect
          value={assignPeopleList}
          isMulti
          isDisableKeybordClear
          isSearchable
          isDisabled={false}
          options={formattedConnectionToOptions}
          isShowAvatarInOptions
          startIcon={<AssignPeopleIcon sx={{ svg: { width: '20px' } }} />}
          controlShouldRenderValue={false}
          placeholder={t('general.placeholders.selectAMember')}
          onChange={(newValue: AssignPeopleSelectValueModel[]) => setAssignPeopleList(newValue)}
          label=""
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ overflowY: 'auto', overflowX: 'hidden', height: '264px', margin: '0 16px', pb: '16px' }}>
          {assignPeopleList.map((item) => (
            <SharePopupItem
              handleChangerPermission={handleChangerPermission}
              handleChangeAssignUserStatus={handleChangeAssignUserStatus}
              currentUserId={id}
              statusesMenu={statusesMenu}
              isCanOwnerChangeYourPermission={isCanOwnerChangeYourPermission}
              isCanChangeStatus={isCanChangeStatus}
              isShowStatusesForViewer={isShowStatusesForViewer}
              handleDeleteAssignUser={handleDeleteAssignUser}
              key={item.id}
              item={item}
            />
          ))}
        </Box>
        <SharePopupFooter
          middleBtnProps={{
            isShow: true,
            label: t('general.buttons.cancel'),
            variant: 'outlined',
            size: 'small',
            onClick: () => onClose(),
          }}
          rightBtnProps={{
            isShow: true,
            isLoadingBtn: true,
            label: t('general.buttons.save'),
            variant: 'contained',
            size: 'small',
            loading: isShowConfirmLoader,
            isDisabled: !disableRemoveYourself && assignPeopleList.length === 0,
            onClick: () => handleSubmit(),
          }}
        />
      </Box>
    </Box>
  );
};

export default SharePopupContent;
