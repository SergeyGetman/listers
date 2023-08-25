import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MuiBaseTextFiled from './MuiBaseTextFiled';

export default {
  title: 'Components/Inputs/MuiBaseTextFiled',
  component: MuiBaseTextFiled,
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
} as ComponentMeta<typeof MuiBaseTextFiled>;

const Template: ComponentStory<typeof MuiBaseTextFiled> = (args) => <MuiBaseTextFiled {...args} />;

export const MuiBaseTextFiledStory = Template.bind({});
MuiBaseTextFiledStory.args = {
  label: 'Name',
  placeholder: 'Enter your name...',
};
