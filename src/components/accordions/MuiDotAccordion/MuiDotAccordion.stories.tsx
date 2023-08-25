import React from 'react';
import { Typography } from '@mui/material';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MuiDotAccordion from './MuiDotAccordion';

export default {
  title: 'Components/Accordion/DotAccordion',
  component: MuiDotAccordion,
} as ComponentMeta<typeof MuiDotAccordion>;

const Template: ComponentStory<typeof MuiDotAccordion> = (args) => <MuiDotAccordion {...args} />;

export const MuiDotAccordionStory = Template.bind({});
MuiDotAccordionStory.args = {
  label: 'Period',
  contentInformation: 'documents',
  children: (
    <Typography>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet
      blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
      malesuada lacus ex, sit amet blandit leo lobortis eget.
    </Typography>
  ),
};
