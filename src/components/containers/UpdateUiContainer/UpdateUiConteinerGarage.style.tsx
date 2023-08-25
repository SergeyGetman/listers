import { Box, styled, Typography } from '@mui/material';

export const StyledUpdateUiGarageContainer = styled(Box)<{
  width?: string;
  height?: string;
  maxWidth?: string;
  paramsGridMultiplyFirstBlock: string;
  paramsGridMultiplySecondBlock: string;
}>(({ width, height, maxWidth, theme }) => ({
  display: 'grid',
  gridTemplateColumns: '2fr 160px 500px',
  width: width,
  height: height,
  maxWidth: maxWidth,
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const HeaderOnlyTitleGeneralInformation = styled(Typography)<{
  isTablet?: boolean;
  isMobile?: boolean;
}>(({ theme, isTablet }) => {
  return {
    padding: '24px',
    [theme.breakpoints.down('md')]: {
      display: 'grid',
      marginTop: isTablet ? '-3rem' : '0',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'grid',
      marginTop: '4rem',
    },
  };
});

export const TitleGeneralInformation = styled(Typography)<{
  isTablet?: boolean;
  isMobile?: boolean;
  positionBlock?: string;
}>(({ theme }) => {
  return {
    padding: '8px 0',
    [theme.breakpoints.down('md')]: {
      display: 'grid',
      maxWidth: '200px',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'grid',
      gridTemplateRows: '65px',
      maxWidth: '200px',
    },
  };
});

export const CanstomGeneralInformationGeneralBlock = styled(Box)<{
  maxWidth: string;
  columns?: string;
  columnsTablet?: string;
}>(({ theme, maxWidth, columns }) => ({
  display: 'grid',
  gridTemplateColumns: columns,
  gridGap: '24px',
  maxWidth: maxWidth,
  [theme.breakpoints.down('md')]: {
    display: 'grid',
    maxWidth: '580px',
  },
  [theme.breakpoints.down('sm')]: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '65px',
    marginTop: '1rem',
  },
}));

export const CanstomGeneralInformationFirstBlock = styled(Box)<{
  columns: string;
  maxWidth: string;
  isTablet?: boolean;
  rowsOnTablet: string;
  columnsOnTablet: string;
}>(({ theme, columns, maxWidth, columnsOnTablet, rowsOnTablet }) => ({
  padding: '0 16px',
  display: 'grid',
  gridTemplateColumns: columns,
  gridTemplateRows: '100px 70px',
  maxWidth: maxWidth,
  [theme.breakpoints.down('md')]: {
    display: 'grid',
    gridTemplateRows: rowsOnTablet,
    gridTemplateColumns: columnsOnTablet,
  },
  [theme.breakpoints.down('sm')]: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '165px',
    maxWidth: '410px',
  },
}));

export const CanstomGeneralInformationSecondBlock = styled(Box)<{ columns: string; tabletRows: string }>(
  ({ theme, columns, tabletRows }) => ({
    display: 'grid',
    gridTemplateColumns: columns,
    gridTemplateRows: '70px',
    maxWidth: '385px',
    [theme.breakpoints.down('md')]: {
      display: 'grid',
      gridTemplateRows: '100px',
      gridTemplateColumns: tabletRows,
      gridGap: '24px',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridTemplateRows: '125px',
    },
  }),
);

export const CastomGeneraDoubleBlock = styled(Box)<{ columns: string; checkIsTablet?: boolean }>(
  ({ theme, columns, checkIsTablet }) => ({
    display: 'grid',
    gridTemplateColumns: columns,
    gridRowGap: '5px',
    gridColumnGap: '24px',
    gridTemplateRows: 'auto',
    maxWidth: '780px',
    margin: checkIsTablet ? '0 auto' : '0',
    [theme.breakpoints.down('md')]: {
      display: 'grid',
      margin: checkIsTablet ? '0' : '0 160px',
      backgroundColor: 'green',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridTemplateRows: '65px',
      maxWidth: '385px',
    },
  }),
);
