import React, { FC, useCallback } from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ItemUserModel } from '../../../../../shared/models/itemUser.model';
import AvatarContainer from '../../../../avatars/AvatarContainer';
import { getUserConnectionRole } from '../../../../../shared/functions/getUserConnetctionRole';
import AssignPeoplePermissionsMenu from '../../../../assignPeople/AssignPeoplePermissionsMenu';
import { assignPeoplePermissionsConfig } from '../../../../../shared/configs/assignPeoplePermissions.config';
import { AssignPeoplePermissionsEnum } from '../../../../../shared/enums/assignPeoplePermissions.enum';
import MuiTooltip from '../../../../MuiTooltip';
import { ReactComponent as DeleteShareUser } from '../../../../../assets/Images/delete-icon.svg';
import modalObserver from '../../../../../shared/utils/observers/modalObserver';
import { ModalNamesEnum } from '../../../../../shared/enums/modalNames.enum';
import MuiIconButton from '../../../../buttons/iconButtons/MuiIconButton';
import StatuesItem from '../../../StatusesPopover/components/StatuesItem';
import { PlannerItemStatusesEnum } from '../../../../../shared/enums/plannerItemStatuses.enum';
import StatusesPopover from '../../../StatusesPopover';

type SharePopupItemProps = {
  item: ItemUserModel;
  currentUserId: number;
  handleChangerPermission: (itemId: number, permission: AssignPeoplePermissionsEnum) => void;
  isShowStatusesForViewer?: boolean;
  handleChangeAssignUserStatus: (itemId: number, status: PlannerItemStatusesEnum) => void;
  handleDeleteAssignUser: (itemId: number) => void;
  isCanChangeStatus?: boolean;
  isCanOwnerChangeYourPermission?: boolean;
  statusesMenu?: {
    label: string;
    id: PlannerItemStatusesEnum;
    icon: any;
    selectedBgColor: string;
    hoverBgColor: string;
    iconColor?: string;
    color?: string;
  }[];
};
const SharePopupItem: FC<SharePopupItemProps> = ({
  item,
  currentUserId,
  handleChangerPermission,
  handleChangeAssignUserStatus,
  handleDeleteAssignUser,
  statusesMenu,
  isCanChangeStatus,
  isShowStatusesForViewer = false,
  isCanOwnerChangeYourPermission = false,
}) => {
  const connectionRole = getUserConnectionRole(item, currentUserId);
  const { t } = useTranslation();
  const theme = useTheme();

  const selectedPermissionsItem =
    assignPeoplePermissionsConfig[item.role || AssignPeoplePermissionsEnum.viewer];

  const menuList = [
    {
      item: assignPeoplePermissionsConfig.editor,
      isDisabled:
        isCanOwnerChangeYourPermission && item.isOwner
          ? currentUserId !== item.id
          : currentUserId === item.id,
      callback: () => handleChangerPermission(item.id, assignPeoplePermissionsConfig.editor.id),
    },
    {
      item: assignPeoplePermissionsConfig.viewer,
      isDisabled:
        isCanOwnerChangeYourPermission && item.isOwner
          ? currentUserId !== item.id
          : currentUserId === item.id,
      callback: () => handleChangerPermission(item.id, assignPeoplePermissionsConfig.viewer.id),
    },
  ];

  const handleDeleteUser = useCallback(
    (id: number) => {
      if (item.isOwner) {
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
    [handleDeleteAssignUser, item.isOwner, t],
  );

  const formattedStatusesMenu = statusesMenu
    ? statusesMenu.map((statusItem) => {
        return {
          item: statusItem,
          callback: () => handleChangeAssignUserStatus(item.id, statusItem.id),
        };
      })
    : null;

  return (
    <Grid
      container
      sx={{
        m: '4 0',
        p: '6px 0',
        borderBottom: `1px solid ${theme.palette.case.neutral.n75}`,
        '&:last-child': {
          borderBottom: 'none',
        },
      }}
    >
      <Grid item xs={6}>
        <Box
          sx={{
            display: 'flex',
            align: 'center',
            width: '100%',
          }}
        >
          <AvatarContainer
            id={item?.id}
            firstName={item?.first_name}
            lastName={item?.last_name}
            isOwner={item.isOwner}
            size="medium"
            src={
              item?.avatar ? item?.avatar?.additional_info?.size_urls?.avatar_icon || item?.avatar?.url : ''
            }
          />

          <Box
            sx={{
              ml: '10px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              justifyContent: 'center',
            }}
          >
            <Typography noWrap variant="t14r" color={theme.palette.case.neutral.n900}>
              {item.full_name ||
                `${item?.first_name ? item?.first_name : ''} ${item?.last_name ? item?.last_name : ''}`}
            </Typography>
            {item.status &&
            (isShowStatusesForViewer ||
              (!isShowStatusesForViewer && item.role !== AssignPeoplePermissionsEnum.viewer)) ? (
              <Box mt="4px">
                {item.id !== currentUserId && formattedStatusesMenu && isCanChangeStatus ? (
                  <StatusesPopover selectedStatus={item.status} statusesMenu={formattedStatusesMenu}>
                    <StatuesItem isSmall selectedStatus={item.status} />
                  </StatusesPopover>
                ) : (
                  <StatuesItem isSmall selectedStatus={item.status} />
                )}
              </Box>
            ) : (
              <Typography
                noWrap
                variant="t12r"
                lineHeight="21px"
                sx={{ color: theme.palette.case.neutral.n400, textTransform: 'capitalize' }}
              >
                {item.isOwner ? t('general.plannerItemsRole.owner') : connectionRole}
              </Typography>
            )}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'flex-end',
          }}
        >
          <Box>
            <Box>
              {!item.is_fake && (
                <AssignPeoplePermissionsMenu
                  selectedPermissionsItem={selectedPermissionsItem}
                  menu={menuList}
                />
              )}
            </Box>
          </Box>
          <Box>
            {item.isOwner ? (
              <Box ml="8px">
                <Typography color={theme.palette.case.neutral.n800} variant="t12r">
                  {t('general.plannerItemsRole.owner')}
                </Typography>
              </Box>
            ) : (
              <>
                {item.id === currentUserId ? (
                  <Box width="24px" />
                ) : (
                  <MuiTooltip title={t('general.tooltips.remove')}>
                    <Box
                      sx={{
                        svg: {
                          path: {
                            fill: theme.palette.case.neutral.n400,
                          },
                        },
                      }}
                    >
                      <MuiIconButton
                        onClick={() => handleDeleteUser(item?.id)}
                        variant="default"
                        size="small"
                        color="secondary"
                      >
                        <DeleteShareUser />
                      </MuiIconButton>
                    </Box>
                  </MuiTooltip>
                )}
              </>
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SharePopupItem;
