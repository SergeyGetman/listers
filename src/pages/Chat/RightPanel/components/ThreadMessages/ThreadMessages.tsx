import React, { useCallback, useEffect, useMemo, useRef, useState, Fragment } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { groupBy } from 'lodash';
import moment from 'moment/moment';
import { shallowEqual } from 'react-redux';
import { MessagesContainer } from '../../RightPanel.style';
import NoMessagesStub from '../../NoMessagesStub';
import {
  noMessagesGroupChatStubConfig,
  noMessagesPersonalChatStubConfig,
} from '../../../../../shared/configs/stub.config';
import MessageItemRender from '../../MessageItemRender';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';
import { MessageModel } from '../../../../../shared/models/chat/chat.model';
import {
  getMessages,
  getThreadUnreadReplies,
  handleDeleteMessage,
  handleFindMessage,
  handleLoadChatData,
  removeReaction,
  setReaction,
} from '../../../../../store/chat/chatThunk';
import { clearChatThreadState, setEditState, setMessagesLoading } from '../../../../../store/chat/chatSlice';
import { MediaType } from '../../../../../shared/models/media.model';
import { ModalNamesEnum } from '../../../../../shared/enums/modalNames.enum';
import ScrollTrigger from '../../../../../components/ScrollTrigger';
import NavigationButton from '../../../../../components/buttons/NavigationButton';
import modalObserver from '../../../../../shared/utils/observers/modalObserver';
import ChatMessageSkeleton from '../../../components/ChatMessage/Skeleton';

const handleGetDate = (date: string) => {
  const format = 'YYYY-MM-DD';
  if (moment().format(format) === moment(date, 'MM/DD/YYYY').format(format)) {
    return 'Today';
  }
  if (moment().subtract(1, 'd').format(format) === moment(date, 'MM/DD/YYYY').format(format)) {
    return 'Yesterday';
  }
  return moment(date, 'MM/DD/YYYY').format('DD MMMM, YYYY');
};

const ThreadMessages = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const theme = useTheme();

  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { type } = useParams();

  const thread = useAppSelector((state) => state.chat.thread, shallowEqual);
  const messages = useAppSelector((state) => state.chat.messages, shallowEqual);
  const pendingMessages = useAppSelector((state) => state.chat.pendingMessages, shallowEqual);
  const editMessageData = useAppSelector((state) => state.chat.editState, shallowEqual);

  const profile = useAppSelector((state) => state.profile.data, shallowEqual);
  const listRef = useRef<HTMLDivElement | null>(null);

  const [selectedUnreadReplyIndex, setSelectedUnreadReplyIndex] = useState(0);

  // refactor
  const [topDone, setTopDone] = useState(false);
  const [bottomDone, setBottomDone] = useState(false);
  const [topLoading, setTopLoading] = useState(false);
  const [bottomLoading, setBottomLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const scrollHeightRef = useRef(0);

  const replyId = useMemo(() => searchParams.get('reply'), [searchParams]);
  const { ref, inView } = useInView({});
  const [isShowLastReadPanel, setIsShowLastReadPanel] = useState(true);

  const sortedChat = useMemo(() => {
    const sortedObject = groupBy(messages.data, (item) =>
      moment.utc(item.created_at).local().format('MM/DD/YYYY'),
    );
    return Object.entries(sortedObject).map(([key, value]) => ({
      type: key,
      items: value,
    }));
  }, [messages.data]);

  const prependItems = () => {
    if (id && topDone === false && messages.data.length > 0 && listRef.current) {
      scrollHeightRef.current = listRef.current.scrollHeight;

      setTopLoading(true);
      dispatch(
        getMessages({
          threadId: +id,
          page: messages.data[0].id,
          direction: 1,
          isPrependItems: true,
        }),
      )
        .then((res) => {
          if (getMessages.fulfilled.match(res)) {
            if (res.payload.data.length < 50) {
              setTopDone(true);
            }
          }
          if (!listRef.current) return;

          const scrollTo = listRef.current.scrollHeight - scrollHeightRef.current;

          listRef.current.scrollTo(0, scrollTo);
        })
        .finally(() => {
          setTopLoading(false);
        });
    }
  };

  const loadMore = () => {
    if (id) {
      setBottomLoading(true);
      dispatch(
        getMessages({
          threadId: +id,
          page: messages.data[messages.data.length - 1].id,
          direction: 0,
        }),
      )
        .then((res) => {
          if (getMessages.fulfilled.match(res)) {
            if (res.payload.data.length < 50) {
              setBottomDone(true);
            }
          }
        })
        .finally(() => {
          setBottomLoading(false);
        });
    }
  };

  const handleShowFile = (index: number, media: MediaType[]) => {
    modalObserver.addModal(ModalNamesEnum.mediaViewer, {
      props: {
        media,
        activeMedia: index,
        permission: {
          isDelete: false,
          isUpdate: false,
          isDownload: true,
        },
      },
    });
  };

  const handleOpenReply = useCallback(
    (message: MessageModel) => {
      setSearchParams({ reply: message.id.toString() });
    },
    [setSearchParams],
  );

  const onDeleteMessage = useCallback(
    (message: MessageModel) => {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.deleteMessage.title'),
          text: t('general.modals.deleteMessage.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () => {
            dispatch(handleDeleteMessage(message.id));
            if (editMessageData.data && editMessageData.data.messageId === message.id) {
              dispatch(setEditState(null));
            }
          },
        },
      });
    },
    [dispatch, editMessageData.data, t],
  );

  const handlePinMessage = () => {};

  const handleEditMessage = useCallback(
    (message: MessageModel) => {
      dispatch(setEditState({ message: message.body, files: message.media, messageId: message.id }));
    },
    [dispatch],
  );

  const handleAddReaction = useCallback(
    (message: MessageModel, emoji: string) => {
      if (emoji !== message.myEmoji?.emoji) {
        dispatch(setReaction({ messageId: message.id, data: { emoji } }));
      } else {
        dispatch(removeReaction(message));
      }
    },
    [dispatch],
  );

  const handleScrollToUnreadReply = useCallback(async () => {
    const element = document.getElementById(`message-${thread.unreadReplies[selectedUnreadReplyIndex]}`);

    if (element) {
      element.scrollIntoView({ block: 'start' });
    } else {
      setLoading(true);

      if (id) {
        dispatch(
          handleFindMessage({ id: +id, unreadId: thread.unreadReplies[selectedUnreadReplyIndex] }),
        ).finally(() => {
          setLoading(false);
          const el = document.getElementById(`message-${thread.unreadReplies[selectedUnreadReplyIndex]}`);
          if (el) {
            el.scrollIntoView({ block: 'start' });
          }
          setTopDone(false);
          setBottomDone(false);
        });
      }
    }

    setSelectedUnreadReplyIndex((prev) => (prev + 1 > thread.unreadReplies.length - 1 ? 0 : prev + 1));
  }, [dispatch, id, selectedUnreadReplyIndex, thread.unreadReplies]);

  const handleScrollToBottom = () => {
    if (bottomDone && listRef.current) {
      listRef.current.scrollTo(0, listRef.current?.scrollHeight);
      return;
    }
    if (listRef.current) {
      setLoading(true);
      if (id) {
        setBottomDone(true);

        dispatch(getMessages({ threadId: +id, direction: 1, id: undefined, isReplice: true })).finally(() => {
          setLoading(false);
          // @ts-ignore
          listRef.current.scrollTo(0, listRef.current.scrollHeight);
          setBottomLoading(false);
        });
      }
    }
  };

  useEffect(() => {
    if (!id) return;

    const firstLoadPromise = dispatch(handleLoadChatData({ id: +id }));

    firstLoadPromise.then((result) => {
      if (handleLoadChatData.fulfilled.match(result)) {
        if (
          result.payload.thread.last_read_message_id ===
          result.payload.messages[result.payload.messages.length - 1]?.id
        ) {
          setIsShowLastReadPanel(false);
        }

        if (result.payload.messages.length <= 10) {
          setTopDone(true);
          setBottomDone(true);
        }

        setLoading(false);
        setTopLoading(false);
        setBottomLoading(false);
        const element = document.getElementById(`message-${result.payload.thread?.last_read_message_id}`);
        if (element) {
          element.scrollIntoView({ block: 'start', behavior: 'auto' });
        } else {
          if (listRef.current) {
            listRef.current?.scrollTo(0, listRef.current?.scrollHeight);
          }
        }
      }
    });

    dispatch(getThreadUnreadReplies(+id));

    // eslint-disable-next-line consistent-return
    return () => {
      setLoading(true);
      dispatch(setMessagesLoading(true));
      firstLoadPromise.abort();
      setTopDone(false);
      setBottomDone(false);
      setTopLoading(true);
      setBottomDone(true);
      dispatch(clearChatThreadState());
      setIsShowLastReadPanel(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  useEffect(() => {
    if (inView && bottomDone && listRef.current !== null) {
      listRef.current.scrollTo(0, listRef.current?.scrollHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.data]);

  useEffect(() => {
    if (replyId) {
      modalObserver.addModal(ModalNamesEnum.replyModal, {
        props: { threadId: id },
      });
    }
  }, [dispatch, id, replyId]);

  return (
    <MessagesContainer>
      {loading === false && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          {inView === false && messages.data.length > 0 && (
            <Box sx={{ mb: '10px' }}>
              <NavigationButton type="bottom" onClick={handleScrollToBottom} />
            </Box>
          )}

          {thread.unreadReplies.length > 0 && (
            <Box>
              <NavigationButton
                count={thread.unreadReplies.length}
                type="reply"
                onClick={handleScrollToUnreadReply}
              />
            </Box>
          )}
        </Box>
      )}

      <Box
        ref={listRef}
        height="100%"
        id="messages-list"
        sx={{
          overflowY: messages.data.length === 0 || loading ? 'hidden' : 'auto',
          flexGrow: 1,
          height: 0,
          pb: '40px',
        }}
      >
        {!topDone && <ChatMessageSkeleton />}

        <Box height={2}>{!topDone && !topLoading && <ScrollTrigger onFetchMore={prependItems} />}</Box>
        {messages.data.length === 0 && loading === false && thread.data && (
          <NoMessagesStub
            userId={profile.id}
            value={type === 'group' ? noMessagesGroupChatStubConfig : noMessagesPersonalChatStubConfig}
            thread={thread.data}
          />
        )}

        {loading
          ? Array(10)
              .fill('')
              .map((_, index) => <ChatMessageSkeleton key={index} />)
          : sortedChat.map((item, sortedIndex) => (
              <Box key={item.type} sx={{ position: 'relative' }}>
                <Box
                  sx={{
                    top: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'sticky',
                    p: '15px 0',
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: '30px',
                      backgroundColor: theme.palette.case.contrast.gray1,
                      p: '5px 15px',
                      zIndex: 100,
                    }}
                  >
                    <Typography variant="extra_small_bolt">{handleGetDate(item.type)}</Typography>
                  </Box>
                </Box>
                {item.items.map((message, index) => (
                  // eslint-disable-next-line react/jsx-fragments
                  <Fragment key={message.id}>
                    <MessageItemRender
                      key={Number(moment().format('x'))}
                      thread={thread.data}
                      message={message}
                      userId={profile?.id}
                      unreadReplies={thread.unreadReplies}
                      selectedUnreadReplyIndex={selectedUnreadReplyIndex}
                      handleShowFile={handleShowFile}
                      handleEditMessage={handleEditMessage}
                      handlePinMessage={handlePinMessage}
                      onDeleteMessage={onDeleteMessage}
                      handleOpenReply={handleOpenReply}
                      handleAddReaction={handleAddReaction}
                    />

                    {!!thread.data?.last_read_message_id &&
                      isShowLastReadPanel &&
                      message.id === thread.data?.last_read_message_id &&
                      index !== item.items.length - 1 && (
                        <Box
                          id="unread-message"
                          sx={{
                            width: '100%',
                            padding: '10px 0',
                            height: '18px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: theme.palette.case.contrast.gray1,
                          }}
                        >
                          <Typography
                            sx={{ color: theme.palette.case.contrast.gray5 }}
                            variant="extra_small_bolt"
                          >
                            Unread messages
                          </Typography>
                        </Box>
                      )}
                  </Fragment>
                ))}
                {pendingMessages.map((el) => (
                  <MessageItemRender
                    key={el.id}
                    thread={thread.data}
                    message={el}
                    userId={profile?.id}
                    unreadReplies={thread.unreadReplies}
                    selectedUnreadReplyIndex={selectedUnreadReplyIndex}
                    handleShowFile={handleShowFile}
                    handleEditMessage={handleEditMessage}
                    handlePinMessage={handlePinMessage}
                    onDeleteMessage={onDeleteMessage}
                    handleOpenReply={handleOpenReply}
                    handleAddReaction={handleAddReaction}
                  />
                ))}
                {sortedChat.length - 1 === sortedIndex && bottomDone && <Box ref={ref} />}
              </Box>
            ))}
        <Box height={2}>{!bottomDone && !bottomLoading && <ScrollTrigger onFetchMore={loadMore} />}</Box>
      </Box>
    </MessagesContainer>
  );
};

export default ThreadMessages;
