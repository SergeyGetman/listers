import React, { FC, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../shared/hooks/redux';

import SocketConnect from '../../shared/services/socket';
import {
  chatGlobalSocketMessageCreated,
  chatGlobalSocketThreadCreate,
  chatGlobalSocketThreadRemove,
  chatGlobalSocketThreadUpdate,
  ChatSocketType,
} from '../../store/chat/chatSockets';
import { networkGlobalSocketCreate, NetworkSocketType } from '../../store/network/networkSockets';
import router from '../../shared/services/router';
import { PlannerItemModelTypeEnum } from '../../shared/enums/plannerItemModelType.enum';
import { MediaType } from '../../shared/models/media.model';
import { NotificationService } from '../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { getTodo } from '../../store/todo/todoThunk';

import { getChecklistItem } from '../../store/checklists/checklistsThunk';
import { plannerSocketDeleteItem, plannerSocketUpdateItem } from '../../store/planner/plannerSockets';
import { calendarSocketUpdateItem } from '../../store/calendar/calendarSockets';
import { roadmapSocketUpdateItem } from '../../store/roadmap/roadmapSockets';
import { eventsSocketUpdateItem } from '../../store/events/eventsSockets';
import { archiveSocketUpdateItem } from '../../store/archive/archiveSockets';
import { backlogSocketUpdateItem } from '../../store/backlog/backlogSockets';
import { NewsItemModel } from '../../shared/models/notifications/news/newsItem.model';
import { RequestItemModel } from '../../shared/models/notifications/requests/requestItem.model';
import {
  notificationsGlobalSocketAddItem,
  notificationsGlobalSocketCreateItem,
  notificationsGlobalSocketDeleteItem,
  requestsGlobalSocketUpdateItem,
} from '../../store/RightSidebar/Notifications/notificationsSockets';
import { getGlobalChatCounters } from '../../store/chat/chatThunk';
import modalObserver from '../../shared/utils/observers/modalObserver';
import { getProfileInfo } from '../../store/Profile/profile.actions';
import {
  addChecklist,
  addChecklistItemToTodo,
  deleteChecklistItem,
  removeChecklist,
  updateChecklistItemInTodo,
  updateChecklistListItem,
} from '../../store/todo/Checklists/checklistsSlice';
import { addNote, removeNote, updateNote } from '../../store/todo/Notes/notesSlice';
import { getNote } from '../../store/todo/Notes/notesThunk';

export type PlannerItemSocketType = {
  is_recurring: boolean;
  user_id?: number;
  checklist_id?: number;
  entity_id?: number;
  entity?: {
    id: number;
    title: string;
  };
  checklist?: {
    body: string;
    id: number;
  };
  item: {
    id: number;
    is_recurring: boolean;
    recurring_id?: number;
    model_type: PlannerItemModelTypeEnum;
    title: string;
  };
  user: {
    avatar: MediaType;
    first_name: string;
    last_name: string;
    id: number;
  };
};
type GeneralSocketsProps = {
  userId: number;
};
const GeneralSockets: FC<GeneralSocketsProps> = ({ userId }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { t } = useTranslation();
  useEffect(() => {
    if (userId) {
      const userChannel = SocketConnect.connect.private(`users.${userId}`);
      SocketConnect.setChannel(`users.${userId}`, userChannel);
      userChannel
        .listen('.threads.counter', () => dispatch(getGlobalChatCounters()))
        .listen('.thread.created', (event: { thread_id: number }) =>
          dispatch(chatGlobalSocketThreadCreate(event)),
        )
        .listen('.3d_secure.succeed', () => {
          modalObserver.closeAllModals();
          dispatch(getProfileInfo());
        })
        .listen('.message.created', (event: ChatSocketType) =>
          dispatch(chatGlobalSocketMessageCreated(event)),
        )
        .listen('.news.created', (event: { item: NewsItemModel; socket: null }) => {
          dispatch(notificationsGlobalSocketAddItem(event.item));
        })
        .listen('.request.created', (event: { request: RequestItemModel; socket: null }) => {
          dispatch(notificationsGlobalSocketCreateItem(event.request));
        })
        .listen('.request.updated', (event: { request: RequestItemModel }) => {
          dispatch(requestsGlobalSocketUpdateItem(event.request));
        })
        .listen(
          '.request.deleted',
          (event: { entity: string; entity_id: number; request_id: number; socket: null }) => {
            dispatch(notificationsGlobalSocketDeleteItem(event.request_id));
          },
        )
        .listen('.thread.update', (event: { threadId: number }) =>
          dispatch(chatGlobalSocketThreadUpdate(event.threadId)),
        )
        .listen('.thread.updated', (event: { thread_id: number }) =>
          dispatch(chatGlobalSocketThreadUpdate(event.thread_id)),
        )
        .listen('.thread.removed', (event: { thread_id: number }) =>
          dispatch(chatGlobalSocketThreadRemove(event.thread_id)),
        )
        .listen('.connections.created', (event: NetworkSocketType) =>
          dispatch(networkGlobalSocketCreate(event)),
        )
        // .listen('transport.updated', (event: any) => {
        //   // transport card updated
        //   console.log(event, 'event');
        //   console.log('event');

        // dispatch(updateTransport(event));
        // })
        // .listen('.transport.created', (event: { transport_id: number }) =>
        //   dispatch(garageGlobalSocketUpdateItem(event.transport_id)),
        // )
        // .listen('.transport.updated', (event: { transport_id: number }) => {
        //   console.log('event');
        //   dispatch(garageGlobalSocketUpdateItem(event.transport_id));
        // })
        // .listen('.transport.deleted', (event: { transport_id: number }) => {
        //   dispatch(removeTransport(event.transport_id));
        // })
        .listen('.planner_user.added', (event: PlannerItemSocketType) => {
          if (userId !== event.user.id) {
            if (event.item.model_type === PlannerItemModelTypeEnum.task) {
              if (userId === event.user_id) {
                NotificationService.plannerItemUpdate(
                  t('general.notifications.assignedToTaskBy', { title: event.item.title }),
                  `${event.user.first_name} ${event.user.last_name}`,
                );
              } else {
                NotificationService.plannerItemUpdate(
                  t('general.notifications.newUserAssignedToTask', { title: event.item.title }),
                  `${event.user.first_name} ${event.user.last_name}`,
                );
              }
            } else if (event.item.model_type === PlannerItemModelTypeEnum.event) {
              if (userId === event.user_id) {
                NotificationService.plannerItemUpdate(
                  t('general.notifications.invitedToEventBy', { title: event.item.title }),
                  `${event.user.first_name} ${event.user.last_name}`,
                );
              } else {
                NotificationService.plannerItemUpdate(
                  t('general.notifications.newPeopleInvitedToEvent', { title: event.item.title }),
                  `${event.user.first_name} ${event.user.last_name}`,
                );
              }
            } else if (event.item.model_type === PlannerItemModelTypeEnum.todo) {
              if (userId === event.user_id) {
                NotificationService.plannerItemUpdate(
                  t('general.notifications.invitedToTodoBy', { title: event.item.title }),
                  `${event.user.first_name} ${event.user.last_name}`,
                );
              } else {
                NotificationService.plannerItemUpdate(
                  t('general.notifications.newPeopleInvitedToTodo', { title: event.item.title }),
                  `${event.user.first_name} ${event.user.last_name}`,
                );
              }
            } else if (event.item.model_type === PlannerItemModelTypeEnum.note) {
              if (userId === event.user_id) {
                NotificationService.plannerItemUpdate(
                  t('general.notifications.invitedToNoteBy', { title: event.item.title }),
                  `${event.user.first_name} ${event.user.last_name}`,
                );
              } else {
                NotificationService.plannerItemUpdate(
                  t('general.notifications.newPeopleInvitedToNote', { title: event.item.title }),
                  `${event.user.first_name} ${event.user.last_name}`,
                );
              }
            }
          }
        })
        .listen('.planner_item.deleted', (event: PlannerItemSocketType) => {
          dispatch(plannerSocketDeleteItem(event, location));
        })
        .listen('.planner_item.archived', (event: PlannerItemSocketType) => {
          if (userId !== event.user.id) {
            if (event.item.model_type === PlannerItemModelTypeEnum.task) {
              NotificationService.plannerItemUpdate(
                t('general.notifications.taskArchivedBy', { title: event.item.title }),
                `${event.user.first_name} ${event.user.last_name}`,
              );
            } else if (event.item.model_type === PlannerItemModelTypeEnum.event) {
              NotificationService.plannerItemUpdate(
                t('general.notifications.eventArchivedBy', { title: event.item.title }),
                `${event.user.first_name} ${event.user.last_name}`,
              );
            }
          }
        })
        .listen('.planner_item.unarchived', (event: PlannerItemSocketType) => {
          if (userId !== event.user.id) {
            if (event.item.model_type === PlannerItemModelTypeEnum.task) {
              NotificationService.plannerItemUpdate(
                t('general.notifications.taskUnArchivedBy', { title: event.item.title }),
                `${event.user.first_name} ${event.user.last_name}`,
              );
            } else if (event.item.model_type === PlannerItemModelTypeEnum.event) {
              NotificationService.plannerItemUpdate(
                t('general.notifications.eventUnArchivedBy', { title: event.item.title }),
                `${event.user.first_name} ${event.user.last_name}`,
              );
            }
          }
        })
        .listen('.planner_item.updated', (event: PlannerItemSocketType) => {
          if (userId !== event.user.id) {
            if (event.item.model_type === PlannerItemModelTypeEnum.task) {
              NotificationService.plannerItemUpdate(
                t('general.notifications.taskUpdatedBy', { title: event.item.title }),
                `${event.user.first_name} ${event.user.last_name}`,
              );
            } else if (event.item.model_type === PlannerItemModelTypeEnum.event) {
              NotificationService.plannerItemUpdate(
                t('general.notifications.eventUpdatedBy', { title: event.item.title }),
                `${event.user.first_name} ${event.user.last_name}`,
              );
            } else if (event.item.model_type === PlannerItemModelTypeEnum.todo) {
              NotificationService.plannerItemUpdate(
                t('general.notifications.todoUpdatedBy', { title: event.item.title }),
                `${event.user.first_name} ${event.user.last_name}`,
              );
            } else if (event.item.model_type === PlannerItemModelTypeEnum.note) {
              NotificationService.plannerItemUpdate(
                t('general.notifications.noteUpdatedBy', { title: event.item.title }),
                `${event.user.first_name} ${event.user.last_name}`,
              );
            }
          }
        })
        .listen('.planner_item.status.changed', (event: PlannerItemSocketType) => {
          if (userId !== event.user.id) {
            if (event.item.model_type === PlannerItemModelTypeEnum.task) {
              NotificationService.plannerItemUpdate(
                t('general.notifications.taskStatusChangedBy', { title: event.item.title }),
                `${event.user.first_name} ${event.user.last_name}`,
              );
            } else if (event.item.model_type === PlannerItemModelTypeEnum.event) {
              NotificationService.plannerItemUpdate(
                t('general.notifications.eventStatusChangedBy', { title: event.item.title }),
                `${event.user.first_name} ${event.user.last_name}`,
              );
            }
          }
        })
        .listen('.planner_user.removed', (event: PlannerItemSocketType) => {
          if (userId !== event.user.id) {
            if (event.item.model_type === PlannerItemModelTypeEnum.task) {
              NotificationService.plannerItemUpdate(
                t('general.notifications.peopleDeletedFromTask', { title: event.item.title }),
                `${event.user.first_name} ${event.user.last_name}`,
              );
            } else if (event.item.model_type === PlannerItemModelTypeEnum.event) {
              NotificationService.plannerItemUpdate(
                t('general.notifications.peopleDeletedFromEvent', { title: event.item.title }),
                `${event.user.first_name} ${event.user.last_name}`,
              );
            } else if (event.item.model_type === PlannerItemModelTypeEnum.todo) {
              NotificationService.plannerItemUpdate(
                t('general.notifications.peopleDeletedFromTodo', { title: event.item.title }),
                `${event.user.first_name} ${event.user.last_name}`,
              );
            } else if (event.item.model_type === PlannerItemModelTypeEnum.note) {
              NotificationService.plannerItemUpdate(
                t('general.notifications.peopleDeletedFromNotes', { title: event.item.title }),
                `${event.user.first_name} ${event.user.last_name}`,
              );
            }
          }
        })
        .listen('.planner_user.self_removed', (event: PlannerItemSocketType) => {
          if (userId !== event.user.id) {
            if (event.item.model_type === PlannerItemModelTypeEnum.task) {
              NotificationService.plannerItemUpdate(
                t('general.notifications.peopleRemovedThemselfFromTask', { title: event.item.title }),
                `${event.user.first_name} ${event.user.last_name}`,
              );
            } else if (event.item.model_type === PlannerItemModelTypeEnum.event) {
              NotificationService.plannerItemUpdate(
                t('general.notifications.peopleRemovedThemselfFromEvent', { title: event.item.title }),
                `${event.user.first_name} ${event.user.last_name}`,
              );
            } else if (event.item.model_type === PlannerItemModelTypeEnum.todo) {
              NotificationService.plannerItemUpdate(
                t('general.notifications.peopleRemovedThemselfFromTodo', { title: event.item.title }),
                `${event.user.first_name} ${event.user.last_name}`,
              );
            }
          }
        });

      if (location.pathname === `${router.todo.path}/${router.todo.children.notes.path}`) {
        userChannel
          .listen('.planner_item.created', (event: PlannerItemSocketType) => {
            if (userId !== event.user.id && event.item.model_type === PlannerItemModelTypeEnum.note) {
              dispatch(getNote(event.item.id)).then((result) => {
                if (getNote.fulfilled.match(result)) {
                  dispatch(addNote(result.payload));
                }
              });
            }
          })
          .listen('.planner_item.updated', (event: PlannerItemSocketType) => {
            if (userId !== event.user.id && event.item.model_type === PlannerItemModelTypeEnum.note) {
              dispatch(getNote(event.item.id)).then((result) => {
                if (getNote.fulfilled.match(result)) {
                  dispatch(updateNote(result.payload));
                }
              });
            }
          })
          .listen('.removed_planner_user.removed', (event: PlannerItemSocketType) => {
            if (userId !== event.user.id && event.item.model_type === PlannerItemModelTypeEnum.note) {
              NotificationService.plannerItemUpdate(
                t('general.notifications.peopleDeletedFromNotes', { title: event.item.title }),
                `${event.user.first_name} ${event.user.last_name}`,
              );
              dispatch(removeNote(event.item.id));
            }
          })

          .listen('.planner_user.added', (event: PlannerItemSocketType) => {
            if (userId !== event.user.id) {
              if (event.item.model_type === PlannerItemModelTypeEnum.note) {
                if (userId === event.user_id) {
                  dispatch(getNote(event.item.id)).then((result) => {
                    if (getNote.fulfilled.match(result)) {
                      dispatch(addNote(result.payload));
                    }
                  });
                }
              }
            }
          });
      }

      if (location.pathname === router.todo.path) {
        userChannel
          .listen('.planner_item.created', (event: PlannerItemSocketType) => {
            if (userId !== event.user.id && event.item.model_type === PlannerItemModelTypeEnum.todo) {
              dispatch(getTodo(event.item.id)).then((result) => {
                if (getTodo.fulfilled.match(result)) {
                  dispatch(addChecklist(result.payload));
                }
              });
            }
          })
          .listen('.planner_item.updated', (event: PlannerItemSocketType) => {
            if (userId !== event.user.id && event.item.model_type === PlannerItemModelTypeEnum.todo) {
              dispatch(getTodo(event.item.id)).then((result) => {
                if (getTodo.fulfilled.match(result)) {
                  dispatch(updateChecklistListItem(result.payload));
                }
              });
            }
          })
          .listen('.removed_planner_user.removed', (event: PlannerItemSocketType) => {
            if (userId !== event.user.id && event.item.model_type === PlannerItemModelTypeEnum.todo) {
              NotificationService.plannerItemUpdate(
                t('general.notifications.peopleDeletedFromTodo', { title: event.item.title }),
                `${event.user.first_name} ${event.user.last_name}`,
              );
              dispatch(removeChecklist(event.item.id));
            }
          })

          .listen('.planner_user.added', (event: PlannerItemSocketType) => {
            if (userId !== event.user.id) {
              if (event.item.model_type === PlannerItemModelTypeEnum.todo) {
                if (userId === event.user_id) {
                  dispatch(getTodo(event.item.id)).then((result) => {
                    if (getTodo.fulfilled.match(result)) {
                      dispatch(addChecklist(result.payload));
                    }
                  });
                }
              }
            }
          })

          .listen('.checklist.created', (event: PlannerItemSocketType) => {
            if (userId !== event.user.id) {
              if (event?.checklist?.id && event.entity_id) {
                // NotificationService.plannerItemUpdate(
                //   t('general.notifications.todoUpdatedBy', { title: event?.checklist?.body }),
                //   `${event.user.first_name} ${event.user.last_name}`,
                // );
                dispatch(getChecklistItem(event.checklist.id)).then((result) => {
                  if (getChecklistItem.fulfilled.match(result)) {
                    dispatch(
                      addChecklistItemToTodo({ todoId: event.entity_id || 1, checklistItem: result.payload }),
                    );
                  }
                });
              }
            }
          })
          .listen('.checklist.deleted', (event: PlannerItemSocketType) => {
            if (userId !== event.user.id) {
              if (event?.entity?.id && event.checklist_id) {
                // NotificationService.plannerItemUpdate(
                //   t('general.notifications.todoUpdatedBy', { title: event?.entity?.title }),
                //   `${event.user.first_name} ${event.user.last_name}`,
                // );
                dispatch(
                  deleteChecklistItem({
                    checklistId: event?.entity?.id || 1,
                    checklistItemId: event.checklist_id,
                  }),
                );
              }
            }
          })
          .listen('.checklist.status.changed', (event: PlannerItemSocketType) => {
            if (userId !== event.user.id) {
              if (event?.checklist?.id && event.entity_id) {
                // NotificationService.plannerItemUpdate(
                //   t('general.notifications.todoUpdatedBy', { title: event?.checklist?.body }),
                //   `${event.user.first_name} ${event.user.last_name}`,
                // );
                dispatch(getChecklistItem(event.checklist.id)).then((result) => {
                  if (getChecklistItem.fulfilled.match(result)) {
                    dispatch(
                      updateChecklistItemInTodo({
                        todoId: event.entity_id || 1,
                        checklistItem: result.payload,
                      }),
                    );
                  }
                });
              }
            }
          });
      }

      if (location.pathname === router.journal.path) {
        userChannel.listen('.planner_item.changed', (event: PlannerItemSocketType) => {
          dispatch(plannerSocketUpdateItem(event));
        });
        userChannel.listen('.planner_item.viewed', (event: PlannerItemSocketType) => {
          dispatch(plannerSocketUpdateItem(event, true, false));
        });
        userChannel.listen('.planner_item.updated', (event: PlannerItemSocketType) => {
          if (userId !== event.user.id) {
            dispatch(plannerSocketUpdateItem(event, true));
          }
        });
      }
      if (location.pathname === router.calendar.path) {
        userChannel.listen('.planner_item.changed', (event: PlannerItemSocketType) => {
          dispatch(calendarSocketUpdateItem(event));
        });
      }
      if (location.pathname === `${router.roadmap.path}`) {
        userChannel.listen('.planner_item.changed', (event: PlannerItemSocketType) => {
          dispatch(roadmapSocketUpdateItem(event));
        });
        userChannel.listen('.planner_item.viewed', (event: PlannerItemSocketType) => {
          dispatch(roadmapSocketUpdateItem(event, true, false));
        });
      }
      if (location.pathname === `${router.backlog.path}`) {
        userChannel.listen('.planner_item.changed', (event: PlannerItemSocketType) => {
          dispatch(backlogSocketUpdateItem(event));
        });
        userChannel.listen('.planner_item.viewed', (event: PlannerItemSocketType) => {
          dispatch(backlogSocketUpdateItem(event, true, false));
        });
      }
      if (location.pathname === `${router.events.path}`) {
        userChannel.listen('.planner_item.changed', (event: PlannerItemSocketType) => {
          dispatch(eventsSocketUpdateItem(event));
        });
        userChannel.listen('.planner_item.viewed', (event: PlannerItemSocketType) => {
          dispatch(eventsSocketUpdateItem(event, true, false));
        });
      }
      // if (location.pathname.includes(router.garage.path)) {
      //   userChannel.listen('.planner_item.changed', (event: PlannerItemSocketType) => {
      //     dispatch(garageSocketUpdatePaymentModal(event));
      //   });
      // }

      if (location.pathname === `${router.settings.path}/${router.settings.children.archive.path}`) {
        userChannel.listen('.planner_item.changed', (event: PlannerItemSocketType) => {
          dispatch(archiveSocketUpdateItem(event));
        });
      }
    }
    return () => {
      SocketConnect.connect.leave(`private-thread.${userId}`);
      SocketConnect.removeChannel(`private-thread.${userId}`);
      SocketConnect.connect.leave(`users.${userId}`);
      SocketConnect.removeChannel(`users.${userId}`);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userId, location.pathname, t]);

  return <></>;
};

export default GeneralSockets;
