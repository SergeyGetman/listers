import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PayDateInputView from './PayDateInputView';

export default {
  title: 'Components/formElements/PayDateInputView',
  component: PayDateInputView,
} as ComponentMeta<typeof PayDateInputView>;

const Template: ComponentStory<typeof PayDateInputView> = (args) => <PayDateInputView {...args} />;

export const PayDateInputViewStory = Template.bind({});

PayDateInputViewStory.args = {
  label: 'Purchase date',
  date: '07/07/21',
};
