import { Box, Typography, useTheme } from '@mui/material';
import React, { FC, useMemo } from 'react';
import DoneIcon from '@mui/icons-material/Done';

type Props = {
  title: string;
  downgradePlanName?: string;
};

const LouseHubsContainer: FC<Props> = ({ title, downgradePlanName }) => {
  const theme = useTheme();

  const availableHubs = useMemo(() => {
    if (title === 'Starter') {
      return ['Auto reminders', 'Created checklists and notes', 'Connections from Network', 'Data from Hubs'];
    }
    if (title === 'Gold') {
      return [
        'Auto reminders',
        'Tasks and events full access',
        'Prioritizing',
        'Due dates',
        'Progress tracking',
      ];
    }
    return downgradePlanName === 'Gold'
      ? ['Auto-scheduled payments', 'Hubs full access', 'Auto reminders from Garage Hub']
      : [
          'Auto-scheduled payments',
          'Hubs full access',
          'Auto reminders',
          'Tasks and events full access',
          'Prioritizing',
          'Due dates',
          'Progress tracking',
        ];
  }, [downgradePlanName, title]);

  return (
    <Box
      sx={{
        width: 260,
        padding: '16px',
        border: `1px solid ${theme.palette.case.primary.p600}`,
        background: theme.palette.case.contrast.white,
        borderRadius: '4px',
      }}
    >
      <Box mb="16px" display="flex" justifyContent="center">
        <Typography sx={{ color: theme.palette.case.neutral.n900 }} variant="h1">
          {title}
        </Typography>
      </Box>

      {availableHubs.map((item) => (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: '8px' }}>
          <DoneIcon sx={{ width: '20px', height: '20px', color: theme.palette.primary.main, mr: '8px' }} />
          <Typography sx={{ color: theme.palette.case.neutral.n700 }}>{item}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default LouseHubsContainer;
