import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid';
import { Box, Typography, useTheme } from '@mui/material';
import { AssignPeoplePermissionsEnum } from '../../../../../shared/enums/assignPeoplePermissions.enum';
import { ItemUserModel } from '../../../../../shared/models/itemUser.model';
import { PlannerItemStatusesEnum } from '../../../../../shared/enums/plannerItemStatuses.enum';
import UserInfoPopover from '../../../../popovers/UserInfoPopover';
import MuiTooltip from '../../../../MuiTooltip';
import { ReactComponent as WentStatus } from '../../../../../assets/Images/planerItemStatuses/went-status.svg';
import { assignPeoplePermissionsConfig } from '../../../../../shared/configs/assignPeoplePermissions.config';
import { plannerItemStatusesConfig } from '../../../../../shared/configs/plannerItemStatuses.config';
import { getUserConnectionRole } from '../../../../../shared/functions/getUserConnetctionRole';
import AvatarContainer from '../../../../avatars/AvatarContainer';

type EventViewAssignPeopleListItemProps = {
  item: ItemUserModel;
  currentUserId: number;
  isOwner?: boolean;
  isShowStatuses?: boolean;
};
const EventViewAssignPeopleListItem: FC<EventViewAssignPeopleListItemProps> = ({
  item,
  currentUserId,
  isOwner,
  isShowStatuses,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const selectedItem = plannerItemStatusesConfig[item?.status || PlannerItemStatusesEnum.went];
  const selectedPermissionsItem =
    assignPeoplePermissionsConfig[item?.role || AssignPeoplePermissionsEnum.viewer];
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
      {isShowStatuses && !item.is_fake && (
        <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={4} sm={3}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
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
        </Grid>
      )}

      <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={3}>
        {!item.is_fake && (
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

export default EventViewAssignPeopleListItem;
