import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MuiSelect from './MuiSelect';

export default {
  title: 'Components/Selects',
  component: MuiSelect,
} as ComponentMeta<typeof MuiSelect>;

const Template: ComponentStory<typeof MuiSelect> = (args) => <MuiSelect {...args} />;

export const MuiSelectStory = Template.bind({});
MuiSelectStory.args = {
  label: 'Select',
  options: [
    { value: 'test1', label: 'label' },
    { value: 'test2', label: 'label' },
    { value: 'test3', label: 'label' },
    { value: 'test4', label: 'label' },
    { value: 'test5', label: 'label' },
  ],
};
