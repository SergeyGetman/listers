import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import NavigationButton from './NavigationButton';

export default {
  title: 'Components/Buttons/NavigationButton',
  component: NavigationButton,
} as ComponentMeta<typeof NavigationButton>;

const Template: ComponentStory<typeof NavigationButton> = (args) => <NavigationButton {...args} />;

export const NavigationButtonStory = Template.bind({});
NavigationButtonStory.args = {
  type: 'back',
  size: 'large',
};
