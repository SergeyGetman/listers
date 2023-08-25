import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MuiSwitch from './MuiSwitch';

export default {
  title: 'Components/Inputs/MuiSwitch',
  component: MuiSwitch,
  argTypes: {
    isDisabled: {
      defaultValue: true,
    },
    onChange: {
      type: () => 'void',
    },
    checked: {
      type: 'boolean',
    },
    label: {
      type: 'string',
    },
    labelLeft: {
      type: 'string',
    },
    labelRight: {
      type: 'string',
    },
  },
} as ComponentMeta<typeof MuiSwitch>;

const Template: ComponentStory<typeof MuiSwitch> = (args) => <MuiSwitch {...args} />;

export const MuiSwitchStory = Template.bind({});
MuiSwitchStory.args = {
  label: 'hello world',
  isDisabled: false,
  isContainTwoLabel: false,
  labelLeft: 'off',
  labelRight: 'on',
};
