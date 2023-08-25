import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PlusActionMenu from './PlusActionMenu';

export default {
  title: 'Components/ActionMenu/PlusActionMenu',
  component: PlusActionMenu,
} as ComponentMeta<typeof PlusActionMenu>;

const Template: ComponentStory<typeof PlusActionMenu> = (args) => <PlusActionMenu {...args} />;

export const PlusActionMenuStory = Template.bind({});

PlusActionMenuStory.args = {
  menuList: [
    {
      label: 'Appearance',
      callback: () => true,
      isDisabled: false,
    },
    {
      label: 'Task',
      callback: () => true,
      isDisabled: false,
    },
    {
      label: 'Event',
      callback: () => true,
      isDisabled: true,
    },
    {
      label: 'Meeting',
      callback: () => true,
      isDisabled: true,
      tooltipTitle: 'disabled tooltip',
      disableCallback: () => true,
    },
  ],
};
