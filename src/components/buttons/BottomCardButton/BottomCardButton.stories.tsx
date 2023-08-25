import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import BottomCardButton from './BottomCardButton';

export default {
  title: 'Components/Buttons/BottomCardButton',
  component: BottomCardButton,
} as ComponentMeta<typeof BottomCardButton>;

const Template: ComponentStory<typeof BottomCardButton> = (args) => <BottomCardButton {...args} />;

export const BottomCardButtonStory = Template.bind({});
BottomCardButtonStory.args = {
  loading: false,
  isActivated: false,
  label: 'Button Label',
};
