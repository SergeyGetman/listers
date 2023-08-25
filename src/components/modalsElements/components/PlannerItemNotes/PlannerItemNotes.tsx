import React, { FC, useCallback, useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux';
import {
  createNotesItem,
  deleteNotesItem,
  getNotes,
  updateNotesData,
} from '../../../../store/notes/notesThunk';
import {
  addNotesItem,
  removeNotesItem,
  resetNotesData,
  updateNotesItemFormList,
} from '../../../../store/notes/notesSlice';
import { NotesFormPayloadModel } from '../../../../shared/models/notes/notesFormPayload.model';
import {
  PlannerItemModalNotesItemContainer,
  PlannerItemModalNotesScrollableBlock,
  PlannerItemModalSkeletonBlock,
} from '../PlannerItemModalNotes/PlannerItemModalNotes.style';
import NotesSkeletonBlock from '../PlannerItemModalNotes/components/NotesSkeletonBlock';
import { NotesItemModel } from '../../../../shared/models/notes/notesItem.model';
import NoteForm from '../../../forms/NoteForm';
import NotesCard from './components/NotesCard';
import PlannerItemNavigationStub from '../../../stubs/PlannerItemNavigationStub';
import { PlannerItemNavigationEnum } from '../../../../shared/enums/plannerItemNavigation.enum';

type PlannerItemNotesProps = {
  entityId?: number;
  isCanEdit: boolean;
  isArchive?: boolean;
  isCreate?: boolean;
};
const PlannerItemNotes: FC<PlannerItemNotesProps> = ({
  entityId,
  isCanEdit,
  isArchive,
  isCreate = false,
}) => {
  const dispatch = useAppDispatch();
  const [isFetchedInitialData, setIsFetchedInitialData] = useState<boolean>(isCreate);
  const [isShowFormLoader, setIsShowFormLoader] = useState<boolean>(false);
  const { notesData, isListOver } = useAppSelector(({ notes }) => notes);
  const isSmallDisplay = useMediaQuery('(max-width:620px)');
  const { t } = useTranslation();

  useEffect(() => {
    if (!isCreate) {
      setIsFetchedInitialData(false);
      dispatch(getNotes({ entity_type: 'planner_item', entity_id: entityId, page: 1 })).finally(() =>
        setIsFetchedInitialData(true),
      );
      return () => {
        dispatch(resetNotesData());
      };
    }
    return () => true;
  }, [dispatch, entityId, isCreate]);

  const onSubmit = useCallback(
    (value: NotesFormPayloadModel, reset: () => void) => {
      setIsShowFormLoader(true);
      dispatch(
        createNotesItem({
          ...value,
          title: value.title || t('general.header.newNote'),
          entity_type: isCreate ? undefined : 'planner_item',
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
    [dispatch, entityId, isCreate, t],
  );

  const fetchMoreData = useCallback(() => {
    dispatch(
      getNotes({ entity_type: 'planner_item', entity_id: entityId, page: notesData.meta.current_page + 1 }),
    ).finally(() => setIsFetchedInitialData(true));
  }, [dispatch, entityId, notesData?.meta?.current_page]);

  const handleUpdateNotesItem = useCallback(
    ({ noteId, description, callback }: { noteId: number; description: string; callback: () => void }) => {
      dispatch(
        updateNotesData({
          body: description,
          id: noteId,
          entity_type: isCreate ? undefined : 'planner_item',
          entity_id: isCreate ? undefined : entityId,
        }),
      )
        .then((result) => {
          if (updateNotesData.fulfilled.match(result)) {
            dispatch(updateNotesItemFormList(result.payload));
          }
        })
        .finally(() => {
          callback();
        });
    },
    [dispatch, isCreate, entityId],
  );

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
        width: '100%',
        msOverflowStyle: 'none',
        '& ::-webkit-scrollbar': {
          width: '0px !important',
        },
      }}
    >
      {isFetchedInitialData ? (
        <>
          {notesData?.data?.length > 0 || isCanEdit ? (
            <PlannerItemModalNotesScrollableBlock id="notesList">
              <InfiniteScroll
                dataLength={notesData?.data?.length}
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
                {!isArchive && isCanEdit && (
                  <Box
                    sx={{
                      width: '100%',
                      maxWidth: notesData?.data?.length === 0 || isSmallDisplay ? '100%' : '281px',
                      mb: '12px',
                    }}
                  >
                    <NoteForm callBack={onSubmit} isShowInputLoader={!!isShowFormLoader} />
                  </Box>
                )}

                {notesData?.data.map((item: NotesItemModel) => (
                  <PlannerItemModalNotesItemContainer
                    key={item.id}
                    sx={{ maxWidth: isSmallDisplay ? '100%' : '281px' }}
                  >
                    <NotesCard
                      handleChangeNotesDescription={handleUpdateNotesItem}
                      item={item}
                      isCanEdit={isCanEdit}
                      handleDeleteItem={handleDeleteNotesItem}
                    />
                  </PlannerItemModalNotesItemContainer>
                ))}
              </InfiniteScroll>
            </PlannerItemModalNotesScrollableBlock>
          ) : (
            <PlannerItemNavigationStub variant={PlannerItemNavigationEnum.notes} />
          )}
        </>
      ) : (
        <PlannerItemModalSkeletonBlock sx={{ justifyContent: isSmallDisplay ? 'center' : 'space-between' }}>
          <NotesSkeletonBlock />
        </PlannerItemModalSkeletonBlock>
      )}
    </Box>
  );
};

export default PlannerItemNotes;
