import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import NetworkUserCard from './NetworkUserCard';
import { NetworkUserStatus } from '../../../shared/enums/networkUserStatus.enum';

export default {
  title: 'Components/ItemsCard/NetworkCard',
  component: NetworkUserCard,
} as ComponentMeta<typeof NetworkUserCard>;

const Template: ComponentStory<typeof NetworkUserCard> = (args) => <NetworkUserCard {...args} />;

export const NetworkUserCardStory = Template.bind({});

NetworkUserCardStory.args = {
  id: 6,
  first_name: 'User',
  last_name: 'PC',
  full_name: 'User PC',
  userRole: 'Friend',
  entity_type: NetworkUserStatus.incoming,
  onClickButton: () => true,
  userShortInfo: {
    address: {
      map: { lat: 39.09366509575983, lng: -94.58751660204751 },
      physical_address: '240 Smart Rd, St Agnes SA 5097, Australia',
    },
    email: 'email@gmail.com',
    phone: '+380666111111',
  },
  avatar: '',
  menuListItems: [
    {
      callback: () => {},
      isDisabled: false,
      label: 'Edit',
    },
  ],
};
