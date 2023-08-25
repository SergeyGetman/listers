import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import PlannerPayment from './PlannerPayment';

export default {
  title: 'Components/ItemsCard/PlannerPayment',
  component: PlannerPayment,
} as ComponentMeta<typeof PlannerPayment>;

const Template: ComponentStory<typeof PlannerPayment> = (args) => <PlannerPayment {...args} />;

export const PlannerPaymentStory = Template.bind({});
PlannerPaymentStory.args = {};
