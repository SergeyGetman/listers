import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CircularButton from './CircularButton';

export default {
  title: 'Components/Buttons/CircularButton',
  component: CircularButton,
} as ComponentMeta<typeof CircularButton>;

const Template: ComponentStory<typeof CircularButton> = (args) => <CircularButton {...args} />;

export const CircularButtonStory = Template.bind({});
CircularButtonStory.args = {
  size: 'large',
};
