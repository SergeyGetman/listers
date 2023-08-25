import React, { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import MuiChip from '../../../components/MuiChip';

type Props = {
  privateCount: number;
  groupCount: number;
  isGroup?: boolean;
};

const ChatTabs: FC<Props> = ({ privateCount, groupCount, isGroup }) => {
  const theme = useTheme();

  return (
    <Grid
      container
      sx={{
        a: {
          textDecoration: 'none',
          color: `${theme.palette.case.neutral.n800} !important`,
          '&.active': {
            color: `${theme.palette.case.primary.p600} !important`,
          },
        },
      }}
    >
      <Grid
        item
        xs={6}
        sx={{
          borderRight: `1px solid ${theme.palette.case.contrast.gray3}`,
        }}
      >
        <Box display="flex" alignItems="center">
          <NavLink to="personal">
            <Typography sx={{ ml: isGroup ? '' : '5px' }} variant="default_bolt">
              Personal Chat
            </Typography>
          </NavLink>
          <Box ml="6px">
            <MuiChip isShow={!!privateCount} label={privateCount} />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box display="flex" sx={{ mr: isGroup ? '' : '5px' }} alignItems="center" justifyContent="end">
          <NavLink to="group">
            <Typography variant="default_bolt">Group Chat</Typography>
          </NavLink>
          <Box ml="6px">
            <MuiChip isShow={!!groupCount} label={groupCount} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default memo(ChatTabs);
