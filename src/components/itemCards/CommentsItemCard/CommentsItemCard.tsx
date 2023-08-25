import React, { FC, memo, useCallback, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Moment from 'moment';
import Linkify from 'react-linkify';
import { useTranslation } from 'react-i18next';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import { CommentsItemModel } from '../../../shared/models/comments/commentsItem.model';
import MuiTooltip from '../../MuiTooltip';
import MuiIconButton from '../../buttons/MuiIconButton';
import MuiPreloader from '../../MuiPreloader';
import FileView from '../../FilePreView';
import UserInfoPopover from '../../popovers/UserInfoPopover';
import { CommentsItemCardContainer, CommentsItemCardMainInfo } from './CommentsItemCard.style';
import AvatarContainer from '../../avatars/AvatarContainer';
import { DocumentsEntityTypeEnum } from '../../../shared/enums/documentEntityType.enum';

type CommentsItemCardProps = {
  item: CommentsItemModel;
  hasEditPermission: boolean;
  creatorId: number;
  currentUserId: number;
  handleDeleteItem: (id: number, callback: (value: boolean) => void) => void;
};
const CommentsItemCard: FC<CommentsItemCardProps> = ({
  item,
  hasEditPermission,
  creatorId,
  handleDeleteItem,
  currentUserId,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const [isShowRemoveLoader, setIsShowRemoveLoader] = useState<boolean>(false);

  const handleDelete = useCallback(
    (id: number) => {
      if (handleDeleteItem) {
        setIsShowRemoveLoader(true);
        handleDeleteItem(id, setIsShowRemoveLoader);
      }
    },
    [handleDeleteItem],
  );

  return (
    <CommentsItemCardContainer>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          p: '0 10px',
          flexShrink: 0,
        }}
      >
        <Box sx={{ mb: '2px' }}>
          <UserInfoPopover item={item.user} userId={currentUserId}>
            <Box>
              <MuiTooltip title={t('general.tooltips.showMoreInfo')}>
                <Box>
                  <AvatarContainer
                    id={item?.user?.id}
                    firstName={item?.user?.first_name}
                    lastName={item.user.last_name}
                    size="small"
                    isOwner={creatorId === item?.user?.id}
                    src={
                      item?.user?.avatar?.additional_info?.size_urls?.avatar_icon ||
                      item?.user?.avatar?.url ||
                      ''
                    }
                  />
                </Box>
              </MuiTooltip>
            </Box>
          </UserInfoPopover>
        </Box>
        <Typography variant="extra_small">
          {Moment.utc(item.created_at).local().format('MM/DD/YY')}
        </Typography>
        <Typography sx={{ color: theme.palette.case.neutral.n400 }} variant="extra_small">
          {Moment.utc(item.created_at, 'YYYY-MM-DD HH:mm:ss').local().format('hh:mm A')}
        </Typography>
      </Box>

      <CommentsItemCardMainInfo>
        <Box sx={{ display: 'flex', flexDirection: 'column', pl: '10px', width: '100%' }}>
          <Box sx={{ display: 'flex', align: 'center', width: '100%', justifyContent: 'space-between' }}>
            <Typography sx={{ color: theme.palette.case.neutral.n500, mb: '3px' }} variant="small_bolt">
              {item?.user?.full_name}
            </Typography>

            {isShowRemoveLoader ? (
              <Box sx={{ height: '20px' }}>
                <MuiPreloader size="small" isShow />
              </Box>
            ) : (
              <Box>
                {(hasEditPermission || currentUserId === item?.user?.id) && (
                  <MuiTooltip title="Remove">
                    <Box className="comments-item-remove-btn" component="span" sx={{ height: '20px' }}>
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

          <Typography
            sx={{ whiteSpace: 'pre-wrap', wordWrap: 'wrap', wordBreak: 'break-word' }}
            variant="default"
          >
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

          {!!item.documents.length && (
            <Box
              sx={{
                paddingTop: '20px',
              }}
            >
              <FileView
                files={item.documents}
                entityType={DocumentsEntityTypeEnum.comment_document}
                permission={{ isDelete: false, isDownload: true, isUpdate: false }}
              />
            </Box>
          )}
        </Box>
      </CommentsItemCardMainInfo>
    </CommentsItemCardContainer>
  );
};

export default memo(CommentsItemCard);
