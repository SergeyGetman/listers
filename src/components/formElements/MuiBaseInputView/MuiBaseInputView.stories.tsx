import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MuiBaseInputView from './MuiBaseInputView';

export default {
  title: 'Components/InputView',
  component: MuiBaseInputView,
} as ComponentMeta<typeof MuiBaseInputView>;

const Template: ComponentStory<typeof MuiBaseInputView> = (args) => <MuiBaseInputView {...args} />;

export const MuiBaseInputViewStory = Template.bind({});
MuiBaseInputViewStory.args = { label: 'due-date', content: '12/19/2021' };
