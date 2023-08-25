import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MuiAvatar from './MuiAvatar';

export default {
  title: 'Components/Avatars',
  component: MuiAvatar,
} as ComponentMeta<typeof MuiAvatar>;

const Template: ComponentStory<typeof MuiAvatar> = (args) => <MuiAvatar {...args} />;

export const MuiAvatarStory = Template.bind({});
MuiAvatarStory.args = {
  size: 'medium',
  firstName: 'Ivan',
  lastName: 'Vlasenko',
  isOnline: true,
  variant: 'circular',
  src: '',
  id: 1234,
};
