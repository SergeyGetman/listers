import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import PaperActionMenu from '../components/actionMenus/PaperActionMenu';
import { PlannerItemStatusesEnum } from '../shared/enums/plannerItemStatuses.enum';
import { plannerItemPriorityConfig } from '../shared/configs/plannerItemPriority.config';
import PopoverButton from '../components/buttons/PopoverButton';

export default {
  title: 'Components/ActionMenu/PriorityActionMenu',
  component: PaperActionMenu,
} as ComponentMeta<typeof PaperActionMenu>;

const Template: ComponentStory<typeof PaperActionMenu> = (args) => <PaperActionMenu {...args} />;

export const PriorityActionMenuStory = Template.bind({});

PriorityActionMenuStory.args = {
  activeItem: PlannerItemStatusesEnum.backlog,
  menuList: [
    {
      item: plannerItemPriorityConfig.high,
      callback: () => true,
      isDisabled: false,
    },
    {
      item: plannerItemPriorityConfig.middle,
      callback: () => true,
      isDisabled: false,
    },
    {
      item: plannerItemPriorityConfig.low,
      callback: () => true,
      isDisabled: true,
    },
    {
      item: plannerItemPriorityConfig.none,
      callback: () => true,
      isDisabled: false,
    },
  ],
  children: (
    <PopoverButton
      startIcon={
        <plannerItemPriorityConfig.high.icon sx={{ color: plannerItemPriorityConfig.high.iconColor }} />
      }
      label="Priority"
    />
  ),
};
