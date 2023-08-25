import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MuiPreloader from './MuiPreloader';

export default {
  title: 'Components/Preloader',
  component: MuiPreloader,
} as ComponentMeta<typeof MuiPreloader>;

const Template: ComponentStory<typeof MuiPreloader> = (args) => <MuiPreloader {...args} />;

export const MuiPreloaderStory = Template.bind({});
MuiPreloaderStory.args = { isShow: true };
