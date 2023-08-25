import React, { FC, memo } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ItemUserModel } from '../../../../../../shared/models/itemUser.model';
import { PersonalContainerBlock } from './PersonContainer.style';
import MuiTooltip from '../../../../../MuiTooltip';
import UserInfoPopover from '../../../../../popovers/UserInfoPopover';
import AvatarContainer from '../../../../../avatars/AvatarContainer/AvatarContainer';

type PersonContainerProps = {
  user: ItemUserModel;
  creatorId: number;
  currentUserId: number;
};
const PersonContainer: FC<PersonContainerProps> = ({ user, creatorId, currentUserId }) => {
  const { t } = useTranslation();

  return (
    <PersonalContainerBlock>
      <UserInfoPopover item={user} userId={currentUserId}>
        <Box>
          <MuiTooltip title={t('general.tooltips.showMoreInfo')}>
            <Box>
              <AvatarContainer
                id={user?.id}
                firstName={user?.first_name}
                lastName={user?.last_name}
                size="small"
                isOwner={user?.id === creatorId}
                src={user?.avatar?.additional_info?.size_urls?.avatar_icon || user?.avatar?.url || ''}
              />
            </Box>
          </MuiTooltip>
        </Box>
      </UserInfoPopover>
      <Typography sx={{ ml: '5px', mr: '5px', flexShrink: 0 }} variant="default">
        {user?.full_name}
      </Typography>
      <hr />
    </PersonalContainerBlock>
  );
};

export default memo(PersonContainer);
