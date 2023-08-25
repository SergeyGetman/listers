import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { PlannerItemStatusesEnum } from '../../../../../../shared/enums/plannerItemStatuses.enum';
import CircularButton from '../../../../../../components/buttons/CilrcularButton';
import {
  RoadmapKanbanColumnNoItemsStubContainer,
  RoadmapKanbanColumnNoItemsStubSubTitle,
  RoadmapKanbanColumnNoItemsStubTitle,
} from './RoadmapKanbanColumnNoItemsStub.style';
import PlannerItemStatusesView from '../../../../../../components/plannerItemStatuses/PlannerItemStatusesView';
import { ModalNamesEnum } from '../../../../../../shared/enums/modalNames.enum';
import modalObserver from '../../../../../../shared/utils/observers/modalObserver';

type RoadmapKanbanColumnNoItemsStubType = {
  type: PlannerItemStatusesEnum.todo | PlannerItemStatusesEnum.in_progress | PlannerItemStatusesEnum.done;
};
const RoadmapKanbanColumnNoItemsStub: FC<RoadmapKanbanColumnNoItemsStubType> = ({ type }) => {
  const { t } = useTranslation();

  const handleOpenCreateTaskModal = () => {
    modalObserver.addModal(ModalNamesEnum.createTaskModal, {});
  };

  const getStubContent = useMemo(() => {
    switch (type) {
      case PlannerItemStatusesEnum.todo: {
        return (
          <>
            <CircularButton size="medium" onClick={() => handleOpenCreateTaskModal()} />
            <RoadmapKanbanColumnNoItemsStubTitle align="center" variant="small_bolt">
              {t('roadmap.roadmapKanbanColumnNoItemsStub.todo.title')}
            </RoadmapKanbanColumnNoItemsStubTitle>
            <RoadmapKanbanColumnNoItemsStubSubTitle align="center" variant="default">
              {t('roadmap.roadmapKanbanColumnNoItemsStub.todo.description')}
            </RoadmapKanbanColumnNoItemsStubSubTitle>
          </>
        );
      }
      case PlannerItemStatusesEnum.in_progress: {
        return (
          <>
            <PlannerItemStatusesView variant={type} size="small" />
            <RoadmapKanbanColumnNoItemsStubTitle align="center" variant="small_bolt">
              {t('roadmap.roadmapKanbanColumnNoItemsStub.inProgress.title')}
            </RoadmapKanbanColumnNoItemsStubTitle>
            <RoadmapKanbanColumnNoItemsStubSubTitle align="center" variant="default">
              {t('roadmap.roadmapKanbanColumnNoItemsStub.inProgress.description')}
            </RoadmapKanbanColumnNoItemsStubSubTitle>
          </>
        );
      }
      case PlannerItemStatusesEnum.done: {
        return (
          <>
            <PlannerItemStatusesView variant={type} size="small" />
            <RoadmapKanbanColumnNoItemsStubTitle align="center" variant="small_bolt">
              {t('roadmap.roadmapKanbanColumnNoItemsStub.done.title')}
            </RoadmapKanbanColumnNoItemsStubTitle>
            <RoadmapKanbanColumnNoItemsStubSubTitle align="center" variant="default">
              {t('roadmap.roadmapKanbanColumnNoItemsStub.done.description')}
            </RoadmapKanbanColumnNoItemsStubSubTitle>
          </>
        );
      }
      default: {
        return <Box />;
      }
    }
  }, [type, t]);

  return <RoadmapKanbanColumnNoItemsStubContainer>{getStubContent}</RoadmapKanbanColumnNoItemsStubContainer>;
};

export default RoadmapKanbanColumnNoItemsStub;
