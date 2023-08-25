import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import CommentsItemCard from './CommentsItemCard';
import { mockCommentsItems } from '../../../stories/mock/mockCommentsItems';

export default {
  title: 'Components/ItemsCard/CommentsItemCard',
  component: CommentsItemCard,
} as ComponentMeta<typeof CommentsItemCard>;

const Template: ComponentStory<typeof CommentsItemCard> = (args) => <CommentsItemCard {...args} />;

export const CommentsItemCardStory = Template.bind({});
CommentsItemCardStory.args = {
  item: mockCommentsItems,
  creatorId: 1286,
  currentUserId: 1286,
  hasEditPermission: true,
};
