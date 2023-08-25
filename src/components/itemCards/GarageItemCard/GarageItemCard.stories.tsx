import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import GarageItemCard from './GarageItemCard';
import { testGarageItem } from '../../../shared/enums/testGarageItem.enum';

export default {
  title: 'Components/ItemsCard/GarageItemCard',
  component: GarageItemCard,
} as ComponentMeta<typeof GarageItemCard>;

const Template: ComponentStory<typeof GarageItemCard> = (args) => <GarageItemCard {...args} />;

export const GarageItemCardStory = Template.bind({});

GarageItemCardStory.args = {
  item: testGarageItem,
  onViewFile: () => {},
  onClickCard: () => {},
  menuListItems: [
    {
      callback: () => {},
      isDisabled: false,
      label: 'View Details',
    },
    {
      callback: () => {},
      isDisabled: false,
      label: 'Cancel sharing',
    },
    {
      callback: () => {},
      isDisabled: false,
      label: 'Delete Item',
    },
  ],
};
