import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Gallery from '.';
import { testMedia } from '../../../shared/enums/testMedia.enum';

export default {
  title: 'Components/Gallery',
  component: Gallery,
} as ComponentMeta<typeof Gallery>;

const Template: ComponentStory<typeof Gallery> = (args) => <Gallery {...args} />;

export const GalleryStory = Template.bind({});

GalleryStory.args = {
  media: testMedia,
};
