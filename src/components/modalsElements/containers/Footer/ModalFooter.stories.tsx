import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ModalFooter from './ModalFooter';

export default {
  title: 'Components/Modals/Footer',
  component: ModalFooter,
} as ComponentMeta<typeof ModalFooter>;

const Template: ComponentStory<typeof ModalFooter> = (args) => <ModalFooter {...args} />;

export const ModalFooterStory = Template.bind({});
ModalFooterStory.args = {
  isShow: true,
  isShowSecurityInfo: true,
  rightBtnProps: { label: 'Submit', isShow: true, variant: 'contained' },
  middleBtnProps: { label: 'Cansel', isShow: true, color: 'primary' },
};
