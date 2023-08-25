import React, { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';

import ViewDescriptionContainer from '../../../../viewContainers/ViewDescriptionContainer';
import EventModalStatusContainer from '../../../../plannerItemStatuses/EventModalStatusContainer';
import PlannerItemModalHeader from '../../../../headers/PlannerItemModalHeader';
import RowWithTitleContainer from '../../../../containers/RowWithTitleContainer';
import DateTimeView from '../../../../formElements/DateTimeView';
import MuiAvatarGroup from '../../../../avatars/MuiAvatarGroup';
import MuiPhoneNumberInputView from '../../../../formElements/MuiPhoneNumberInputView/MuiPhoneNumberInputView';
import LocationView from '../../../../locations/LocationView';
import CopyButton from '../../../../buttons/CopyButton';
import ModalFooter from '../../../../modalsElements/containers/Footer/ModalFooter';
import ViewMeetingModalTabsContainer from './components/ViewMeetingModalTabsContainer';
import { MeetingModel } from '../../../../../shared/models/meeting/meeting.model';
import { PlannerItemStatusesEnum } from '../../../../../shared/enums/plannerItemStatuses.enum';
import { ActionMenuListModel } from '../../../../../shared/models/actionMenuList.model';
import { EventTypeEnum } from '../../../../../shared/enums/eventType.enum';
import { ReactComponent as InternetIcon } from '../../../../../assets/Images/internet-icon.svg';

type MainMeetingViewProps = {
  event: MeetingModel;
  isArchive: boolean;
  onClose: () => void;
  menuList: ActionMenuListModel;
  handleChangeStatus: ({
    selectedStatus,
    setIsLoading,
  }: {
    selectedStatus: PlannerItemStatusesEnum;
    setIsLoading?: (val: boolean) => void;
  }) => void;
  isFooterButton?: boolean;
  isDeclineLoading?: boolean;
  isAcceptLoading?: boolean;
  handleAccept?: () => void;
  handleDecline?: () => void;
};

const MainMeetingView: FC<MainMeetingViewProps> = ({
  event,
  handleChangeStatus,
  isArchive,
  onClose,
  menuList,
  isAcceptLoading,
  isDeclineLoading,
  handleDecline,
  handleAccept,
  isFooterButton,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isSmallDisplay = useMediaQuery(`${theme.breakpoints.down('sm')}`);
  const tags = event?.tags?.length > 0 ? event?.tags[0].name : null;

  return (
    <Box>
      <PlannerItemModalHeader
        title={event.title}
        onClose={onClose}
        tag={tags}
        isShowTag
        headerMenuList={menuList}
      />
      <Box sx={{ p: { xs: '0 16px', sm: '0 24px' }, overflowX: 'hidden', height: '100%' }}>
        <Box sx={{ mt: '24px' }}>
          <RowWithTitleContainer
            alignItems="flexStart"
            titlePadding={isSmallDisplay ? '4px' : ' 0 '}
            title="When"
          >
            <DateTimeView
              startDate={event.started_at}
              startTime={event.started_at}
              isShowReminder
              reminder={event.notify_before}
              isShowRecurring={event.is_recurring}
              recurringPattern={event.recurring_pattern}
              isAllDay={event.is_all_day}
            />
          </RowWithTitleContainer>
        </Box>
        <Box sx={{ mt: '24px' }}>
          <RowWithTitleContainer title="For">
            <MuiAvatarGroup
              maxItemView={4}
              size="small"
              isShowAddUserBtn={false}
              isContainOwnerInUsers
              handleConfirmSharePopup={() => true}
              users={event.users}
              onClickShare={() => true}
              owner={event.owner}
            />
          </RowWithTitleContainer>
        </Box>
        {event.type === EventTypeEnum.call && event.phone && (
          <Box sx={{ mt: '24px' }}>
            <RowWithTitleContainer alignItems="flexStart" isFlexWidth title="Type">
              {event.type === EventTypeEnum.call && event.phone && (
                <MuiPhoneNumberInputView isShowPhoneIcon content={event.phone} country={event.country} />
              )}
            </RowWithTitleContainer>
          </Box>
        )}
        {event.type === EventTypeEnum.online && event.site && (
          <Box sx={{ mt: '24px' }}>
            <RowWithTitleContainer alignItems="flexStart" isFlexWidth title="Type">
              {event.type === EventTypeEnum.online && event.site && (
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                  <InternetIcon />
                  <Typography
                    mr="12px"
                    ml="6px"
                    sx={{ a: { color: `${theme.palette.case.blue.b800} !important` } }}
                    noWrap
                    variant="t14r"
                  >
                    <a target="_blank" href={`${event.site}`} rel="noreferrer">
                      {event.site}
                    </a>
                  </Typography>
                  <CopyButton content={event.site} />
                </Box>
              )}
            </RowWithTitleContainer>
          </Box>
        )}
        {event.type === EventTypeEnum.in_person && event.location && (
          <Box sx={{ mt: '24px' }}>
            <RowWithTitleContainer alignItems="flexStart" isFlexWidth title="Type">
              {event.type === EventTypeEnum.in_person && event.location && (
                <LocationView isShowTypeIcon address={event.location.address} location={event.location.map} />
              )}
            </RowWithTitleContainer>
          </Box>
        )}

        {isSmallDisplay && (
          <Box mt="24px">
            <EventModalStatusContainer
              selectedStatus={event?.current_user?.status}
              isShowRequestLoading
              isArchive={isArchive}
              finished_at={event.finished_at ? event.finished_at : ''}
              handleChangeStatus={handleChangeStatus}
            />
          </Box>
        )}

        {event.description && (
          <Box sx={{ mt: '40px' }}>
            <ViewDescriptionContainer description={event.description} />
          </Box>
        )}
        <Box sx={{ width: '100%', mt: '24px', paddingBottom: '150px' }}>
          <ViewMeetingModalTabsContainer attachments={event.documents} entityId={event.id} />
        </Box>
      </Box>

      {isFooterButton && (
        <ModalFooter
          position="absolute"
          isBorderTop
          isShowBackGround
          middleBtnProps={{
            isShow: true,
            isLoadingBtn: true,
            loading: isDeclineLoading,
            label: t('general.buttons.decline'),
            variant: 'outlined',
            onClick: handleDecline,
            isStopPropagation: false,
            type: 'button',
          }}
          rightBtnProps={{
            isShow: true,
            isLoadingBtn: true,
            loading: isAcceptLoading,
            label: t('general.buttons.accept'),
            variant: 'contained',
            isStopPropagation: false,
            onClick: handleAccept,
          }}
        />
      )}
    </Box>
  );
};

export default MainMeetingView;
