import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ReactComponent as WentStatus } from '../../../../../assets/Images/planerItemStatuses/went-status.svg';
import MuiBaseAccordion from '../../../../../components/accordions/MuiBaseAccordion';
import { GarageItemSharedUserModel } from '../../../../../shared/models/garage.model';
import { ActionMenuListModel } from '../../../../../shared/models/actionMenuList.model';
import MuiBaseMobileAccordion from '../../../../../components/accordions/MuiBaseMobileAccordion';
import MuiAvatarGroup from '../../../../../components/avatars/MuiAvatarGroup';
import AvatarContainer from '../../../../../components/avatars/AvatarContainer';

type GarageOpenItemSharingProps = {
  data: GarageItemSharedUserModel[];
  menu: ActionMenuListModel;
};

const GarageOpenItemSharing: FC<GarageOpenItemSharingProps> = ({ data, menu }) => {
  const { t } = useTranslation();

  const theme = useTheme();
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'));

  const renderContent = useMemo(
    () => (
      <>
        {data
          .filter((item) => item.permission === 'owner')
          .map((item) => (
            <Box
              key={item.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <AvatarContainer
                firstName={item.first_name}
                id={item.id}
                isOwner
                lastName={item.last_name}
                size="small"
                src={item.avatar?.additional_info?.size_urls?.avatar_icon || item.avatar?.url || ''}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: '16px',
                }}
              >
                <Typography
                  noWrap
                  sx={{
                    color: theme.palette.case.neutral.n700,
                    textTransform: 'capitalize',
                  }}
                  variant="small_bolt"
                >
                  {item.full_name}
                </Typography>
              </Box>
            </Box>
          ))}
        {data
          .filter((item) => item.permission !== 'owner')
          .map((item) => (
            <Box
              key={item.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                mt: '16px',
              }}
            >
              <AvatarContainer
                firstName={item.first_name}
                id={item.id}
                lastName={item.last_name}
                size="small"
                src={item.avatar?.additional_info?.size_urls?.avatar_icon || item.avatar?.url || ''}
              />

              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: '16px',
                  }}
                >
                  <Typography
                    noWrap
                    sx={{
                      color: theme.palette.case.neutral.n700,
                      textTransform: 'capitalize',
                    }}
                    variant="small_bolt"
                  >
                    {item.full_name}
                  </Typography>
                  <Typography
                    noWrap
                    sx={{
                      color: theme.palette.case.neutral.n400,
                    }}
                    variant="extra_small"
                  >
                    {item.connection_role}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '75px',
                    svg: { width: '16px', height: '16px' },
                  }}
                >
                  <Box sx={{ pb: '2px' }}>
                    <WentStatus />
                  </Box>

                  <Typography sx={{ m: '0 5px' }} variant="extra_small">
                    {item.permission === 'edit'
                      ? t('general.permission.editor')
                      : t('general.permission.viewer')}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
      </>
    ),
    [data, theme.palette.case.neutral.n400, theme.palette.case.neutral.n700, t],
  );

  return isMobileDisplay ? (
    <MuiBaseMobileAccordion
      menuList={menu}
      subtitleComponent={
        <MuiAvatarGroup
          isContainOwnerInUsers={false}
          maxItemView={2}
          owner={data.filter((item) => item.permission === 'owner')[0]}
          users={data}
        />
      }
      title={t('general.containers.sharing')}
    >
      <Box sx={{ padding: '0 10px 16px 10px' }}> {renderContent}</Box>
    </MuiBaseMobileAccordion>
  ) : (
    <MuiBaseAccordion
      menuList={menu}
      withHover
      isShowInfoDialog={false}
      isDisabledExpand={false}
      label={t('general.containers.sharing')}
    >
      {renderContent}
    </MuiBaseAccordion>
  );
};

export default GarageOpenItemSharing;
