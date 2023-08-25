import React, { FC } from 'react';
import { Box, Typography, Zoom } from '@mui/material';
import { ReactComponent as DoneIcon } from '../../../../../assets/Images/done-icon.svg';

type Props = {
  allChecklistsCount: number;
  doneChecklistsCount: number;
  isDone?: boolean;
};

// TODO add new color

const ChecklistCounter: FC<Props> = ({ allChecklistsCount, doneChecklistsCount, isDone }) => {
  return (
    <Box sx={{ marginRight: '8px' }}>
      <Zoom in={!!allChecklistsCount || isDone}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isDone ? (
            <Box sx={{ mr: allChecklistsCount ? '9px' : '0' }}>
              <DoneIcon />
            </Box>
          ) : (
            <></>
          )}
          {allChecklistsCount ? (
            <Typography
              sx={{ color: '#5A6384' }}
              variant="default"
              fontWeight={500}
            >{`${doneChecklistsCount}/${allChecklistsCount}`}</Typography>
          ) : (
            <></>
          )}
        </Box>
      </Zoom>
    </Box>
  );
};

export default ChecklistCounter;
