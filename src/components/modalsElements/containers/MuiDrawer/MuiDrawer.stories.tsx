import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '@mui/material';
import MuiDrawer from './MuiDrawer';
import MuiDefaultDrawerHeader from './MuiDrawersHeders/MuiDefaultDrawerHeader';
import ModalFooter from '../Footer/ModalFooter';

export default {
  title: 'Components/Modals/Drawer',
  component: MuiDrawer,
} as ComponentMeta<typeof MuiDrawer>;

const Template: ComponentStory<typeof MuiDrawer> = (args) => <MuiDrawer {...args} />;

export const MuiDrawerStory = Template.bind({});
MuiDrawerStory.args = {
  children: (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <MuiDefaultDrawerHeader title="Hello world" onClose={() => true} />
      <Box sx={{ padding: '0 10px', flexGrow: 1 }}>Content</Box>
      <ModalFooter
        isShow
        isShowSecurityInfo
        rightBtnProps={{ label: 'Submit', isShow: true, variant: 'contained' }}
        middleBtnProps={{ label: 'Cansel', isShow: true, color: 'primary' }}
      />
    </Box>
  ),
};
