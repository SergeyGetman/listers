import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from '@mui/material';
import MuiModal from './MuiModal';

export default {
  title: 'Components/Modals/Modal',
  component: MuiModal,
} as ComponentMeta<typeof MuiModal>;

const Template: ComponentStory<typeof MuiModal> = (args) => <MuiModal {...args} />;

export const MuiModalStory = Template.bind({});
MuiModalStory.args = {
  isShow: true,
  children: (
    <Box
      sx={{
        height: 300,
        p: '10px',
      }}
    >
      Content
    </Box>
  ),
};
