import { Box, Typography, useTheme } from '@mui/material';
import React, { FC, memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import useMediaQuery from '@mui/material/useMediaQuery';
import MuiAvatar from '../../../../../../../avatars/MuiAvatart/MuiAvatar';
import BaseActionMenu from '../../../../../../../actionMenus/BaseActionMenu';
import { MenuButtonContainer } from '../../RightSidebarNotifications.style';
import {
  NotificationNewsCardContainer,
  NotificationNewsCardDescriptionContainer,
  NotificationNewsCardRightBlock,
  NotificationNewsCardWrapper,
} from './NotificationNewsCard.style';
import { NotificationsTypesEnum } from '../../../../../../../../shared/enums/notificationsEnum';
import { NewsItemDataModal } from '../../../../../../../../shared/models/notifications/news/newsItem.model';

type Props = {
  newsDescription: string;
  newsData: string;
  isViewed?: boolean;
  viewNews: () => void;
  removeNews: () => void;
  newsLink: string;
  entityType: string;
  globalStatus: string;
  type: string;
  handleClickOnCard: () => void;
  data: NewsItemDataModal;

  user: {
    firstName: string;
    id: number;
    lastName: string;
    src?: string;
  };
};

// TODO storybook
const NotificationNewsCard: FC<Props> = ({
  newsDescription,
  newsData,
  removeNews,
  globalStatus,
  user,
  data,
  isViewed = false,
  viewNews,
  type,
  entityType,
  newsLink,
  handleClickOnCard,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const [isHover, setIsHover] = useState<boolean>(false);
  const isSmallDisplay = useMediaQuery(theme.breakpoints.down('sm'));

  const CONFIG_NEW = {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    ss: '%ss',
    m: 'a min',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: 'a day',
    dd: '%dd',
    M: 'month',
    MM: '%dM',
    y: 'year',
    yy: '%dY',
  };

  const formattedTime = moment.utc(newsData).fromNow();
  moment.updateLocale('en', { relativeTime: CONFIG_NEW });

  const renderActionMenu = useCallback(() => {
    return (
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <MenuButtonContainer isHover={isHover}>
          <BaseActionMenu
            menuList={[
              {
                callback: () => {
                  viewNews();
                },
                isDisabled: isViewed,
                label: t('general.actionMenus.markAsRead'),
              },
              {
                callback: () => {
                  removeNews();
                },
                isDisabled: false,
                label: t('general.actionMenus.remove'),
              },
            ]}
          />
        </MenuButtonContainer>
      </Box>
    );
  }, [isHover, isViewed, removeNews, t, viewNews]);

  const changeHoverState = useCallback((state: boolean) => {
    setIsHover(state);
  }, []);

  return (
    <NotificationNewsCardWrapper
      onMouseEnter={() => {
        changeHoverState(true);
      }}
      onMouseLeave={() => {
        changeHoverState(false);
      }}
      onClick={() => {
        handleClickOnCard();
      }}
    >
      <NotificationNewsCardContainer to={newsLink} isDefaultPointer={type === 'deleted_account' && isViewed}>
        <Box sx={{ marginRight: '8px' }}>
          <MuiAvatar
            firstName={user.firstName}
            isOwner={data?.owner_id === user.id}
            id={user.id}
            lastName={user.lastName}
            src={user.src}
            size="medium"
            variant="circular"
            hubIcon={
              globalStatus === NotificationsTypesEnum.backlog
                ? NotificationsTypesEnum.backlog
                : (entityType as NotificationsTypesEnum)
            }
          />
        </Box>
        <NotificationNewsCardDescriptionContainer>
          <Typography
            dangerouslySetInnerHTML={{ __html: newsDescription }}
            sx={{
              wordBreak: 'break-word',
              color: isViewed ? theme.palette.case.neutral.n500 : 'initial',
              lineHeight: '21px',
            }}
            variant="default"
          />
          <Typography
            sx={{ color: theme.palette.case.neutral.n500, paddingTop: '2px' }}
            variant="extra_small"
          >
            {formattedTime}
          </Typography>
        </NotificationNewsCardDescriptionContainer>
        <NotificationNewsCardRightBlock>
          {isSmallDisplay ? renderActionMenu() : isHover && renderActionMenu()}
        </NotificationNewsCardRightBlock>
      </NotificationNewsCardContainer>
    </NotificationNewsCardWrapper>
  );
};

export default memo(NotificationNewsCard);
