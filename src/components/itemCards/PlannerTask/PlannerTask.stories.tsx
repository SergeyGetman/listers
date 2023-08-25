import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import PlannerTask from './PlannerTask';
import { mockTaskItem } from '../../../stories/mock/mockTaskItem';

export default {
  title: 'Components/ItemsCard/PlannerTask',
  component: PlannerTask,
} as ComponentMeta<typeof PlannerTask>;

const Template: ComponentStory<typeof PlannerTask> = (args) => <PlannerTask {...args} />;

export const PlannerTaskStory = Template.bind({});
PlannerTaskStory.args = {
  item: mockTaskItem,
  containerDate: new Date().toLocaleString(),
};
