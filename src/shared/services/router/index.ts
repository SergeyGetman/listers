import authRoute from './routes/auth';
import backlogRoute from './routes/bakclog';
import eventsRoute from './routes/events';
import roadmapRoute from './routes/roadmap';
import settingsRoute from './routes/settings';
import profileRoute from './routes/profile';
import networkRoute from './routes/network';
import chatRoute from './routes/chat';
import garageRoute from './routes/garage';
import feedbackRoute from './routes/feedback';
import calendarRoute from './routes/calendar';
import journalRoute from './routes/journal';
import todoRoute from './routes/todo';
import organizerRoute from './routes/organizer';
import garageNewRoute from './routes/garageNew';
import garageCreateCar from './routes/createCarNewGarage';
import networkNewRoute from './routes/networkNew';

const router = {
  auth: authRoute,
  calendar: calendarRoute,
  journal: journalRoute,
  backlog: backlogRoute,
  events: eventsRoute,
  roadmap: roadmapRoute,
  settings: settingsRoute,
  profile: profileRoute,
  network: networkRoute,
  networkNew: networkNewRoute,
  chat: chatRoute,
  garage: garageRoute,
  garageNew: garageNewRoute,
  feedback: feedbackRoute,
  todo: todoRoute,
  organizer: organizerRoute,
  createNewCar: garageCreateCar,
};

export default router;
