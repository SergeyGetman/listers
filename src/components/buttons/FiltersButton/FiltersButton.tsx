import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { ReactComponent as FilterSvg } from '../../../assets/Images/filter.svg';
import { FiltersButtonItem } from './FiltersButton.style';
import { HeaderFilterCounterBlock } from '../../layout/Header/components/BaseHeader/BaseHeader.style';

type FiltersButtonProps = {
  onClick: () => void;
  count?: number;
  isHideTextOnMobile?: boolean;
  label: string;
};

const FiltersButton: FC<FiltersButtonProps> = ({
  count = 0,
  onClick,
  isHideTextOnMobile = true,
  label = '',
}) => {
  return (
    <Box>
      <FiltersButtonItem
        onClick={onClick}
        label={label}
        isHideTextOnMobile={isHideTextOnMobile}
        startIcon={
          <Box sx={{ position: 'relative' }}>
            <FilterSvg />
            {count > 0 && (
              <HeaderFilterCounterBlock
                sx={{
                  position: 'absolute',
                  left: '7px',
                  top: '-7px',
                  zIndex: '2',
                  cursor: 'pointer',
                }}
              >
                <Typography sx={{ fontSize: '16px !important' }} variant="extra_small">
                  {count}
                </Typography>
              </HeaderFilterCounterBlock>
            )}
          </Box>
        }
        size="small"
        variant="text"
      />
    </Box>
  );
};

export default FiltersButton;
