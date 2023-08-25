import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import BaseActionMenu from './BaseActionMenu';

export default {
  title: 'Components/ActionMenu/BaseActionMenu',
  component: BaseActionMenu,
} as ComponentMeta<typeof BaseActionMenu>;

const Template: ComponentStory<typeof BaseActionMenu> = (args) => <BaseActionMenu {...args} />;

export const BaseActionMenuStory = Template.bind({});

BaseActionMenuStory.args = {
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
