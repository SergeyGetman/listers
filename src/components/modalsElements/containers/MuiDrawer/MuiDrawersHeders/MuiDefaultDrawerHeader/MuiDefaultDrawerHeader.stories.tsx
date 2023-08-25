import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MuiDefaultDrawerHeader from './MuiDefaultDrawerHeader';

export default {
  title: 'Components/Modals/Headers',
  component: MuiDefaultDrawerHeader,
} as ComponentMeta<typeof MuiDefaultDrawerHeader>;

const Template: ComponentStory<typeof MuiDefaultDrawerHeader> = (args) => (
  <MuiDefaultDrawerHeader {...args} />
);

export const MuiDefaultDrawerHeaderStory = Template.bind({});
MuiDefaultDrawerHeaderStory.args = {
  title: 'hello world',
  onClose: () => {},
};
