import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import PaperActionMenu from '../components/actionMenus/PaperActionMenu';
import { PlannerItemStatusesEnum } from '../shared/enums/plannerItemStatuses.enum';

import PlannerItemStatusesView from '../components/plannerItemStatuses/PlannerItemStatusesView';
import { plannerItemStatusesConfig } from '../shared/configs/plannerItemStatuses.config';

export default {
  title: 'Components/ActionMenu/StatusesActionMenu',
  component: PaperActionMenu,
} as ComponentMeta<typeof PaperActionMenu>;

const Template: ComponentStory<typeof PaperActionMenu> = (args) => <PaperActionMenu {...args} />;

export const StatusesActionMenuStory = Template.bind({});

StatusesActionMenuStory.args = {
  activeItem: PlannerItemStatusesEnum.backlog,
  menuList: [
    {
      item: plannerItemStatusesConfig.todo,
      callback: () => true,
      isDisabled: false,
    },
    {
      item: plannerItemStatusesConfig.backlog,
      callback: () => true,
      isDisabled: false,
    },
    {
      item: plannerItemStatusesConfig.done,
      callback: () => true,
      isDisabled: true,
    },
  ],
  children: <PlannerItemStatusesView variant={PlannerItemStatusesEnum.backlog} />,
};
