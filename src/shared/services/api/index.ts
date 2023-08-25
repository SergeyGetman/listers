import auth from './endpoints/auth';
import rightSidebar from './endpoints/rightSidebar';
import common from './endpoints/common';
import profile from './endpoints/profile';
import chat from './endpoints/chat';
import backlog from './endpoints/backlog';
import task from './endpoints/task';
import checklists from './endpoints/checklists';
import todoChecklists from './endpoints/todoChecklists';
import todoNotes from './endpoints/todoNotes';
import notes from './endpoints/notes';
import comments from './endpoints/comments';
import roadmap from './endpoints/roadmap';
import archive from './endpoints/archive';
import event from './endpoints/event';
import network from './endpoints/network';
import calendar from './endpoints/calendar';
import planner from './endpoints/planner';
import garage from './endpoints/garage';
import todo from './endpoints/todo';
import payment from './endpoints/payment';
import wallet from './endpoints/wallet';
import settings from './endpoints/settings';
import garageV2 from './endpoints/garageV2';
import meeting from './endpoints/meeting';
const allEndpoints = {
  auth,
  profile,
  common,
  rightSidebar,
  chat,
  backlog,
  task,
  event,
  checklists,
  todoChecklists,
  todoNotes,
  notes,
  comments,
  roadmap,
  archive,
  network,
  calendar,
  garage,
  garageV2,
  planner,
  todo,
  wallet,
  payment,
  settings,
  meeting,
};

export default allEndpoints;
