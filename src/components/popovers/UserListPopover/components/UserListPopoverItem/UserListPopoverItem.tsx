import React, { FC } from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AvatarContainer from '../../../../avatars/AvatarContainer';
import { ItemUserModel } from '../../../../../shared/models/itemUser.model';
import StatuesItem from '../../../StatusesPopover/components/StatuesItem';
type UserListPopoverItemProps = {
  item: ItemUserModel;
};
const UserListPopoverItem: FC<UserListPopoverItemProps> = ({ item }) => {
  const { t } = useTranslation();
  const theme = useTheme();
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
      <Grid item xs={12}>
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
            <Typography
              noWrap
              variant="t12r"
              sx={{ color: theme.palette.case.neutral.n400, textTransform: 'capitalize' }}
            >
              {item.status ? (
                <Box mt="4px">
                  <StatuesItem isSmall selectedStatus={item.status} />
                </Box>
              ) : (
                <>{item.isOwner ? t('general.plannerItemsRole.owner') : item.connection_role}</>
              )}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default UserListPopoverItem;
