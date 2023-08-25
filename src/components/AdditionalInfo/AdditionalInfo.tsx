import React, { FC, memo } from 'react';
import { Typography } from '@mui/material';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CommentIcon from '@mui/icons-material/Comment';
import { AdditionalInfoContainer, AdditionalInfoItem } from './AdditionalInfo.style';

type AdditionalInfoProps = {
  document_count?: number;
  is_unread_documents?: boolean;
  photo_count?: number;
  is_unread_photos?: boolean;
  comment_count?: number;
  is_unread_comments?: boolean;
  isShowComments?: boolean;
};
const AdditionalInfo: FC<AdditionalInfoProps> = ({
  document_count,
  is_unread_documents,
  photo_count,
  is_unread_photos,
  comment_count,
  is_unread_comments,
  isShowComments = true,
}) => {
  return (
    <AdditionalInfoContainer>
      <AdditionalInfoItem isUnread={is_unread_documents}>
        <TextSnippetIcon />
        <Typography variant="label">{document_count}</Typography>
      </AdditionalInfoItem>

      <AdditionalInfoItem isUnread={is_unread_photos}>
        <PhotoCameraIcon />
        <Typography variant="label">{photo_count}</Typography>
      </AdditionalInfoItem>
      {isShowComments && (
        <AdditionalInfoItem isUnread={is_unread_comments}>
          <CommentIcon />
          <Typography variant="label">{comment_count}</Typography>
        </AdditionalInfoItem>
      )}
    </AdditionalInfoContainer>
  );
};

export default memo(AdditionalInfo);
