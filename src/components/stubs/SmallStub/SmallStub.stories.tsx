import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { networkInviteStubConfig } from '../../../shared/configs/stub.config';
import SmallStub from './SmallStub';

export default {
  title: 'Components/stubs/SmallStub',
  component: SmallStub,
} as ComponentMeta<typeof SmallStub>;

const Template: ComponentStory<typeof SmallStub> = (args) => <SmallStub {...args} />;

export const SmallStubStory = Template.bind({});

SmallStubStory.args = {
  value: networkInviteStubConfig,
};
