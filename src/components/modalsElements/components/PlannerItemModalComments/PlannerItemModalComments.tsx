import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box, Collapse } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { TransitionGroup } from 'react-transition-group';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux';
import { createCommentsItem, deleteCommentsItem, getComments } from '../../../../store/comments/commentThunk';
import SocketConnect from '../../../../shared/services/socket';

import {
  addCommentsItem,
  removeCommentsItem,
  resetCommentsData,
} from '../../../../store/comments/commentsSlice';
import { MediaType } from '../../../../shared/models/media.model';
import CommentsItemCard from '../../../itemCards/CommentsItemCard';
import { CommentsItemModel } from '../../../../shared/models/comments/commentsItem.model';
import CommentsStub from './components/CommentsStub';
import { stubConfig } from '../../../../shared/configs/stub.config';
import PlannerCommentsSkeleton from './components/PlannerCommentsSkeleton';
import { DocumentsEntityTypeEnum } from '../../../../shared/enums/documentEntityType.enum';
import ChatForm from '../../../forms/ChatForm/ChatForm';

type PlannerItemModalCommentsProps = {
  entityId: number;
  isEditor: boolean;
  creatorId: number;
  currentUserId: number;
  isArchive?: boolean;
};
const PlannerItemModalComments: FC<PlannerItemModalCommentsProps> = ({
  entityId,
  isEditor,
  creatorId,
  currentUserId,
  isArchive,
}) => {
  const dispatch = useAppDispatch();
  const [isFetchedInitialData, setIsFetchedInitialData] = useState<boolean>(false);
  const [isShowFormLoader, setIsShowFormLoader] = useState<boolean>(false);
  const { commentsData, isListOver } = useAppSelector(({ comments }) => comments);
  const userId = useAppSelector((state) => state.profile.data?.id);
  const skeletonArray = useMemo(() => {
    return Array(3).fill('');
  }, []);
  const listRef = useRef<any>();

  const handleScrollToBottom = (delay?: number) => {
    if (!listRef?.current) return;

    if (!delay) {
      listRef.current.scrollTo({
        top: 1000000,
        behavior: 'smooth',
      });
      return;
    }

    setTimeout(
      () =>
        listRef.current.scrollTo({
          top: 1000000,
          behavior: 'smooth',
        }),
      delay,
    );
  };

  useEffect(() => {
    setIsFetchedInitialData(false);
    dispatch(getComments({ entity_type: 'planner_item', entity_id: entityId, page: 1 })).finally(() => {
      setIsFetchedInitialData(true);
      handleScrollToBottom();
    });
    return () => {
      dispatch(resetCommentsData());
    };
  }, [dispatch, entityId]);

  useEffect(() => {
    const plannerItemChanel = SocketConnect.connect.private(`planner-items.${entityId}`);
    SocketConnect.setChannel(`planner-items.${entityId}`, plannerItemChanel);
    plannerItemChanel.listen('.comment.created', (event: any) => {
      if (userId !== event.user.id) {
        dispatch(addCommentsItem(event.comment));
      }
    });
    plannerItemChanel.listen('.comment.deleted', (event: any) => {
      if (userId !== event.user.id) {
        dispatch(removeCommentsItem(event.comment_id));
      }
    });
    return () => {
      SocketConnect.removeChannel(`planner-items.${entityId}`);
      SocketConnect.connect.leave(`planner-items.${entityId}`);
    };
  }, [dispatch, entityId, userId]);

  const onSubmit = useCallback(
    (value: { message: string; files: MediaType[] }) => {
      setIsShowFormLoader(true);
      dispatch(
        createCommentsItem({
          body: value.message,
          documents: value.files,
          entity_type: 'planner_item',
          entity_id: entityId,
        }),
      )
        .then((result) => {
          if (createCommentsItem.fulfilled.match(result)) {
            dispatch(addCommentsItem(result.payload));
          }
        })
        .finally(() => {
          setIsShowFormLoader(false);
          handleScrollToBottom(500);
        });
    },
    [dispatch, entityId],
  );

  const handleDeleteCommentItem = useCallback(
    (itemId: number, callback: (val: boolean) => void) => {
      dispatch(deleteCommentsItem({ itemId, entity_type: 'planner_item', entity_id: entityId })).finally(
        () => {
          dispatch(removeCommentsItem(itemId));
          callback(false);
        },
      );
    },
    [dispatch, entityId],
  );

  const fetchMoreData = () => {
    dispatch(
      getComments({
        entity_type: 'planner_item',
        entity_id: entityId,
        page: commentsData.meta.current_page + 1,
      }),
    ).finally(() => setIsFetchedInitialData(true));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        overflow: 'hidden',
        flexGrow: '1',
        flexDirection: 'column',
        height: 'calc(100% - 56px)',
        pb: '10px',
        pt: '30px',
      }}
    >
      {isFetchedInitialData ? (
        <>
          {commentsData.data.length ? (
            <Box
              id="comment-list"
              ref={listRef}
              sx={{
                overflowY: 'scroll',
                scrollbarWidth: 'none',
                display: 'flex',
                flexGrow: 1,
                overflowX: 'hidden',
                flexDirection: 'column-reverse',
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <InfiniteScroll
                  dataLength={commentsData.data.length}
                  next={() => fetchMoreData()}
                  hasMore={!isListOver}
                  style={{
                    overflowY: 'hidden',
                    display: 'flex',
                    flexDirection: 'column-reverse',
                  }}
                  scrollableTarget="comment-list"
                  loader={
                    <Box sx={{ marginBottom: '10px' }}>
                      <PlannerCommentsSkeleton />
                    </Box>
                  }
                  inverse
                >
                  <TransitionGroup>
                    {commentsData.data.map((item: CommentsItemModel, index: number) => (
                      <Collapse key={item.id}>
                        <CommentsItemCard
                          key={index}
                          item={item}
                          handleDeleteItem={handleDeleteCommentItem}
                          hasEditPermission={isEditor}
                          creatorId={creatorId}
                          currentUserId={currentUserId}
                        />
                      </Collapse>
                    ))}
                  </TransitionGroup>
                </InfiniteScroll>
              </Box>
            </Box>
          ) : (
            <Box sx={{ height: '100%' }}>
              {stubConfig.map((item, i) => (
                <CommentsStub key={i} description={item.description} img={item.img} />
              ))}
            </Box>
          )}
        </>
      ) : (
        <Box sx={{ height: '100%', flexGrow: 1 }}>
          {skeletonArray.map((_, index) => (
            <PlannerCommentsSkeleton key={index} />
          ))}
        </Box>
      )}
      {isFetchedInitialData && !isArchive && (
        <Box sx={{ m: '0 1px' }}>
          <ChatForm
            fileEntityType={DocumentsEntityTypeEnum.comment_document}
            isShowFormLoader={isShowFormLoader}
            onSendMessage={onSubmit}
            isEdit={false}
          />
        </Box>
      )}
    </Box>
  );
};

export default PlannerItemModalComments;
