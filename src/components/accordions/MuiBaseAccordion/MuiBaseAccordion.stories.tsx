import React from 'react';
import { Box } from '@mui/material';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MuiBaseAccordion from './MuiBaseAccordion';

export default {
  title: 'Components/Accordion/BaseAccordion',
  component: MuiBaseAccordion,
} as ComponentMeta<typeof MuiBaseAccordion>;

const Template: ComponentStory<typeof MuiBaseAccordion> = (args) => <MuiBaseAccordion {...args} />;

export const MuiBaseAccordionStory = Template.bind({});
MuiBaseAccordionStory.args = {
  label: 'Physical Address',
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
