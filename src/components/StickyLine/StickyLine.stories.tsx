import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import StickyLine from './StickyLine';
import { NetworkUserStatus } from '../../shared/enums/networkUserStatus.enum';

export default {
  title: 'Components/StickyLine',
  component: StickyLine,
} as ComponentMeta<typeof StickyLine>;

const Template: ComponentStory<typeof StickyLine> = (args) => <StickyLine {...args} />;

export const StickyLineStory = Template.bind({});

StickyLineStory.args = {
  type: NetworkUserStatus.friend,
};
