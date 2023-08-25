import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import TodoCard from './TodoCard';
import { mockTodoItem } from '../../../stories/mock/mockTodoItem';

export default {
  title: 'Components/ItemsCard/TodoCard',
  component: TodoCard,
} as ComponentMeta<typeof TodoCard>;

const Template: ComponentStory<typeof TodoCard> = (args) => <TodoCard {...args} />;

export const TodoCardStory = Template.bind({});
TodoCardStory.args = {
  item: mockTodoItem,
};
