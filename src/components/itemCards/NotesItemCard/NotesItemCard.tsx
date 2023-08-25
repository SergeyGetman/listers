import React, { FC, memo, useCallback, useState } from 'react';
import Moment from 'moment';
import { Box, Typography, useTheme } from '@mui/material';
import Linkify from 'react-linkify';
import { useTranslation } from 'react-i18next';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import MuiTooltip from '../../MuiTooltip';
import MuiIconButton from '../../buttons/MuiIconButton';
import { NotesBodyContainer, NotesItemContainer, NotesTitle } from './NotesItem.style';
import { NotesItemModel } from '../../../shared/models/notes/notesItem.model';
import MuiPreloader from '../../MuiPreloader';
import UserInfoPopover from '../../popovers/UserInfoPopover';
import AvatarContainer from '../../avatars/AvatarContainer';

type NotesItemCardProps = {
  item: NotesItemModel;
  handleDeleteNotesItem?: (id: number, callback: (value: boolean) => void) => void;
  hasEditPermission: boolean;
  creatorId?: number;
  currentUserId?: number;
};

const NotesItemCard: FC<NotesItemCardProps> = ({
  item,
  handleDeleteNotesItem,
  hasEditPermission,
  creatorId = 228,
  currentUserId,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [isShowRemoveLoader, setIsShowRemoveLoader] = useState<boolean>(false);

  const handleDelete = useCallback(
    (id: number) => {
      if (handleDeleteNotesItem) {
        setIsShowRemoveLoader(true);
        handleDeleteNotesItem(id, setIsShowRemoveLoader);
      }
    },
    [handleDeleteNotesItem],
  );

  return (
    <NotesItemContainer>
      <Box sx={{ padding: '10px' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: '13px' }}>
          <UserInfoPopover item={item.creator} userId={currentUserId || creatorId}>
            <Box>
              <MuiTooltip title={t('general.tooltips.showMoreInfo')}>
                <Box>
                  <AvatarContainer
                    id={item?.creator?.id}
                    firstName={item?.creator?.first_name}
                    lastName={item?.creator?.last_name}
                    size="small"
                    isOwner={creatorId === item?.creator?.id}
                    src={
                      item?.creator?.avatar?.additional_info?.size_urls?.avatar_icon ||
                      item?.creator?.avatar?.url ||
                      ''
                    }
                  />
                </Box>
              </MuiTooltip>
            </Box>
          </UserInfoPopover>

          <Box sx={{ height: '31px', display: 'flex', alignItems: 'center', width: '100%' }}>
            <NotesTitle variant="default_bolt">{item?.title}</NotesTitle>
          </Box>
        </Box>

        <NotesBodyContainer>
          <Typography sx={{ wordBreak: 'break-word' }} variant="default">
            <Linkify
              componentDecorator={(decoratedHref, decoratedText, key) => (
                <a onClick={(e) => e.stopPropagation()} target="blank" href={decoratedHref} key={key}>
                  {decoratedText}
                </a>
              )}
            >
              {item?.body}
            </Linkify>
          </Typography>
        </NotesBodyContainer>

        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="small" sx={{ lineHeight: '21px' }}>
            {Moment.utc(item.updated_at, 'YYYY-MM-DD HH:mm:ss').local().format('dddd, Do MMMM, YYYY')}
          </Typography>
          {isShowRemoveLoader ? (
            <Box sx={{ height: '20px' }}>
              <MuiPreloader size="small" isShow />
            </Box>
          ) : (
            <Box>
              {(hasEditPermission || currentUserId === item?.creator?.id) && (
                <MuiTooltip title="Remove">
                  <Box className="notes-item-remove-btn" component="span" sx={{ height: '20px' }}>
                    <MuiIconButton onClick={() => handleDelete(item.id)} color="secondary" size="small">
                      <DeleteForeverOutlinedIcon
                        sx={{ '&:hover': { color: theme.palette.case.warning.high, transition: '0.3s' } }}
                      />
                    </MuiIconButton>
                  </Box>
                </MuiTooltip>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </NotesItemContainer>
  );
};

export default memo(NotesItemCard);
