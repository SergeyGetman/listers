import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MuiCurrencyTextFiled from './MuiCurrencyTextFiled';

export default {
  title: 'Components/Inputs/MuiCurrencyTextFiled',
  component: MuiCurrencyTextFiled,
} as ComponentMeta<typeof MuiCurrencyTextFiled>;

const Template: ComponentStory<typeof MuiCurrencyTextFiled> = (args) => <MuiCurrencyTextFiled {...args} />;

export const MuiCurrencyTextFiledStory = Template.bind({});
MuiCurrencyTextFiledStory.args = {
  label: 'Total',
  placeholder: '$ - Auto summ',
};
