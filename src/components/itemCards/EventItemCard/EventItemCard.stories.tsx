import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import EventItemCard from './EventItemCard';
import { mockEventItem } from '../../../stories/mock/mockEventItem';

export default {
  title: 'Components/ItemsCard/EventItemCard',
  component: EventItemCard,
} as ComponentMeta<typeof EventItemCard>;

const Template: ComponentStory<typeof EventItemCard> = (args) => <EventItemCard {...args} />;

export const EventItemCardStory = Template.bind({});
EventItemCardStory.args = {
  event: mockEventItem,
  isArchive: false,
};
