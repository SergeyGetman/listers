import React, { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import AvatarContainer from '../../../../../avatars/AvatarContainer';
import SidebarActionMenu from '../../../../../actionMenus/SidebarActionMenu';
import SidebarConfig from '../../sidebarConfig';
import { SidebarEnum } from '../../../../../../shared/enums/sidebar.enum';

type SidebarHeaderProps = {
  fullName?: string;
  avatarSrc: string;
  isOwner?: boolean;
  userId: number;
  firstName?: string;
  lastName?: string;
  isSmallDisplay: boolean;
  handleCloseSidebar: () => void;
  email?: string;
  phone?: string;
};

const SidebarFooter: FC<SidebarHeaderProps> = ({
  email,
  phone,
  fullName,
  firstName = 'N',
  lastName = 'A',
  avatarSrc,
  isOwner,
  userId,
  isSmallDisplay,
  handleCloseSidebar,
}) => {
  const theme = useTheme();
  const menuList = [
    {
      item: SidebarConfig[SidebarEnum.settings],
      callback: () => true,
    },
    {
      item: SidebarConfig[SidebarEnum.plans],
      callback: () => true,
    },
    {
      item: SidebarConfig[SidebarEnum.wallet],
      callback: () => true,
    },
    {
      item: SidebarConfig[SidebarEnum.archive],
      callback: () => true,
    },
    {
      item: SidebarConfig[SidebarEnum.feedback],
      callback: () => true,
    },
  ];
  return (
    <SidebarActionMenu
      isSmallDisplay={isSmallDisplay}
      handleCloseSidebar={handleCloseSidebar}
      menuList={menuList}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          paddingTop: '12px',
          borderTop: `1px solid ${theme.palette.case.neutral.n100}`,
          flexShrink: '0',
          width: '100%',
        }}
      >
        <AvatarContainer
          id={userId}
          firstName={firstName}
          lastName={lastName}
          size="medium"
          isOwner={isOwner}
          src={avatarSrc}
        />

        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography
            variant="default_bolt"
            noWrap
            sx={{
              color: theme.palette.case.neutral.n800,
              marginLeft: '8px',
              display: 'block',
              width: '80%',
              wordBreak: 'normal',
            }}
          >
            {fullName}
          </Typography>
          {email || phone ? (
            <>
              {email ? (
                <Typography
                  variant="extra_small"
                  noWrap
                  sx={{
                    color: theme.palette.case.neutral.n800,
                    marginLeft: '8px',
                    display: 'block',
                    width: '80%',
                    wordBreak: 'normal',
                  }}
                >
                  {email}
                </Typography>
              ) : (
                <Typography
                  variant="extra_small"
                  noWrap
                  sx={{
                    color: theme.palette.case.neutral.n800,
                    marginLeft: '8px',
                    display: 'block',
                    width: '80%',
                    wordBreak: 'normal',
                  }}
                >
                  {phone}
                </Typography>
              )}
            </>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </SidebarActionMenu>
  );
};
export default SidebarFooter;
