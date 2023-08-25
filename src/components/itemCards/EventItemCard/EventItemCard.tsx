import React, { FC, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Moment from 'moment';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { EventItemModel } from '../../../shared/models/event/eventItem.model';
import { EventItemCardContainer } from './EventItemCard.style';
import PlannerItemStatusesView from '../../plannerItemStatuses/PlannerItemStatusesView';
import MuiBaseInputView from '../../formElements/MuiBaseInputView';
import { RecurringTypeConfig } from '../../../shared/configs/selectors/recurringType.config';
import MuiAvatarGroup from '../../avatars/MuiAvatarGroup';
import AdditionalInfo from '../../AdditionalInfo';
import { AssignPeoplePermissionsEnum } from '../../../shared/enums/assignPeoplePermissions.enum';
import PlannerItemsInfoContainer from '../../viewContainers/PlannerItemsInfoContainer';
import { useAppSelector } from '../../../shared/hooks/redux';
import { PackageEnum } from '../../../shared/enums/package.enum';

type EventItemCardProps = {
  event: EventItemModel;
  isArchive?: boolean;
  handleOpenViwEventModal: (id: number, isEdit?: boolean) => void;
};

const EventItemCard: FC<EventItemCardProps> = ({ event, handleOpenViwEventModal, isArchive }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isTabletDisplay = useMediaQuery(theme.breakpoints.up('sm'));
  const profileData = useAppSelector(({ profile }) => profile);
  const isStarterPackage = useMemo(() => {
    return (
      profileData?.data?.subscription?.package === PackageEnum.starter ||
      !profileData?.data?.subscription?.package
    );
  }, [profileData?.data?.subscription?.package]);
  const isEditor = useMemo(() => {
    return event.current_user.role !== AssignPeoplePermissionsEnum.viewer;
  }, [event.current_user.role]);
  return (
    <EventItemCardContainer onClick={() => handleOpenViwEventModal(event.id)}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Typography noWrap variant="default_bolt">
            {event.title}
          </Typography>
        </Box>
        <Box>
          <PlannerItemStatusesView
            size="small"
            variant={event.current_user.status ? event.current_user.status : event.status}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: '16px' }}>
        <Box sx={{ width: '86px' }}>
          <MuiBaseInputView
            content={
              event.started_at
                ? Moment.utc(event.started_at, 'YYYY-MM-DD HH:mm:ss').local().format('MM/DD/YYYY')
                : 'N/A'
            }
            label={t('general.fieldNames.starts')}
          />
        </Box>
        <Box sx={{ width: '86px' }}>
          <MuiBaseInputView
            label={t('general.fieldNames.time')}
            content={
              event.started_at && !event.is_all_day
                ? Moment.utc(event.started_at, 'YYYY-MM-DD HH:mm:ss').local().format('hh:mm A')
                : 'HH:MM'
            }
          />
        </Box>
        <Box sx={{ width: '86px' }}>
          <MuiBaseInputView
            content={
              event.is_recurring
                ? RecurringTypeConfig[event.recurring_pattern.recurring_type || ''].label
                : 'N/A'
            }
            label={t('general.fieldNames.repeat')}
          />
        </Box>
      </Box>

      {isTabletDisplay && (
        <Box sx={{ marginTop: '16px' }}>
          <PlannerItemsInfoContainer
            modelType={event?.model_type}
            site={event?.site}
            description={event?.description}
            location={event?.location?.map}
            address={event?.location?.address}
            phone={event?.phone}
          />
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
        <Box sx={{ width: '50%', borderRight: `1px dashed ${theme.palette.case.neutral.n400}` }}>
          <MuiAvatarGroup
            isShowAddUserBtn={!isArchive && isEditor && !isStarterPackage}
            onClickShare={() => handleOpenViwEventModal(event.id, true)}
            isContainOwnerInUsers={false}
            users={event?.users}
            owner={event.owner}
          />
        </Box>

        <AdditionalInfo
          document_count={event.document_count}
          is_unread_documents={event.current_user.is_unread_documents}
          photo_count={event.photo_count}
          comment_count={event.comment_count}
          is_unread_comments={event.current_user.is_unread_comments}
          is_unread_photos={event.current_user.is_unread_photos}
        />
      </Box>
    </EventItemCardContainer>
  );
};

export default memo(EventItemCard);
