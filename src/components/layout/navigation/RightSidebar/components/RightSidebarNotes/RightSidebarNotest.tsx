import React, { FC, useCallback, useEffect } from 'react';
import { Box, Collapse, Skeleton } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import { useTranslation } from 'react-i18next';
import { RightSidebarNotesItemContainer } from './RightSidebarNotest.style';
import { useAppDispatch, useAppSelector } from '../../../../../../shared/hooks/redux';
import {
  createNotesItem,
  deleteNotesItem,
  getRightSidebarNotes,
} from '../../../../../../store/RightSidebar/rightSidebarActions';
import { resetRightSidebarNotesState } from '../../../../../../store/RightSidebar/rightSidebarSlice';
import NotesItemCard from '../../../../../itemCards/NotesItemCard';
import { NotesFormPayloadModel } from '../../../../../../shared/models/notes/notesFormPayload.model';
import NotesForm from '../../../../../forms/NotesForm';

const RightSidebarNotes: FC = () => {
  const dispatch = useAppDispatch();
  const { isGetInitialData, isShowInputLoader, rightSidebarNotesData } = useAppSelector(
    ({ rightSidebar }) => rightSidebar,
  );
  const { t } = useTranslation();
  const skeletonArr = Array(6).fill('');

  useEffect(() => {
    dispatch(getRightSidebarNotes());
    return () => {
      dispatch(resetRightSidebarNotesState());
    };
  }, [dispatch]);

  const onSubmit = (data: NotesFormPayloadModel, reset: () => void) => {
    dispatch(createNotesItem({ ...data, title: data.title || t('genertal.header.newNote') })).then(
      (result) => {
        if (createNotesItem.fulfilled.match(result)) {
          reset();
        }
      },
    );
  };

  const handleDeleteNotesItem = useCallback(
    (itemId: number, callback: (val: boolean) => void) => {
      dispatch(deleteNotesItem(itemId)).finally(() => {
        callback(false);
      });
    },
    [dispatch],
  );

  return (
    <Box sx={{ height: '100%', overflow: 'hidden', width: '100%' }}>
      <Box
        sx={{
          padding: '0 10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <NotesForm callback={onSubmit} isShowInputLoader={isShowInputLoader} />
      </Box>

      <RightSidebarNotesItemContainer>
        {isGetInitialData ? (
          <TransitionGroup style={{ width: '100%' }}>
            {rightSidebarNotesData.map((item) => (
              <Collapse key={item.id}>
                <Box
                  sx={{
                    marginBottom: '16px',
                    ':first-of-type': {
                      marginTop: 0,
                    },
                  }}
                  key={item.id}
                >
                  <NotesItemCard
                    item={item}
                    hasEditPermission
                    handleDeleteNotesItem={handleDeleteNotesItem}
                  />
                </Box>
              </Collapse>
            ))}
          </TransitionGroup>
        ) : (
          skeletonArr.map((item, index) => (
            <Box key={index} sx={{ height: '200px', marginBottom: '16px', width: '100%' }}>
              <Skeleton sx={{ borderRadius: '5px' }} variant="rectangular" width="100%" height={200} />
            </Box>
          ))
        )}
      </RightSidebarNotesItemContainer>
    </Box>
  );
};

export default RightSidebarNotes;
