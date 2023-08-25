import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import BaseNotification from './BaseNotification';

export default {
  title: 'Components/Notifications/BaseNotifications',
  component: BaseNotification,
} as ComponentMeta<typeof BaseNotification>;

const Template: ComponentStory<typeof BaseNotification> = (args) => <BaseNotification {...args} />;

export const BaseNotificationStory = Template.bind({});
BaseNotificationStory.args = {
  variant: 'success',
  msg: 'The task status has been successfully updated.',
  onClose: () => true,
};
