import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import ActionButton from './ActionButton';
import { PlannerItemStatusesEnum } from '../../../shared/enums/plannerItemStatuses.enum';

export default {
  title: 'Components/Buttons/ActionButton',
  component: ActionButton,
} as ComponentMeta<typeof ActionButton>;

const Template: ComponentStory<typeof ActionButton> = (args) => <ActionButton {...args} />;

export const ActionButtonStory = Template.bind({});
ActionButtonStory.args = {
  variant: PlannerItemStatusesEnum.accept,
};
