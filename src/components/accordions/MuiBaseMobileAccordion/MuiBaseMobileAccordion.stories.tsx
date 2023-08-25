import React from 'react';
import { Box } from '@mui/material';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MuiBaseMobileAccordion from './MuiBaseMobileAccordion';

export default {
  title: 'Components/Accordion/BaseMobileAccordion',
  component: MuiBaseMobileAccordion,
} as ComponentMeta<typeof MuiBaseMobileAccordion>;

const Template: ComponentStory<typeof MuiBaseMobileAccordion> = (args) => (
  <MuiBaseMobileAccordion {...args} />
);

export const MuiBaseMobileAccordionStory = Template.bind({});
MuiBaseMobileAccordionStory.args = {
  title: 'Physical Address',
  isEdit: true,
  subtitleText: 'Car,  Volkswagen Beetlersport, 1985, Black',
  menuList: [
    {
      label: 'Appearance',
      callback: () => true,
      isDisabled: false,
    },
    {
      label: 'Task',
      callback: () => true,
      isDisabled: false,
    },
    {
      label: 'Event',
      callback: () => true,
      isDisabled: true,
    },
    {
      label: 'Meeting',
      callback: () => true,
      isDisabled: true,
      tooltipTitle: 'hello',
      disableCallback: () => true,
    },
  ],
  children: <Box sx={{ width: '100%', height: '300px', backgroundColor: 'gray' }} />,
};
