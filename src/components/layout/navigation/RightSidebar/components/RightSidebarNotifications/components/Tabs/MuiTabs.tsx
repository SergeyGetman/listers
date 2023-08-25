import { Box, Typography } from '@mui/material';
import React, { FC, memo } from 'react';
import { MuiTabContainer, MuiTabsContainer } from './MuiTabs.styled';
import { NotificationsEnum } from '../../../../../../../../shared/enums/notificationsEnum';
import MuiChip from '../../../../../../../MuiChip';

type Props = {
  options: { key: NotificationsEnum; name: string; counter: number }[];
  handleChanged?: (index: string) => void;
  value: string;
};

// TODO storybook
const MuiTabs: FC<Props> = ({ options, handleChanged, value = 0 }) => {
  const handleChange = (index: number, key: string) => {
    handleChanged?.(key);
  };
  return (
    <Box display="flex" sx={{ width: '100%' }}>
      <MuiTabsContainer>
        {options.map((item, index) => (
          <MuiTabContainer
            key={item.key}
            onClick={() => handleChange(index, item.key)}
            selected={value === item.key}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography sx={{ lineHeight: '16px' }} variant="label_middle">
                {item.name}
              </Typography>
              {item.counter > 0 && (
                <Box sx={{ marginLeft: '4px' }}>
                  <MuiChip isShow label={item.counter} />
                </Box>
              )}
            </Box>
          </MuiTabContainer>
        ))}
      </MuiTabsContainer>
    </Box>
  );
};

export default memo(MuiTabs);
