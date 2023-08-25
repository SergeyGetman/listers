import React, { FC } from 'react';
import { Typography, Box, useTheme } from '@mui/material';
import { StickyDashedLine, StickyLineContainer } from './StickyLine.style';
import { networkUserStatusesConfig } from '../../shared/configs/networkUserStatuses.config';
import { NetworkUserStatus } from '../../shared/enums/networkUserStatus.enum';

type AdditionalInfoProps = {
  type: NetworkUserStatus | string;
};
const StickyLine: FC<AdditionalInfoProps> = ({ type }) => {
  const statusConfigItem = networkUserStatusesConfig[type || NetworkUserStatus.friend];
  const theme = useTheme();

  return (
    <StickyLineContainer>
      <Box
        sx={{
          position: 'absolute',
          background: theme.palette.case.neutral.n75,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {statusConfigItem.icon && <statusConfigItem.icon />}
        <Typography
          noWrap
          sx={{
            color: theme.palette.case.neutral.n900,
            pr: '12px',
            pl: '4px',
          }}
          variant="t14m"
        >
          {statusConfigItem.title}
        </Typography>
      </Box>

      <StickyDashedLine />
    </StickyLineContainer>
  );
};

export default StickyLine;
