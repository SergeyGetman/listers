import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MuiButton from './MuiButton';

export default {
  title: 'Components/Buttons/MuiButton',
  component: MuiButton,
} as ComponentMeta<typeof MuiButton>;

const Template: ComponentStory<typeof MuiButton> = (args) => <MuiButton {...args} />;

export const MuiButtonStory = Template.bind({});
MuiButtonStory.args = {
  label: 'Hello world',
  size: 'large',
};
