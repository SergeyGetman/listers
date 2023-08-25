import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import { useTranslation } from 'react-i18next';
import { ItemUserModel } from '../../../../../shared/models/itemUser.model';
import MuiIconButton from '../../../../buttons/MuiIconButton';
import UserInfoPopover from '../../../../popovers/UserInfoPopover';
import { NetworkSharingItemContainer } from './NetworkSharingUserItem.style';
import AvatarContainer from '../../../../avatars/AvatarContainer';
import MuiTooltip from '../../../../MuiTooltip';

type Props = {
  item: ItemUserModel;
  profileId: number;
  onDelete: (id: number) => void;
};

const NetworkSharingUserItem: FC<Props> = ({ item, profileId, onDelete }) => {
  const { t } = useTranslation();

  return (
    <NetworkSharingItemContainer>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <UserInfoPopover item={item} userId={profileId}>
          <AvatarContainer
            firstName={item.first_name}
            id={item.id}
            lastName={item.last_name}
            src={item.avatar?.additional_info?.size_urls?.avatar_icon || item.avatar?.url || ''}
            isOwner={item.isOwner}
          />
        </UserInfoPopover>

        <Typography
          sx={{
            ml: '5px',
          }}
          variant="default"
        >
          {item.full_name}
        </Typography>
      </Box>
      <Box>
        <Box>
          <MuiTooltip title={t('general.tooltips.remove')}>
            <Box>
              <MuiIconButton onClick={() => onDelete(item.id)} color="secondary" size="small">
                <DeleteForeverOutlinedIcon
                  sx={(theme) => ({
                    '&:hover': { color: theme.palette.case.warning.high, transition: '0.3s' },
                  })}
                />
              </MuiIconButton>
            </Box>
          </MuiTooltip>
        </Box>
      </Box>
    </NetworkSharingItemContainer>
  );
};

export default NetworkSharingUserItem;
