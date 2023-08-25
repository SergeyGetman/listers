import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import LocationView from './LocationView';

export default {
  title: 'Components/Locations/LocationView',
  component: LocationView,
} as ComponentMeta<typeof LocationView>;

const Template: ComponentStory<typeof LocationView> = (args) => <LocationView {...args} />;

export const LocationViewStory = Template.bind({});
LocationViewStory.args = {
  location: { lat: 39.09366509575983, lng: -94.58751660204751 },
  address: '240 Smart Rd, St Agnes SA 5097, Australia',
};
