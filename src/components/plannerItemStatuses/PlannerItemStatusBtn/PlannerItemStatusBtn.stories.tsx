import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PlannerItemStatusBtn from './PlannerItemStatusBtn';
import { PlannerItemStatusesEnum } from '../../../shared/enums/plannerItemStatuses.enum';

export default {
  title: 'Components/Buttons/StatusBtn',
  component: PlannerItemStatusBtn,
} as ComponentMeta<typeof PlannerItemStatusBtn>;

const Template: ComponentStory<typeof PlannerItemStatusBtn> = (args) => <PlannerItemStatusBtn {...args} />;

export const PlannerItemStatusBtnStory = Template.bind({});
PlannerItemStatusBtnStory.args = {
  variant: PlannerItemStatusesEnum.backlog,
};
