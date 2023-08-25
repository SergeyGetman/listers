/* eslint-disable no-console */

import React, { FC } from 'react';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Moment from 'moment';
import { TodoItemModel } from '../../../../../shared/models/todo/todoItemModel';
import { useAppSelector } from '../../../../../shared/hooks/redux';
import ViewDescriptionContainer from '../../../../viewContainers/ViewDescriptionContainer';
import GalleryContainer from '../../../../viewContainers/GalleryContainer';
import DocumentsContainer from '../../../../viewContainers/DocumentsContainer';
import MuiDotAccordion from '../../../../accordions/MuiDotAccordion';
import EventViewAssignPeople from '../../../../assignPeople/EventViewAssignPeople';
import MuiBaseInputView from '../../../../formElements/MuiBaseInputView';
import ModalFooter from '../../../../modalsElements/containers/Footer/ModalFooter';

type MainTodoViewProps = {
  item: TodoItemModel;
  isFooterButton?: boolean;
  isDeclineLoading?: boolean;
  isAcceptLoading?: boolean;
  handleAccept?: () => void;
  handleDecline?: () => void;
};
const MainTodoView: FC<MainTodoViewProps> = ({
  item,
  isFooterButton,
  isDeclineLoading,
  isAcceptLoading,
  handleAccept,
  handleDecline,
}) => {
  const { t } = useTranslation();
  const { data } = useAppSelector(({ profile }) => profile);

  return (
    <Box>
      <Box sx={{ mt: '30px' }}>
        <MuiDotAccordion label={t('general.containers.period')} isDisabledExpand isDefaultExpand>
          <Grid container>
            <Grid item lg={6} xs={12}>
              <MuiBaseInputView
                isLate={item?.current_user?.is_late}
                label={t('general.fieldNames.dueDate')}
                content={
                  item.due_dated_at
                    ? Moment.utc(item.due_dated_at, 'YYYY-MM-DD HH:mm:ss').local().format('MM/DD/YYYY')
                    : 'N/A'
                }
              />
            </Grid>
          </Grid>
        </MuiDotAccordion>
      </Box>
      {item.description && (
        <Box sx={{ mt: '30px' }}>
          <ViewDescriptionContainer description={item.description} />
        </Box>
      )}

      {!!item.photos.length && (
        <Box sx={{ mt: '30px' }}>
          <GalleryContainer
            isCanAddMedia={false}
            gallery={item.photos}
            onAddMedia={() => () => console.log('')}
            permission={{ isDelete: false, isDownload: true, isUpdate: false }}
          />
        </Box>
      )}
      {!!item.documents.length && (
        <Box sx={{ mt: '30px' }}>
          <DocumentsContainer
            isCanAddMedia={false}
            files={item.documents}
            onAddMedia={() => console.log('')}
            permission={{ isDelete: false, isDownload: true, isUpdate: false }}
          />
        </Box>
      )}
      {item.owner && (
        <Box sx={{ mt: '30px', pb: '150px' }}>
          <MuiDotAccordion label={t('general.containers.sharing')} isDefaultExpand>
            <EventViewAssignPeople
              isShowStatuses={false}
              owner={item.owner}
              currentUserId={data.id}
              users={item.users}
            />
          </MuiDotAccordion>
        </Box>
      )}
      {isFooterButton && (
        <ModalFooter
          position="absolute"
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

export default MainTodoView;
