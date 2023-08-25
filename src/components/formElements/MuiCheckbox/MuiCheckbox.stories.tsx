import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MuiCheckbox from './MuiCheckbox';

export default {
  title: 'Components/Inputs/MuiCheckbox',
  component: MuiCheckbox,
} as ComponentMeta<typeof MuiCheckbox>;

const Template: ComponentStory<typeof MuiCheckbox> = (args) => <MuiCheckbox {...args} />;

export const MuiCheckboxStory = Template.bind({});
MuiCheckboxStory.args = { label: 'hello world' };
