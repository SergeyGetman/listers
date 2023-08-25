import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PlannerItemStatusesView from './PlannerItemStatusesView';
import { PlannerItemStatusesEnum } from '../../../shared/enums/plannerItemStatuses.enum';

export default {
  title: 'Components/Statuses/StatusesView',
  component: PlannerItemStatusesView,
} as ComponentMeta<typeof PlannerItemStatusesView>;

const Template: ComponentStory<typeof PlannerItemStatusesView> = (args) => (
  <PlannerItemStatusesView {...args} />
);

export const PlannerItemStatusesViewStory = Template.bind({});
PlannerItemStatusesViewStory.args = {
  variant: PlannerItemStatusesEnum.backlog,
};
