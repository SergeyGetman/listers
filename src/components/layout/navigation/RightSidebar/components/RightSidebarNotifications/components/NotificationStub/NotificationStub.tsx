import React, { FC, memo } from 'react';
import { NotificationStubContainer, NotificationTextContainer } from './NotificationNewsCard.style';

type Props = {
  imageUrl: any;
  text: string;
};

const NotificationStub: FC<Props> = ({ text, imageUrl }) => {
  return (
    <NotificationStubContainer>
      <img width="120px" src={imageUrl} alt="request stub" />
      <NotificationTextContainer>{text}</NotificationTextContainer>
    </NotificationStubContainer>
  );
};

export default memo(NotificationStub);
