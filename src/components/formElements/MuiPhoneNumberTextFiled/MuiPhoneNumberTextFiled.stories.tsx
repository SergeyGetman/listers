import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MuiPhoneNumberTextFiled from './MuiPhoneNumberTextFiled';

export default {
  title: 'Components/Inputs/MuiPhoneNumber',
  component: MuiPhoneNumberTextFiled,
} as ComponentMeta<typeof MuiPhoneNumberTextFiled>;

const Template: ComponentStory<typeof MuiPhoneNumberTextFiled> = (args) => (
  <MuiPhoneNumberTextFiled {...args} />
);

export const MuiPhoneNumberTextFiledStory = Template.bind({});
MuiPhoneNumberTextFiledStory.args = {
  label: 'Phone',
  onChange: () => true,
  placeholder: 'Enter your phone',
};
