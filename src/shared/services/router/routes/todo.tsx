import { lazy, memo } from 'react';
import { componentLoader } from '../../../utils/componentLoader';
import Checklists from '../../../../pages/TodoNew/components/Checklists';
import Notes from '../../../../pages/TodoNew/components/Notes';

const ToDo = memo(lazy(() => componentLoader(() => import('../../../../pages/TodoNew'))));
const todoRoute = {
  path: '/todo',
  component: <ToDo />,
  index: true,
  children: {
    checklists: {
      path: ``,
      component: <Checklists />,
    },
    notes: {
      path: `notes`,
      component: <Notes />,
    },
  },
};
export default todoRoute;
