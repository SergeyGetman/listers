import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import DeleteIcon from '@mui/icons-material/Delete';
import MuiSquareButton from './MuiSquareButton';

export default {
  title: 'Components/Buttons/MuiSquareButton',
  component: MuiSquareButton,
} as ComponentMeta<typeof MuiSquareButton>;

const Template: ComponentStory<typeof MuiSquareButton> = (args) => <MuiSquareButton {...args} />;

export const MuiSquareButtonStory = Template.bind({});
MuiSquareButtonStory.args = {
  icon: <DeleteIcon />,
};
