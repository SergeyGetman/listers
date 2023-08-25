import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import UserListPopover from './UserListPopover';
import { PlannerItemStatusesEnum } from '../../../shared/enums/plannerItemStatuses.enum';
import MuiButton from '../../buttons/MuiButton';

export default {
  title: 'Components/Popovers/UserListPopover',
  component: UserListPopover,
} as ComponentMeta<typeof UserListPopover>;

const Template: ComponentStory<typeof UserListPopover> = (args) => <UserListPopover {...args} />;

const formatUsers = [
  {
    avatar: {
      additional_info: {
        in_progress: false,
        size_urls: {
          avatar_icon: '/storage/avatar_preview/2021/11/02/aFG3DwFGV0Xcqctv/avatar_icon.jpeg',
          avatar_profile: '/storage/avatar_preview/2021/11/02/aFG3DwFGV0Xcqctv/avatar_profile.jpeg',
        },
        sizes: ['avatar_icon', 'avatar_profile'],
      },
      created_at: '2022-05-09 07:19:36',
      filename: 'original',
      id: 20682,
      original_filename: '20220509_1019.jpeg',
      url: '/storage/avatar_preview/2021/11/02/aFG3DwFGV0Xcqctv/original.jpeg',
    },
    connection_role: 'Friend',
    contacts: null,
    entity_type: 'friend',
    first_name: 'Вася',
    id: 1286,
    is_can_view_media: false,
    is_fake: 0,
    last_name: 'Бой',
    package: 'personal_hub',
    recurring_group: null,
    status: PlannerItemStatusesEnum.done,
  },
  {
    avatar: {
      additional_info: {
        in_progress: false,
        size_urls: {
          avatar_icon: '/storage/avatar_preview/2022/06/01/yTe5zQuC1B5VWA86/avatar_icon.jpeg',
          avatar_profile: '/storage/avatar_preview/2022/06/01/yTe5zQuC1B5VWA86/avatar_profile.jpeg',
        },
        sizes: ['avatar_icon', 'avatar_profile'],
      },
      created_at: '2022-05-09 07:19:36',
      filename: 'original',
      id: 20682,
      original_filename: '20220509_1019.jpeg',
      url: '/storage/avatar_preview/2022/06/01/yTe5zQuC1B5VWA86/original.jpeg',
    },
    connection_role: 'Friend',
    contacts: null,
    entity_type: 'friend',
    first_name: 'Ivan',
    id: 1282,
    is_can_view_media: false,
    is_fake: 0,
    last_name: 'Vlasenko',
    package: 'personal_hub',
    recurring_group: null,
    status: PlannerItemStatusesEnum.done,
  },
  {
    avatar: null,
    connection_role: 'Friend',
    contacts: null,
    entity_type: 'friend',
    first_name: 'andrii',
    id: 1276,
    is_can_view_media: false,
    is_fake: 0,
    last_name: 'shcherbyna',
    package: 'personal_hub',
    recurring_group: null,
    status: PlannerItemStatusesEnum.todo,
  },
  {
    avatar: {
      additional_info: {
        in_progress: false,
        size_urls: {
          avatar_icon: '/storage/avatar_preview/2022/05/31/haMgrzBcusSUSXMv/avatar_icon.jpeg',
          avatar_profile: '/storage/avatar_preview/2022/05/31/haMgrzBcusSUSXMv/avatar_profile.jpeg',
        },
        sizes: ['avatar_icon', 'avatar_profile'],
      },
      created_at: '2022-05-31 13:35:24',
      filename: 'original',
      id: 21100,
      original_filename: '20220531_1635.jpeg',
      url: '/storage/avatar_preview/2022/05/31/haMgrzBcusSUSXMv/original.jpeg',
    },
    connection_role: 'Parent',
    contacts: null,
    entity_type: 'friend',
    first_name: 'Mila',
    id: 1279,
    is_can_view_media: false,
    is_fake: 0,
    last_name: 'Petrenko',
    package: 'personal_hub',
    recurring_group: null,
    status: PlannerItemStatusesEnum.todo,
  },
  {
    avatar: {
      additional_info: {
        in_progress: false,
        size_urls: {
          avatar_icon: '/storage/avatar_preview/2021/11/08/laGjfKyS7fqyG9zM/avatar_icon.jpeg',
          avatar_profile: '/storage/avatar_preview/2021/11/08/laGjfKyS7fqyG9zM/avatar_profile.jpeg',
        },
        sizes: ['avatar_icon', 'avatar_profile'],
      },
      created_at: '2022-05-31 13:35:24',
      filename: 'original',
      id: 21100,
      original_filename: '20220531_1635.jpeg',
      url: '/storage/avatar_preview/2021/11/08/laGjfKyS7fqyG9zM/original.jpeg',
    },
    connection_role: 'Parent',
    contacts: null,
    entity_type: 'friend',
    first_name: 'Stas',
    id: 1281,
    is_can_view_media: false,
    is_fake: 0,
    last_name: 'Khort',
    package: 'personal_hub',
    recurring_group: null,
    status: PlannerItemStatusesEnum.done,
  },
];
export const UserListPopoverStory = Template.bind({});
UserListPopoverStory.args = {
  users: formatUsers,
  maxUserShow: null,
  children: <MuiButton isStopPropagation={false} label="open menu" />,
};
