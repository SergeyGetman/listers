import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import MuiLoadingButton from './MuiLoadingButton';

export default {
  title: 'Components/Buttons/MuiLoadingButton',
  component: MuiLoadingButton,
} as ComponentMeta<typeof MuiLoadingButton>;

const Template: ComponentStory<typeof MuiLoadingButton> = (args) => <MuiLoadingButton {...args} />;

export const MuiLoadingButtonStory = Template.bind({});
MuiLoadingButtonStory.args = {
  loading: true,
  label: 'Button Label',
};
