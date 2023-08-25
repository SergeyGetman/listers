import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import ChecklistItemCard from './ChecklistItemCard';
import { ChecklistItemStatusEnum } from '../../../shared/enums/checklistItemStatus.enum';
import { PlannerItemStatusesEnum } from '../../../shared/enums/plannerItemStatuses.enum';

export default {
  title: 'Components/ItemsCard/ChecklistItemCard',
  component: ChecklistItemCard,
} as ComponentMeta<typeof ChecklistItemCard>;

const Template: ComponentStory<typeof ChecklistItemCard> = (args) => <ChecklistItemCard {...args} />;

export const ChecklistItemCardStory = Template.bind({});
ChecklistItemCardStory.args = {
  item: {
    creator: {
      avatar: null,
      connection_role: 'ssss',
      entity_type: 'sss',
      first_name: 'Yuriy',
      full_name: 'Yuriy Kravchenko',
      id: 2128,
      is_fake: 1,
      last_name: 'Kravchenko',
      package: 'personal_hub',
      status: PlannerItemStatusesEnum.backlog,
    },
    body: 'My note with long title and two lines of text goes here',
    status: ChecklistItemStatusEnum.done,
    updated_at: '2022-06-06 15:51:12',
    id: 1488,
  },
  hasEditPermission: true,
};
