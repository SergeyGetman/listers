import React, { useCallback, useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, Collapse, Skeleton, useTheme } from '@mui/material';
import { VirtuosoGrid } from 'react-virtuoso';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setBreadcrumbs } from '../../store/Common/commonThunk';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';
import BacklogNavigationPanel from './components/BacklogNavigationPanel';
import { BacklogContainer, BacklogItemContainer } from './Backlog.style';
import { getBacklogItems } from '../../store/backlog/backlogThunk';
import BacklogCard from './components/BacklogCard';
import CircularButton from '../../components/buttons/CilrcularButton';
import { ModalNamesEnum } from '../../shared/enums/modalNames.enum';
import { getConnections } from '../../store/Profile/profile.actions';
import { plannerItemPriorityConfig } from '../../shared/configs/plannerItemPriority.config';
import { resetBacklogData } from '../../store/backlog/backlogSlice';
import { AddBottomButtonContainer } from '../../shared/styles/AddBottomButtonContainer';
import Stub from '../../components/stubs/Stub';
import { backlogNoItemStubConfig, noFilterMatchStubConfig } from '../../shared/configs/stub.config';
import { PageStubContainer } from '../../shared/styles/StubContainer';
import WelcomeStub from '../../components/stubs/WelcomeStub';
import { backlogWelcomePageStubConfig } from '../../shared/configs/welcomePageStubs/backlogWelcomePageStub.config';
import modalObserver from '../../shared/utils/observers/modalObserver';

const Backlog = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [isOpenEditMode, setIsOpenEditMode] = useState<boolean>(false);
  const {
    isShowBacklogNavigationPanel,
    isFetchingInitialData,
    backlogData,
    isListOver,
    filters,
    isFetchingWithFilter,
  } = useAppSelector(({ backlog }) => backlog);
  const skeletonArr = Array(12).fill({ name: '' });
  const isMobileDisplay = useMediaQuery(`${theme.breakpoints.down('sm')}`);
  const isOpenRightSidebar = useAppSelector(({ rightSidebar }) => rightSidebar.isOpenRightSidebar);

  const [searchParams, setSearchParams] = useSearchParams();

  const profileData = useAppSelector(({ profile }) => profile?.data);

  useEffect(() => {
    dispatch(setBreadcrumbs([{ title: t('general.breadcrumbs.backlog') }]));
  }, [dispatch, t]);

  useEffect(() => {
    dispatch(getConnections());
  }, [dispatch]);

  const taskId = searchParams.get('taskId');

  useEffect(() => {
    if (taskId) {
      modalObserver.addModal(ModalNamesEnum.viewTaskModal, {
        props: { taskId: taskId, isOpenEditMode },
      });
    }
  }, [taskId, dispatch, isOpenEditMode]);

  useEffect(() => {
    dispatch(
      getBacklogItems({
        page: 1,
        ...filters,
        priorities: filters.priorities
          ? filters.priorities.map((item: string) => (plannerItemPriorityConfig.none.id === item ? '' : item))
          : null,
      }),
    );
    return () => {
      dispatch(resetBacklogData());
    };
  }, [dispatch, filters]);

  const fetchMoreData = () => {
    if (!isListOver) {
      dispatch(
        getBacklogItems({
          page: backlogData.meta.current_page + 1,
          ...filters,
          priorities: filters.priorities
            ? filters.priorities.map((item: string) =>
                plannerItemPriorityConfig.none.id === item ? '' : item,
              )
            : null,
        }),
      );
    }
  };

  const handleOpenCreateTaskModal = () => {
    modalObserver.addModal(ModalNamesEnum.createTaskModal, {
      props: {
        isBacklog: true,
      },
    });
  };

  const handleOpenViwTaskModal = useCallback(
    (id: number, editMode?: boolean) => {
      setSearchParams({ taskId: id.toString() });
      setIsOpenEditMode(editMode ? editMode : false);
    },
    [setSearchParams],
  );

  if (profileData?.view_data.is_view_backlog === false) {
    return (
      <PageStubContainer isWelcomeSlider>
        <WelcomeStub sliderOptions={backlogWelcomePageStubConfig} />
      </PageStubContainer>
    );
  }

  return (
    <BacklogContainer>
      <Box>
        <Collapse in={isShowBacklogNavigationPanel}>
          <BacklogNavigationPanel
            isData={!!backlogData?.data?.length || !isFetchingInitialData}
            filters={filters}
          />
        </Collapse>
      </Box>

      {isFetchingInitialData ? (
        <>
          {backlogData?.data?.length ? (
            <VirtuosoGrid
              style={{ height: '100%', scrollbarWidth: 'none' }}
              totalCount={
                isListOver
                  ? backlogData?.data?.length
                  : backlogData?.data?.length
                  ? backlogData.data.length + 4
                  : 0
              }
              overscan={1000}
              endReached={() => fetchMoreData()}
              listClassName="backlog-list"
              components={{
                Item: BacklogItemContainer,
                ScrollSeekPlaceholder: () => (
                  <BacklogItemContainer>
                    <Skeleton variant="rectangular" height="100%" width="100%" />
                  </BacklogItemContainer>
                ),
              }}
              itemContent={(index) => {
                if (index < backlogData?.data?.length) {
                  return (
                    <BacklogCard
                      handleOpenViwTaskModal={handleOpenViwTaskModal}
                      key={index}
                      isShowDescription={!isMobileDisplay}
                      data={backlogData?.data[index]}
                    />
                  );
                }
                return <Skeleton variant="rectangular" height="100%" width="100%" />;
              }}
            />
          ) : (
            <>
              {isFetchingWithFilter ? (
                <PageStubContainer isNoFilterMatch>
                  <Stub isBoltSubtitleText={false} value={noFilterMatchStubConfig} />
                </PageStubContainer>
              ) : (
                <PageStubContainer>
                  <Stub value={backlogNoItemStubConfig} />
                </PageStubContainer>
              )}
            </>
          )}
        </>
      ) : (
        <Box className="backlog-list">
          {skeletonArr.map((_, index) => (
            <BacklogItemContainer key={index}>
              <Skeleton sx={{ borderRadius: '5px' }} variant="rectangular" height="100%" width="100%" />
            </BacklogItemContainer>
          ))}
        </Box>
      )}

      <AddBottomButtonContainer isOpenRightSidebar={isOpenRightSidebar}>
        <CircularButton size="large" onClick={handleOpenCreateTaskModal} />
      </AddBottomButtonContainer>
    </BacklogContainer>
  );
};

export default Backlog;
