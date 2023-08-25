import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import TaskItemCard from './TaskItemCard';
import { mockTaskItem } from '../../../stories/mock/mockTaskItem';

export default {
  title: 'Components/ItemsCard/TaskItemCard',
  component: TaskItemCard,
} as ComponentMeta<typeof TaskItemCard>;

const Template: ComponentStory<typeof TaskItemCard> = (args) => <TaskItemCard {...args} />;

export const TaskItemCardStory = Template.bind({});
TaskItemCardStory.args = {
  task: mockTaskItem,
  isArchive: false,
};
