import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AdditionalInfo from './AdditionalInfo';

export default {
  title: 'Components/AdditionalInfo',
  component: AdditionalInfo,
} as ComponentMeta<typeof AdditionalInfo>;

const Template: ComponentStory<typeof AdditionalInfo> = (args) => <AdditionalInfo {...args} />;

export const AdditionalInfoStory = Template.bind({});

AdditionalInfoStory.args = {
  photo_count: 1,
  comment_count: 1,
  document_count: 1,
  is_unread_documents: true,
};
