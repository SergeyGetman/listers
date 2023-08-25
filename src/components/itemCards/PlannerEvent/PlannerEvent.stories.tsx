import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import PlannerEvent from './PlannerEvent';
import { mockEventItem } from '../../../stories/mock/mockEventItem';

export default {
  title: 'Components/ItemsCard/PlannerEvent',
  component: PlannerEvent,
} as ComponentMeta<typeof PlannerEvent>;

const Template: ComponentStory<typeof PlannerEvent> = (args) => <PlannerEvent {...args} />;

export const PlannerEventStory = Template.bind({});
PlannerEventStory.args = {
  item: mockEventItem,
  containerDate: new Date().toLocaleString(),
};
