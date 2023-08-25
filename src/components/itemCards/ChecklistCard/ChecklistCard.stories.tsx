import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import ChecklistCard from './ChecklistCard';
import { mockTodoItem } from '../../../stories/mock/mockTodoItem';

export default {
  title: 'Components/ItemsCard/ChecklistCard',
  component: ChecklistCard,
} as ComponentMeta<typeof ChecklistCard>;

const Template: ComponentStory<typeof ChecklistCard> = (args) => <ChecklistCard {...args} />;

export const ChecklistCardStory = Template.bind({});
ChecklistCardStory.args = {
  item: mockTodoItem,
};
