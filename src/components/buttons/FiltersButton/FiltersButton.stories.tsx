import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import FiltersButton from './FiltersButton';

export default {
  title: 'Components/Buttons/FiltersButton',
  component: FiltersButton,
} as ComponentMeta<typeof FiltersButton>;

const Template: ComponentStory<typeof FiltersButton> = (args) => <FiltersButton {...args} />;

export const FiltersButtonStory = Template.bind({});
FiltersButtonStory.args = {
  label: 'Button Label',
  count: 10,
  isHideTextOnMobile: true,
};
