import React, { FC, memo } from 'react';
import { InView } from 'react-intersection-observer';

type Props = {
  onFetchMore?: () => void;
};

const ScrollTrigger: FC<Props> = ({ onFetchMore }) => {
  const handleFetchMore = (inView: boolean) => {
    if (!inView) {
      return;
    }
    onFetchMore?.();
  };

  return (
    <InView
      as="div"
      style={{
        width: '100%',
        height: '100%',
      }}
      onChange={(inView) => handleFetchMore(inView)}
    />
  );
};

export default memo(ScrollTrigger);
