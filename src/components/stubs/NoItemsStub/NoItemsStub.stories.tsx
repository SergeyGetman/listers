import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { todoNoItemsStubConfig } from '../../../shared/configs/stub.config';
import NoItemsStub from './NoItemsStub';

export default {
  title: 'Components/stubs/NoItemsStub',
  component: NoItemsStub,
} as ComponentMeta<typeof NoItemsStub>;

const Template: ComponentStory<typeof NoItemsStub> = (args) => <NoItemsStub {...args} />;

export const StubStory = Template.bind({});

StubStory.args = {
  value: todoNoItemsStubConfig,
};
