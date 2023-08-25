import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import UserInfoPopover from './UserInfoPopover';

import { PlannerItemStatusesEnum } from '../../../shared/enums/plannerItemStatuses.enum';
import MuiAvatar from '../../avatars/MuiAvatart';

export default {
  title: 'Components/Popovers/UserInfoPopover',
  component: UserInfoPopover,
} as ComponentMeta<typeof UserInfoPopover>;

const Template: ComponentStory<typeof UserInfoPopover> = (args) => <UserInfoPopover {...args} />;

const owner = {
  avatar: {
    additional_info: {
      in_progress: false,
      size_urls: {
        avatar_icon: '/storage/avatar_preview/2022/04/15/ltOa1jzFVvrXHqJZ/avatar_icon.jpeg',
        avatar_profile: '/storage/avatar_preview/2022/04/15/ltOa1jzFVvrXHqJZ/avatar_profile.jpeg',
      },
      sizes: ['avatar_icon', 'avatar_profile'],
    },

    created_at: '2022-05-31 13:35:24',
    filename: 'original',
    id: 21100,
    original_filename: '20220531_1635.jpeg',
    url: '/storage/avatar_preview/2022/04/15/ltOa1jzFVvrXHqJZ/original.jpeg',
  },
  connection_role: 'Parent',
  contacts: {
    current_address: {
      map: {
        lat: 1313,
        lng: 33,
      },
      physical_address: 'test',
    },
    emails: [{ type: 'home', value: 'hubmee' }],
    hometown_address: {
      map: {
        lat: 1313,
        lng: 33,
      },
      physical_address: 'test test',
    },
    is_same_hometown: false,
    phones: [{ type: 'home', value: '+380635767528', country: 'UA' }],
    urls: [],
    is_company: false,
  },
  entity_type: 'friend',
  first_name: 'Юрчик',
  id: 1279,
  is_can_view_media: false,
  is_fake: 0,
  last_name: 'Мухомор',
  package: 'personal_hub',
  recurring_group: null,

  status: PlannerItemStatusesEnum.in_progress,
};

export const UserListPopoverStory = Template.bind({});
UserListPopoverStory.args = {
  item: owner,
  userId: 228,
  children: (
    <MuiAvatar
      firstName="Yara"
      lastName="Kravchuk"
      src="/storage/avatar_preview/2022/04/15/ltOa1jzFVvrXHqJZ/original.jpeg"
      id={22}
    />
  ),
};
