import React from 'react';
import Box from '@mui/material/Box';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MuiTooltip from './MuiTooltip';
import theme from '../../theme/theme';

export default {
  title: 'Components/Tooltips',
  component: MuiTooltip,
} as ComponentMeta<typeof MuiTooltip>;

const Template: ComponentStory<typeof MuiTooltip> = (args) => <MuiTooltip {...args} />;

export const MuiTooltipStory = Template.bind({});
MuiTooltipStory.args = {
  title: 'hello world',
  color: 'light',
  children: (
    <Box
      sx={{
        width: '100px',
        height: '100px',
        backgroundColor: theme.palette.case.neutral.n100,
      }}
    />
  ),
};
