import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Thread from './Thread';

export default {
  title: 'Chat/Thread',
  component: Thread,
} as ComponentMeta<typeof Thread>;

const Template: ComponentStory<typeof Thread> = (args) => <Thread {...args} />;

export const ThreadStory = Template.bind({});
ThreadStory.args = {};
