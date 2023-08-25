import { Box, Typography } from '@mui/material';
import React, { FC, memo } from 'react';
import { MuiTabContainer, MuiTabsContainer } from './MuiTabs.styled';
import MuiTooltip from '../MuiTooltip';

type Props = {
  options: {
    key: string;
    name: string;
    isDisabled?: boolean;
    tooltipText?: string;
    isShowTooltip?: boolean;
  }[];
  handleChanged?: (index: string) => void;
  value: string;
};

const MuiTabs: FC<Props> = ({ options, handleChanged, value = 0 }) => {
  const handleChange = (index: number, key: string) => {
    handleChanged?.(key);
  };

  return (
    <Box display="flex">
      <MuiTabsContainer>
        {options.map((item, index) => (
          <Box key={item.key}>
            {item?.isShowTooltip ? (
              <MuiTooltip placement="bottom" title={item.tooltipText || ''}>
                <MuiTabContainer
                  onClick={() => (item.isDisabled ? true : handleChange(index, item.key))}
                  selected={value === item.key}
                  isDisabled={item.isDisabled}
                >
                  <Typography variant="label_middle">{item.name}</Typography>
                </MuiTabContainer>
              </MuiTooltip>
            ) : (
              <MuiTabContainer
                onClick={() => (item.isDisabled ? true : handleChange(index, item.key))}
                selected={value === item.key}
                isDisabled={item.isDisabled}
              >
                <Typography variant="label_middle">{item.name}</Typography>
              </MuiTabContainer>
            )}
          </Box>
        ))}
      </MuiTabsContainer>
    </Box>
  );
};

export default memo(MuiTabs);
