import React, { FC, useState } from 'react';
import { Box, Collapse, Typography, useMediaQuery, useTheme } from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import { useTranslation } from 'react-i18next';
import MuiIconButton from '../../../../buttons/MuiIconButton';
import UserInfoPopover from '../../../../popovers/UserInfoPopover';
import { AssignPeopleChatModel } from '../../../../../shared/models/assignPeopleSelectValue.model';
import CircleIconButton from '../../../../buttons/CircleIconButton';
import { ChatAssignUserItemContainer } from './ChatAssignUserItem.style';
import AvatarContainer from '../../../../avatars/AvatarContainer';
import MuiTooltip from '../../../../MuiTooltip';

type Props = {
  user: AssignPeopleChatModel;
  profileId: number;
  handleOpenChat: (id: number) => void;
  handleDeleteUser: (id: number, name?: string) => void;
  permissionType: 'edit' | 'view';
  threadId: number | null;
  handleLeave: () => void;
};

const ChatAssignUserItem: FC<Props> = ({
  user,
  profileId,
  handleOpenChat,
  handleDeleteUser,
  permissionType,
  threadId,
  handleLeave,
}) => {
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down('sm'));
  const [hovered, setHovered] = useState(match);
  const { t } = useTranslation();

  return (
    <ChatAssignUserItemContainer
      hovered={match ? false : hovered}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(match)}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <UserInfoPopover item={user} userId={profileId}>
          <AvatarContainer
            firstName={user.first_name}
            id={user.id}
            lastName={user.last_name}
            src={user.avatar?.additional_info?.size_urls?.avatar_icon || user.avatar?.url || ''}
            isOwner={user.isOwner}
          />
        </UserInfoPopover>

        <Typography sx={{ ml: '5px' }} variant="default">
          {user.full_name}
        </Typography>
      </Box>

      <Box
        sx={{
          pr: '5px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {user.id !== profileId && user.connection_role !== null && threadId !== null && (
          <CircleIconButton
            onClick={() => handleOpenChat(user?.chat_id || 0)}
            colorIconBtn={theme.palette.case.main.gey.middle}
            label={t('general.buttons.sentMessage')}
            isShowText={hovered}
            icon={<InsertCommentIcon />}
          />
        )}

        <Collapse in={hovered} orientation="horizontal">
          {user.id === profileId ? (
            threadId === null ? null : (
              <MuiTooltip title={t('general.tooltips.removeYourself')}>
                <Box>
                  <MuiIconButton onClick={handleLeave} color="secondary" size="small">
                    <DeleteForeverOutlinedIcon
                      sx={{
                        '&:hover': { color: theme.palette.case.warning.high, transition: '0.3s' },
                      }}
                    />
                  </MuiIconButton>
                </Box>
              </MuiTooltip>
            )
          ) : permissionType === 'edit' ? (
            <MuiTooltip title={t('general.tooltips.remove')}>
              <Box>
                <MuiIconButton
                  onClick={() => {
                    handleDeleteUser(user.id, user.full_name);
                  }}
                  color="secondary"
                  size="small"
                >
                  <DeleteForeverOutlinedIcon
                    sx={{
                      '&:hover': { color: theme.palette.case.warning.high, transition: '0.3s' },
                    }}
                  />
                </MuiIconButton>
              </Box>
            </MuiTooltip>
          ) : null}
        </Collapse>
      </Box>
    </ChatAssignUserItemContainer>
  );
};

export default ChatAssignUserItem;
