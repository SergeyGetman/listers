import { Box } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { StepperItem, StepperLine } from './Stepper.styled';
import { ReactComponent as DoneIndicator } from '../../assets/Images/stepper/done_indicator.svg';
import { ReactComponent as CurrentIndicator } from '../../assets/Images/stepper/current_indicator.svg';
import { ReactComponent as EmptyIndicator } from '../../assets/Images/stepper/empty_indicator.svg';

type Props = {
  count: number;
  selected: number;
};

const Stepper: FC<Props> = ({ count, selected }) => {
  const array = useMemo(() => Array(count).fill(''), [count]);

  return (
    <Box display="flex" alignItems="center">
      {array.map((_, index) => (
        <React.Fragment key={index}>
          <StepperItem isActive={selected >= index + 1} isDone={selected > index + 1}>
            {selected === index + 1 ? (
              <CurrentIndicator />
            ) : selected > index + 1 ? (
              <DoneIndicator />
            ) : (
              <EmptyIndicator />
            )}
          </StepperItem>
          {array.length > index + 1 ? (
            <StepperLine isActive={selected > index + 1 || selected === array.length} />
          ) : null}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default Stepper;
