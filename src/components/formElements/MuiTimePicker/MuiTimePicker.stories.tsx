import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MuiTimePicker from './MuiTimePicker';

export default {
  title: 'Components/Inputs/MuiTimePicker',
  component: MuiTimePicker,
  argTypes: {
    isDisabled: {
      type: 'boolean',
    },
    onChange: {
      type: () => 'void',
    },
    isRequired: {
      type: 'boolean',
    },
    isReadOnly: {
      type: 'boolean',
    },
    isFullWidth: {
      type: 'boolean',
    },
    isError: {
      type: 'boolean',
    },
    isShrink: {
      type: 'boolean',
    },
    label: {
      type: 'string',
    },
    placeholder: {
      type: 'string',
    },
    helperText: {
      type: 'string',
    },
    errorMessage: {
      type: 'string',
    },
    size: {
      type: 'string',
      defaultValue: 'small',
      control: { type: 'radio' },
      options: ['small', 'medium'],
    },
  },
} as ComponentMeta<typeof MuiTimePicker>;

const Template: ComponentStory<typeof MuiTimePicker> = (args) => <MuiTimePicker {...args} />;

export const MuiTimePickerStory = Template.bind({});
MuiTimePickerStory.args = {
  label: 'Name',
  placeholder: 'HH:MM',
};
