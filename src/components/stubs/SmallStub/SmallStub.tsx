import React, { FC } from 'react';
import CircularButton from '../../buttons/CilrcularButton';
import {
  SmallStubContainer,
  SmallStubTitle,
  SmallStubDescription,
  SmallStubButtonContainer,
  SmallStubImageContainer,
  SmallStubSubDescription,
} from './SmallStub.style';

type ValueProps = {
  title?: string;
  description: string;
  subDescription?: string;
  img: string;
  imageAlt: string;
};

type Props = {
  value: ValueProps;
  onClickButton?: () => void;
};

const SmallStub: FC<Props> = ({ value, onClickButton }) => {
  return (
    <SmallStubContainer>
      {value.title && <SmallStubTitle variant="h2">{value.title}</SmallStubTitle>}

      <SmallStubDescription variant="large">{value.description}</SmallStubDescription>

      {!!onClickButton && (
        <SmallStubButtonContainer>
          <CircularButton size="smallLarge" onClick={onClickButton} />
        </SmallStubButtonContainer>
      )}

      <SmallStubImageContainer>
        <img src={value.img} alt={value.imageAlt} style={{ width: '100%' }} />
      </SmallStubImageContainer>

      {value.subDescription && (
        <SmallStubSubDescription variant="small">{value.subDescription}</SmallStubSubDescription>
      )}
    </SmallStubContainer>
  );
};

export default SmallStub;
