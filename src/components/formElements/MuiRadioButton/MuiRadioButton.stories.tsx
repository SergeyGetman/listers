import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MuiRadioButton from './MuiRadioButton';

export default {
  title: 'Components/Inputs/RadioButton',
  component: MuiRadioButton,
} as ComponentMeta<typeof MuiRadioButton>;

const Template: ComponentStory<typeof MuiRadioButton> = (args) => <MuiRadioButton {...args} />;

export const MuiRadioButtonStory = Template.bind({});
MuiRadioButtonStory.args = { label: 'Hello world', checked: true };
