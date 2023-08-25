import React, { FC, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Box, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ItemUserModel } from '../../../../../shared/models/itemUser.model';
import { assignPeoplePermissionsConfig } from '../../../../../shared/configs/assignPeoplePermissions.config';
import UserInfoPopover from '../../../../popovers/UserInfoPopover';
import MuiTooltip from '../../../../MuiTooltip';
import { ReactComponent as WentStatus } from '../../../../../assets/Images/planerItemStatuses/went-status.svg';
import { plannerItemStatusesConfig } from '../../../../../shared/configs/plannerItemStatuses.config';
import PaperActionMenu from '../../../../actionMenus/PaperActionMenu';
import { ReactComponent as NotAssociatedIcon } from '../../../../../assets/Images/info-icon.svg';
import { PlannerItemStatusesEnum } from '../../../../../shared/enums/plannerItemStatuses.enum';
import MuiPreloader from '../../../../MuiPreloader';
import { AssignPeoplePermissionsEnum } from '../../../../../shared/enums/assignPeoplePermissions.enum';
import { getUserConnectionRole } from '../../../../../shared/functions/getUserConnetctionRole';
import AvatarContainer from '../../../../avatars/AvatarContainer';

type TaskViewAssignPeopleListItemProps = {
  item: ItemUserModel;
  isNotAssignedCreator?: boolean;
  currentUserId: number;
  ownerId: number;
  isEditor: boolean;
  isArchive?: boolean;
  status: PlannerItemStatusesEnum;
  handleChangeAssignUserStatus: (params: {
    userStatus: PlannerItemStatusesEnum;
    userId: number;
    setIsShowChangeStatusLoader: (val: boolean) => void;
  }) => void;
};
const TaskViewAssignPeopleListItem: FC<TaskViewAssignPeopleListItemProps> = ({
  item,
  isNotAssignedCreator,
  ownerId,
  currentUserId,
  isEditor,
  status,
  handleChangeAssignUserStatus,
  isArchive,
}) => {
  const [isShowChangeStatusLoader, setIsShowChangeStatusLoader] = useState<boolean>(false);
  const selectedPermissionsItem =
    assignPeoplePermissionsConfig[item?.role || AssignPeoplePermissionsEnum.viewer];
  const isOwner = item?.id === ownerId;
  const theme = useTheme();
  const { t } = useTranslation();
  const selectedItem = plannerItemStatusesConfig[item?.status || PlannerItemStatusesEnum.todo];

  const changeUserStatus = (selectedStatus: PlannerItemStatusesEnum) => {
    if (selectedStatus === item?.status) return;

    handleChangeAssignUserStatus({
      userStatus: selectedStatus,
      userId: item?.id,
      setIsShowChangeStatusLoader,
    });
  };

  const statusMenu = [
    {
      item: plannerItemStatusesConfig.todo,
      callback: () => changeUserStatus(PlannerItemStatusesEnum.todo),
      isDisabled: false,
    },
    {
      item: plannerItemStatusesConfig.in_progress,
      callback: () => changeUserStatus(PlannerItemStatusesEnum.in_progress),
      isDisabled: false,
    },
    {
      item: plannerItemStatusesConfig.done,
      callback: () => changeUserStatus(PlannerItemStatusesEnum.done),
      isDisabled: false,
    },
  ];

  return (
    <Grid
      container
      sx={{
        mb: '16px',
        pb: '16px',
        borderBottom: `1px solid ${theme.palette.case.neutral.n100}`,
      }}
      spacing={1}
    >
      <Grid item xs={5}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: ' 100%',
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
                    size="small"
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

          <Box sx={{ ml: '10px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <Typography noWrap variant="extra_small" sx={{ color: theme.palette.case.contrast.black }}>
              {item?.full_name ||
                `${item?.first_name ? item?.first_name : ''} ${item?.last_name ? item?.last_name : ''}`}
            </Typography>
            <Typography
              noWrap
              variant="extra_small"
              sx={{ color: theme.palette.case.neutral.n400, textTransform: 'capitalize' }}
            >
              {isOwner ? t('general.plannerItemsRole.owner') : getUserConnectionRole(item, currentUserId)}
            </Typography>
          </Box>
        </Box>
      </Grid>
      {isNotAssignedCreator ? (
        <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={4} sm={3}>
          <Box
            sx={{
              svg: { mr: '6px', path: { fill: theme.palette.case.neutral.n400 } },
              display: 'flex',
              alignItems: 'flex-end',
            }}
          >
            <NotAssociatedIcon />
            <Typography sx={{ color: theme.palette.case.neutral.n400 }} variant="extra_small">
              {t('general.notAssigned')}
            </Typography>
          </Box>
        </Grid>
      ) : (
        <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={4} sm={3}>
          {isEditor &&
          !isArchive &&
          currentUserId !== item?.id &&
          status !== PlannerItemStatusesEnum.backlog ? (
            <>
              {isShowChangeStatusLoader ? (
                <MuiPreloader size="small" isShow />
              ) : (
                <Box>
                  {!item?.is_fake && (
                    <PaperActionMenu menuList={statusMenu} activeItem={item?.status}>
                      <Box>
                        <MuiTooltip title={t('general.tooltips.changeStatus')}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              '&:hover': {
                                opacity: '0.7',
                              },
                              svg: { width: '16px', height: '16px' },
                            }}
                          >
                            {selectedItem && (
                              <Box sx={{ pb: '2px' }}>
                                <selectedItem.icon />
                              </Box>
                            )}

                            <Typography sx={{ marginLeft: '6px', lineHeight: '11px' }} variant="extra_small">
                              {selectedItem && selectedItem.label}
                            </Typography>
                          </Box>
                        </MuiTooltip>
                      </Box>
                    </PaperActionMenu>
                  )}
                </Box>
              )}
            </>
          ) : (
            <Box>
              {!item?.is_fake && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    svg: { width: '16px', height: '16px' },
                  }}
                >
                  <Box sx={{ pb: '2px' }}>
                    <selectedItem.icon />
                  </Box>
                  <Typography sx={{ marginLeft: '6px', lineHeight: '11px' }} variant="extra_small">
                    {selectedItem && selectedItem.label}
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Grid>
      )}

      <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={3}>
        {!item?.is_fake && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              svg: { width: '16px', height: '16px' },
            }}
          >
            <Box sx={{ pb: '2px' }}>
              <WentStatus />
            </Box>

            <Typography sx={{ m: '0 5px' }} variant="extra_small">
              {selectedPermissionsItem && selectedPermissionsItem.label}
            </Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default TaskViewAssignPeopleListItem;
