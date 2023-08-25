import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import InfoBtn from './InfoBtn';

export default {
  title: 'Components/Buttons/InfoBtn',
  component: InfoBtn,
} as ComponentMeta<typeof InfoBtn>;

const Template: ComponentStory<typeof InfoBtn> = (args) => <InfoBtn {...args} />;

export const InfoBtnStory = Template.bind({});
InfoBtnStory.args = {
  infoTooltipText: 'Tooltip text',
};
