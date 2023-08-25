import React, { FC, useCallback, memo } from 'react';
import Grid from '@mui/material/Grid';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ReactComponent as DeleteShareUser } from '../../../../../assets/Images/delete-icon.svg';
import UserInfoPopover from '../../../../popovers/UserInfoPopover';
import MuiTooltip from '../../../../MuiTooltip';
import MuiIconButton from '../../../../buttons/MuiIconButton';
import { AssignPeopleSelectValueModel } from '../../../../../shared/models/assignPeopleSelectValue.model';
import AssignPeoplePermissionsMenu from '../../../AssignPeoplePermissionsMenu';
import { assignPeoplePermissionsConfig } from '../../../../../shared/configs/assignPeoplePermissions.config';
import { AssignPeoplePermissionsEnum } from '../../../../../shared/enums/assignPeoplePermissions.enum';
import { getUserConnectionRole } from '../../../../../shared/functions/getUserConnetctionRole';
import AvatarContainer from '../../../../avatars/AvatarContainer';
import { ModalNamesEnum } from '../../../../../shared/enums/modalNames.enum';
import modalObserver from '../../../../../shared/utils/observers/modalObserver';

type ListItemProps = {
  item: AssignPeopleSelectValueModel;
  currentUserId: number;
  handleDeleteAssignUser: (id: number) => void;
  creatorId: number;
  disableRemoveYourself?: boolean;
  isDisableRemoveUsers?: boolean;
  handleChangeAssignUserPermission: (
    item: AssignPeopleSelectValueModel,
    permission: AssignPeoplePermissionsEnum,
  ) => void;
  isNotAssignedCreator?: boolean;
};

const ListItem: FC<ListItemProps> = ({
  item,
  currentUserId,
  handleDeleteAssignUser,
  creatorId,
  disableRemoveYourself,
  handleChangeAssignUserPermission,
  isDisableRemoveUsers,
  isNotAssignedCreator,
}) => {
  const selectedPermissionsItem = assignPeoplePermissionsConfig[item.role];
  const { t } = useTranslation();
  const isOwner = item.id === creatorId;
  const currentUserIsNotOwner = (item.id === currentUserId) !== isOwner;
  const isDisabledRemoveBtn = disableRemoveYourself && isOwner;
  const menuList = [
    {
      item: assignPeoplePermissionsConfig.editor,
      isDisabled: isOwner || currentUserIsNotOwner,
      callback: () => handleChangeAssignUserPermission(item, assignPeoplePermissionsConfig.editor.id),
    },
    {
      item: assignPeoplePermissionsConfig.viewer,
      isDisabled: isOwner || currentUserIsNotOwner,
      callback: () => handleChangeAssignUserPermission(item, assignPeoplePermissionsConfig.viewer.id),
    },
  ];

  const handleDeleteUser = useCallback(
    (id: number) => {
      if (isOwner) {
        modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
          props: {
            title: t('general.modals.confirmRemoveYourselfFromTask.title'),
            text: t('general.modals.confirmRemoveYourselfFromTask.text'),
            cancelBtnText: t('general.buttons.cancel'),
            confirmBtnText: t('general.buttons.confirm'),
            handleConfirm: () => handleDeleteAssignUser(id),
          },
        });
      } else {
        handleDeleteAssignUser(id);
      }
    },
    [handleDeleteAssignUser, isOwner, t],
  );

  const connectionRole = getUserConnectionRole(item, currentUserId);

  // TODO add new color

  return (
    <Grid container sx={{ m: '4 0', p: '6px 0', borderBottom: '1px solid #F6F8FD' }}>
      <Grid item xs={5}>
        <Box
          sx={{
            display: 'flex',
            align: 'center',
            width: '100%',
          }}
        >
          <UserInfoPopover item={item} userId={currentUserId}>
            <Box>
              <MuiTooltip title={t('general.tooltips.showMoreInfo')}>
                <Box>
                  <AvatarContainer
                    id={item?.id}
                    firstName={item?.first_name}
                    lastName={item?.last_name}
                    isOwner={isOwner}
                    size="medium"
                    src={
                      item?.avatar
                        ? item?.avatar?.additional_info?.size_urls?.avatar_icon || item?.avatar?.url
                        : ''
                    }
                  />
                </Box>
              </MuiTooltip>
            </Box>
          </UserInfoPopover>

          <Box
            sx={{
              ml: '10px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              justifyContent: 'center',
            }}
          >
            <Typography noWrap variant="default" sx={{ color: '#444C6D' }}>
              {item.full_name ||
                `${item?.first_name ? item?.first_name : ''} ${item?.last_name ? item?.last_name : ''}`}
            </Typography>
            <Typography noWrap variant="extra_small" sx={{ color: '#787F9D', textTransform: 'capitalize' }}>
              {isOwner ? t('general.plannerItemsRole.owner') : connectionRole}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        {isNotAssignedCreator ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
            }}
          >
            <Typography sx={{ color: '#444C6D' }} variant="default">
              {t('general.notAssigned')}
            </Typography>
          </Box>
        ) : isOwner ? (
          <Box>
            <Typography sx={{ color: '#444C6D' }} variant="default">
              {t('general.plannerItemsRole.owner')}
            </Typography>
          </Box>
        ) : (
          <Box>
            {!item.is_fake && (
              <AssignPeoplePermissionsMenu
                selectedPermissionsItem={selectedPermissionsItem}
                menu={menuList}
              />
            )}
          </Box>
        )}
      </Grid>
      {!isNotAssignedCreator && !isDisableRemoveUsers && !currentUserIsNotOwner && !isDisabledRemoveBtn && (
        <Grid item sx={{ display: 'flex', alignItems: 'center', p: '0', ml: '10px' }}>
          <MuiTooltip title={isOwner ? t('general.tooltips.removeYourself') : t('general.tooltips.remove')}>
            <Box
              sx={{
                svg: {
                  path: {
                    // TODO add new color
                    fill: '#A3AAC2',
                  },
                },
              }}
            >
              <MuiIconButton
                onClick={() => handleDeleteUser(item?.id)}
                variant="default"
                color="secondary"
                size="medium"
              >
                <DeleteShareUser />
              </MuiIconButton>
            </Box>
          </MuiTooltip>
        </Grid>
      )}
    </Grid>
  );
};

export default memo(ListItem);
