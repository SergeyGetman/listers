import { configureStore } from '@reduxjs/toolkit';
import commonReducer from './Common/commonSlice';
import rightSidebarReducer from './RightSidebar/rightSidebarSlice';
import notificationsReducer from './RightSidebar/Notifications/notificationsSlice';
import profileReducer from './Profile/profile.slice';
import chatReducer from './chat/chatSlice';
import roadmapReducer from './roadmap/roadmapSlice';
import eventsReducer from './events/eventsSlice';
import backlogReducer from './backlog/backlogSlice';
import todoChecklistsReducer from './todo/Checklists/checklistsSlice';
import todoNotesReducer from './todo/Notes/notesSlice';
import checklistsReducer from './checklists/checklistsSlice';
import notesReducer from './notes/notesSlice';
import commentsReducer from './comments/commentsSlice';
import archiveReducer from './archive/archiveSlice';
import networkReducer from './network/networkSlice';
import calendarReducer from './calendar/calendarSlice';
import plannerReducer from './planner/plannerSlice';
import garageReducer from './garage/garageSlice';
import todoReducer from './todo/todoSlice';
import walletReducer from './wallet/walletSlice';
import settingReducer from './settings/settingsSlice';
import { initializeApi } from '../shared/services/api/axios';
import { garageReducerV2 } from '../pages/GarageNew/store/garageSliceV2';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    common: commonReducer,
    // modals: modalsReducer,
    rightSidebar: rightSidebarReducer,
    notifications: notificationsReducer,
    profile: profileReducer,
    chat: chatReducer,
    roadmap: roadmapReducer,
    events: eventsReducer,
    backlog: backlogReducer,
    checklists: checklistsReducer,
    todoChecklists: todoChecklistsReducer,
    todoNotes: todoNotesReducer,
    notes: notesReducer,
    comments: commentsReducer,
    archive: archiveReducer,
    network: networkReducer,
    calendar: calendarReducer,
    planner: plannerReducer,
    garage: garageReducer,
    garageV2: garageReducerV2,
    todo: todoReducer,
    wallet: walletReducer,
    settings: settingReducer,
  },
});

initializeApi(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
