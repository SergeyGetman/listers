import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { personalChatStubConfig } from '../../../shared/configs/stub.config';
import Stub from './Stub';

export default {
  title: 'Components/stubs/TodoStub',
  component: Stub,
} as ComponentMeta<typeof Stub>;

const Template: ComponentStory<typeof Stub> = (args) => <Stub {...args} />;

export const StubStory = Template.bind({});

StubStory.args = {
  value: personalChatStubConfig,
};
