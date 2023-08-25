import { FC, memo, useCallback, useEffect, useState } from 'react';
import { Box, Collapse } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import useMediaQuery from '@mui/material/useMediaQuery';
import { TransitionGroup } from 'react-transition-group';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux';
import { createNotesItem, deleteNotesItem, getNotes } from '../../../../store/notes/notesThunk';
import NotesItemCard from '../../../itemCards/NotesItemCard';
import { NotesItemModel } from '../../../../shared/models/notes/notesItem.model';
import NotesForm from '../../../forms/NotesForm';
import { NotesFormPayloadModel } from '../../../../shared/models/notes/notesFormPayload.model';
import { addNotesItem, removeNotesItem, resetNotesData } from '../../../../store/notes/notesSlice';
import {
  PlannerItemModalNotesItemContainer,
  PlannerItemModalNotesScrollableBlock,
  PlannerItemModalSkeletonBlock,
} from './PlannerItemModalNotes.style';
import NotesSkeletonBlock from './components/NotesSkeletonBlock';

type PlannerItemModalNotesProps = {
  entityId: number;
  isEditor: boolean;
  creatorId: number;
  currentUserId?: number;
  isArchive?: boolean;
};
const PlannerItemModalNotes: FC<PlannerItemModalNotesProps> = ({
  entityId,
  isEditor,
  creatorId,
  currentUserId,
  isArchive,
}) => {
  const dispatch = useAppDispatch();
  const [isFetchedInitialData, setIsFetchedInitialData] = useState<boolean>(false);
  const [isShowFormLoader, setIsShowFormLoader] = useState<boolean>(false);
  const { notesData, isListOver } = useAppSelector(({ notes }) => notes);
  const isSmallDisplay = useMediaQuery('(max-width:640px)');
  const { t } = useTranslation();

  useEffect(() => {
    setIsFetchedInitialData(false);
    dispatch(getNotes({ entity_type: 'planner_item', entity_id: entityId, page: 1 })).finally(() =>
      setIsFetchedInitialData(true),
    );
    return () => {
      dispatch(resetNotesData());
    };
  }, [dispatch, entityId]);

  const onSubmit = useCallback(
    (value: NotesFormPayloadModel, reset: () => void) => {
      setIsShowFormLoader(true);
      dispatch(
        createNotesItem({
          ...value,
          title: value.title || t('general.header.newNote'),
          entity_type: 'planner_item',
          entity_id: entityId,
        }),
      )
        .then((result) => {
          if (createNotesItem.fulfilled.match(result)) {
            dispatch(addNotesItem(result.payload));
            reset();
          }
        })
        .finally(() => setIsShowFormLoader(false));
    },
    [dispatch, entityId, t],
  );

  const fetchMoreData = useCallback(() => {
    dispatch(
      getNotes({ entity_type: 'planner_item', entity_id: entityId, page: notesData.meta.current_page + 1 }),
    ).finally(() => setIsFetchedInitialData(true));
  }, [dispatch, entityId, notesData?.meta?.current_page]);

  const handleDeleteNotesItem = useCallback(
    (itemId: number, callback: (val: boolean) => void) => {
      dispatch(deleteNotesItem({ itemId, entity_type: 'planner_item', entity_id: entityId })).finally(() => {
        dispatch(removeNotesItem(itemId));
        callback(false);
      });
    },
    [dispatch, entityId],
  );
  return (
    <Box
      sx={{
        height: '100%',
        msOverflowStyle: 'none',
        '& ::-webkit-scrollbar': {
          width: '0px !important',
        },
      }}
    >
      {isFetchedInitialData ? (
        <PlannerItemModalNotesScrollableBlock id="notesList">
          <InfiniteScroll
            dataLength={notesData?.data.length}
            next={fetchMoreData}
            hasMore={!isListOver}
            loader={<NotesSkeletonBlock />}
            scrollableTarget="notesList"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: isSmallDisplay ? 'center' : 'space-between',
              alignItems: 'flex-start',
              alignContent: 'flex-start',
            }}
          >
            {!isArchive && (
              <PlannerItemModalNotesItemContainer>
                <NotesForm creatorId={creatorId} callback={onSubmit} isShowInputLoader={isShowFormLoader} />
              </PlannerItemModalNotesItemContainer>
            )}

            {isSmallDisplay ? (
              <TransitionGroup>
                {notesData?.data.map((item: NotesItemModel) => (
                  <Collapse key={item.id}>
                    <PlannerItemModalNotesItemContainer>
                      <NotesItemCard
                        item={item}
                        hasEditPermission={isEditor}
                        creatorId={creatorId}
                        handleDeleteNotesItem={handleDeleteNotesItem}
                        currentUserId={currentUserId}
                      />
                    </PlannerItemModalNotesItemContainer>
                  </Collapse>
                ))}
              </TransitionGroup>
            ) : (
              notesData?.data.map((item: NotesItemModel) => (
                <PlannerItemModalNotesItemContainer key={item.id}>
                  <NotesItemCard
                    item={item}
                    hasEditPermission={isEditor}
                    creatorId={creatorId}
                    currentUserId={currentUserId}
                    handleDeleteNotesItem={handleDeleteNotesItem}
                  />
                </PlannerItemModalNotesItemContainer>
              ))
            )}
          </InfiniteScroll>
        </PlannerItemModalNotesScrollableBlock>
      ) : (
        <PlannerItemModalSkeletonBlock sx={{ justifyContent: isSmallDisplay ? 'center' : 'space-between' }}>
          <NotesSkeletonBlock />
        </PlannerItemModalSkeletonBlock>
      )}
    </Box>
  );
};

export default memo(PlannerItemModalNotes);
