import React, { useCallback } from 'react';
import { MasonryScroller, useContainerPosition, usePositioner, useResizeObserver } from 'masonic';
import { useWindowSize } from '@react-hook/window-size';
import { Box, Skeleton } from '@mui/material';
import { TodoScrollableContainer } from '../../Todo.style';

const TodoSkeletons = () => {
  const [windowWidth, windowHeight] = useWindowSize();
  const containerRef = React.useRef(null);

  const { offset, width } = useContainerPosition(containerRef, [windowWidth, windowHeight]);
  const skeletonArr = [
    { id: 1, height: '140' },
    { id: 2, height: '200' },
    { id: 3, height: '400' },
    { id: 4, height: '140' },
    { id: 5, height: '100' },
    { id: 6, height: '420' },
    { id: 7, height: '400' },
    { id: 8, height: '140' },
    { id: 9, height: '160' },
  ];
  const positioner = usePositioner({ width, columnWidth: 300, columnGutter: 3 }, [skeletonArr?.length]);
  const resizeObserver = useResizeObserver(positioner);

  const renderSkeletonItem = useCallback((item: any) => {
    return (
      <Box
        sx={{
          pb: { sm: '30px', xs: '16px' },
          pl: { sm: '10px', xs: '0' },
          pr: { sm: '10px', xs: '0' },
          height: `${item.data.height}px`,
          width: '100%',
        }}
      >
        <Skeleton sx={{ borderRadius: '5px' }} variant="rectangular" height="100%" width="100%" />
      </Box>
    );
  }, []);

  return (
    <TodoScrollableContainer ref={containerRef}>
      <MasonryScroller
        items={skeletonArr}
        resizeObserver={resizeObserver}
        render={renderSkeletonItem}
        positioner={positioner}
        overscanBy={10}
        offset={offset}
        height={windowHeight}
      />
    </TodoScrollableContainer>
  );
};

export default TodoSkeletons;
