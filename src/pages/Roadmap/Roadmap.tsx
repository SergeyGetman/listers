import React, { useCallback, useEffect, useState } from 'react';
import { Box, Collapse } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';
import { setBreadcrumbs } from '../../store/Common/commonThunk';
import RoadmapNavigationPanel from './components/RoadmapNavigationPanel';
import { RoadmapContainer } from './Roadmap.style';
import RoadmapKanbanBoard from './components/RoadmapKanbanBoard';
import { getConnections } from '../../store/Profile/profile.actions';
import CircularButton from '../../components/buttons/CilrcularButton';
import { ModalNamesEnum } from '../../shared/enums/modalNames.enum';
import { setRoadmapIsLargeDisplay } from '../../store/roadmap/roadmapSlice';
import RoadmapCardView from './components/RoadmapCardView';
import { AddBottomButtonContainer } from '../../shared/styles/AddBottomButtonContainer';
import { PageStubContainer } from '../../shared/styles/StubContainer';
import WelcomeStub from '../../components/stubs/WelcomeStub';
import { roadmapWelcomePageStubConfig } from '../../shared/configs/welcomePageStubs/roadmapWelcomePageStub.config';
import modalObserver from '../../shared/utils/observers/modalObserver';

const Roadmap = () => {
  const { t } = useTranslation();
  const { isShowRoadmapNavigationPanel } = useAppSelector(({ roadmap }) => roadmap);
  const { filters } = useAppSelector(({ roadmap }) => roadmap);
  const isLargeDisplay = useMediaQuery('(min-width:1381px)');
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpenEditMode, setIsOpenEditMode] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const profileData = useAppSelector(({ profile }) => profile?.data);
  const isOpenRightSidebar = useAppSelector(({ rightSidebar }) => rightSidebar.isOpenRightSidebar);

  useEffect(() => {
    dispatch(getConnections());
  }, [dispatch]);
  useEffect(() => {
    dispatch(setBreadcrumbs([{ title: t('general.breadcrumbs.roadmap') }]));
  }, [dispatch, t]);

  useEffect(() => {
    dispatch(setRoadmapIsLargeDisplay(isLargeDisplay));
  }, [dispatch, isLargeDisplay]);

  const handleOpenCreateTaskModal = () => {
    modalObserver.addModal(ModalNamesEnum.createTaskModal, {});
  };

  const taskId = searchParams.get('taskId');

  useEffect(() => {
    if (taskId) {
      modalObserver.addModal(ModalNamesEnum.viewTaskModal, {
        props: { taskId: taskId, isOpenEditMode },
      });
    }
  }, [taskId, isOpenEditMode]);

  const handleOpenViwTaskModal = useCallback(
    (id: number, editMode?: boolean) => {
      setSearchParams({ taskId: id.toString() });
      setIsOpenEditMode(editMode ? editMode : false);
    },
    [setSearchParams],
  );

  if (profileData?.view_data.is_view_tasks === false) {
    return (
      <PageStubContainer isWelcomeSlider>
        <WelcomeStub sliderOptions={roadmapWelcomePageStubConfig} />
      </PageStubContainer>
    );
  }

  return (
    <RoadmapContainer>
      <Box sx={{ mb: { xs: '20px', sm: '10px', md: '20px' } }}>
        <Collapse in={isShowRoadmapNavigationPanel}>
          <RoadmapNavigationPanel isLargeDisplay={isLargeDisplay} filters={filters} />
        </Collapse>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {isLargeDisplay ? (
          <RoadmapKanbanBoard handleOpenViwTaskModal={handleOpenViwTaskModal} filters={filters} />
        ) : (
          <RoadmapCardView handleOpenViwTaskModal={handleOpenViwTaskModal} filters={filters} />
        )}
      </Box>

      <AddBottomButtonContainer isOpenRightSidebar={isOpenRightSidebar}>
        <CircularButton size="large" onClick={handleOpenCreateTaskModal} />
      </AddBottomButtonContainer>
    </RoadmapContainer>
  );
};

export default Roadmap;
