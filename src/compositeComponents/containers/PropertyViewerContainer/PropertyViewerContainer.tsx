import React, { FC, ReactNode } from 'react';
import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import SimpleBorderContainer from '../../../components/containers/SimpleBorderContainer';
import BaseFieldView from '../../../components/formElements/BaseFieldView';
import { IPropertyViewerContainerItem } from './types';

type PropertyViewerContainerProps = {
  gridConfig?: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
  };
  columnSpacingConfig?: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
  };
  rowSpacingConfig?: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
  };
  items: IPropertyViewerContainerItem;
  title?: string;
  titleInsideContainer?: boolean;

  children?: ReactNode;
};
const PropertyViewerContainer: FC<PropertyViewerContainerProps> = ({
  gridConfig = { xs: 6, sm: 6, md: 6, lg: 6 },
  columnSpacingConfig = { xs: 12, sm: 16, md: 24, lg: 24 },
  rowSpacingConfig = { xs: 12, sm: 12, md: 12, lg: 12 },
  items,
  title,
  titleInsideContainer = false,
  children,
}) => {
  const theme = useTheme();
  const isSmallDisplay = useMediaQuery(theme.breakpoints.down('md'));
  const isShowLeftTitle = !titleInsideContainer && !isSmallDisplay && title;
  const isShowTitleInsideContainer = title && (titleInsideContainer || isSmallDisplay);

  return (
    <Box display="flex" alignItems="flexStart" width="100%">
      {isShowLeftTitle && (
        <Typography
          sx={{ width: '160px', flexShrink: '0', padding: '4px 0', mr: '24px' }}
          color={theme.palette.case.neutral.n800}
          variant="s2"
        >
          {title}
        </Typography>
      )}

      <Box sx={{ width: '100%' }}>
        <SimpleBorderContainer>
          {!children && (
            <Grid container rowSpacing="20px">
              {isShowTitleInsideContainer && (
                <Grid item xs={12}>
                  <Typography variant="s2">{title}</Typography>
                </Grid>
              )}

              {!children && (
                <Grid item xs={12}>
                  <Grid
                    container
                    alignItems="flex-start"
                    columnSpacing={{
                      xs: `${columnSpacingConfig.xs}px`,
                      sm: `${columnSpacingConfig.sm}px`,
                      md: `${columnSpacingConfig.md}px`,
                      lg: `${columnSpacingConfig.lg}px`,
                    }}
                    rowSpacing={{
                      xs: `${rowSpacingConfig.xs}px`,
                      sm: `${rowSpacingConfig.sm}px`,
                      md: `${rowSpacingConfig.md}px`,
                      lg: `${rowSpacingConfig.lg}px`,
                    }}
                  >
                    {items.map((item, index) => (
                      <Grid
                        key={index}
                        xs={item.gridConfig?.xs ? item.gridConfig.xs : gridConfig.xs}
                        sm={item.gridConfig?.sm ? item.gridConfig.sm : gridConfig.sm}
                        md={item.gridConfig?.md ? item.gridConfig.md : gridConfig.md}
                        lg={item.gridConfig?.lg ? item.gridConfig.lg : gridConfig.lg}
                        item
                      >
                        <BaseFieldView label={item.label} value={item.value} />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              )}
            </Grid>
          )}
          {children && isShowTitleInsideContainer && (
            <Grid container pb="20px">
              <Grid item xs={12}>
                <Typography variant="s2">{title}</Typography>
              </Grid>
            </Grid>
          )}
          {children}
        </SimpleBorderContainer>
      </Box>
    </Box>
  );
};

export default PropertyViewerContainer;
