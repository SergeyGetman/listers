import React, { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import {
  StubWithCreateVariantsContainer,
  StubWithCreateVariantsItemsContainer,
} from './StubWithCreateVariants.style';
import CreateVariantItemCard from '../../itemCards/CreateVariantItemCard';

export type Version = 'v1' | 'v2';

type StubWithCreateVariantsProps = {
  label: string | null;
  newLabel?: [string, string] | null;
  createItemList: {
    item: {
      label: string;
      id: string;
      icon?: any;
      backgroundCardColor?: string;
      hoverBackgroundCardColor?: string;
    };
    callback: () => void;
    subtitle?: string | null;
    isPlatinum?: boolean;
  }[];
  version?: Version;
};

const StubWithCreateVariants: FC<StubWithCreateVariantsProps> = ({
  label,
  newLabel = null,
  createItemList,
  version = 'v1',
}) => {
  const theme = useTheme();
  return (
    <StubWithCreateVariantsContainer>
      {newLabel !== null && (
        <Box>
          {newLabel?.map((text) => {
            return (
              <Typography
                variant="h3"
                sx={{ color: theme.palette.case.neutral.n700, whiteSpace: 'pre-wrap' }}
              >
                {text}
              </Typography>
            );
          })}
        </Box>
      )}

      {label !== null && (
        <Typography variant="h3" sx={{ color: theme.palette.case.neutral.n700, whiteSpace: 'pre-wrap' }}>
          {label}
        </Typography>
      )}
      <StubWithCreateVariantsItemsContainer>
        {createItemList.map((createItem) => (
          <CreateVariantItemCard
            version={version}
            key={createItem.item.id}
            callback={createItem.callback}
            item={createItem.item}
            subtitle={createItem.subtitle}
            isPlatinum={createItem.isPlatinum}
          />
        ))}
      </StubWithCreateVariantsItemsContainer>
    </StubWithCreateVariantsContainer>
  );
};

export default StubWithCreateVariants;
