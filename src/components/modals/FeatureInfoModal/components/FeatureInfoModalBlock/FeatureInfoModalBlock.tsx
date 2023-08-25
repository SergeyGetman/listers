import React, { FC } from 'react';
import { ModalBlockContainer, ModalBlockText, ModalBlockTitle } from './FeatureInfoModalBlock.style';

type Props = { title?: string; description: string; img?: string };

const FeatureInfoModalBlock: FC<Props> = ({ title = '', description, img }) => {
  return (
    <ModalBlockContainer>
      <ModalBlockTitle variant="h3">{title}</ModalBlockTitle>
      <ModalBlockText variant="large">{description}</ModalBlockText>
      {img && <img src={img} alt="hub" width="100%" />}
    </ModalBlockContainer>
  );
};

export default FeatureInfoModalBlock;
