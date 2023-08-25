import { Box, styled } from '@mui/material';

export const GarageItemContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['isDnD'].includes(prop),
})<{ isDnD?: boolean }>(({ theme, isDnD }) => ({
  borderRadius: '8px',
  border: `1px solid ${theme.palette.case.neutral.n200}`,
  background: theme.palette.case.neutral.n0,
  position: 'relative',
  [theme.breakpoints.up('lg')]: {
    width: '100%',
  },
  [theme.breakpoints.down('sm')]: {
    width: 'auto',
  },
  '&:hover': {
    border: isDnD
      ? `1px solid ${theme.palette.case.blue.b600}`
      : `1px solid ${theme.palette.case.primary.p800}`,
  },
}));

export const GarageItemContainerForDnd = styled(Box)(({ theme }) => ({
  borderRadius: '8px',
  height: '503px',
  border: `1px dashed ${theme.palette.case.blue.b400}`,
  background: theme.palette.case.blue.b50,
  position: 'relative',
  [theme.breakpoints.up('lg')]: {
    width: '100%',
  },
  [theme.breakpoints.down('sm')]: {
    width: 'auto',
  },
}));

export const GarageItemImageContainer = styled(Box, {
  shouldForwardProp: (prop: string) => prop !== 'background',
})<{ background?: string }>(({ background }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative',
  height: '176px',
  padding: '8px',
  background: background,
  borderRadius: '8px 8px 0 0',
}));

export const GarageActionMenu = styled(Box, {
  shouldForwardProp: (prop: string) => !['isHavePhoto'].includes(prop),
})<{ isHavePhoto?: boolean }>(({ isHavePhoto, theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  borderRadius: '100px',
  background: !isHavePhoto ? 'transparent' : theme.palette.case.neutral.n100,
  boxShadow: !isHavePhoto ? 'none' : theme.palette.case.shadow.medium,
  backdropFilter: 'blur(2px)',
}));

export const GarageDnDGrab = styled(Box, {
  shouldForwardProp: (prop: string) => !['isHover'].includes(prop),
})<{ isHover?: boolean }>(({ isHover, theme }) => ({
  position: 'absolute',
  left: '-22px',
  top: '5px',
  display: isHover ? 'block' : 'none',
  zIndex: 9,

  color: theme.palette.case.neutral.n400,
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

export const GarageShareUsersContainer = styled(Box)(() => ({
  position: 'absolute',
  bottom: '6px',
  left: '7px',
  zIndex: '10',
}));

export const GarageDocumentsContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['isHavePhoto'].includes(prop),
})<{ isHavePhoto?: boolean }>(({ theme, isHavePhoto }) => ({
  borderBottom: `1px solid ${theme.palette.case.neutral.n75}`,
  padding: isHavePhoto ? '16px 0 20px 8px' : '16px 0 0px 8px',
  display: 'block',
  gap: '8px',
  cursor: 'pointer',
}));

export const SwiperContainer = styled('div')`
  overflow: hidden;
  .swiper-android .swiper-slide,
  .swiper-wrapper {
    box-sizing: border-box;
  }
  .swiper-button-next.swiper-button-disabled,
  .swiper-button-prev.swiper-button-disabled {
    display: none;
  }
  .swiper-slide {
    flex-shrink: 1;
  }
`;
export const CustomNextButton = styled(Box, {
  shouldForwardProp: (prop: string) => !['isHavePhoto'].includes(prop),
})<{ isHavePhoto?: boolean }>(({ theme, isHavePhoto }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  borderRadius: '20px',
  background: theme.palette.case.neutral.n0,
  border: `1px solid ${theme.palette.case.neutral.n75}`,
  position: 'absolute',
  zIndex: 5,
  right: '12px',
  bottom: isHavePhoto ? '32px' : '12px',
  boxShadow: theme.palette.case.shadow.default,
  cursor: 'pointer',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
  },
  [theme.breakpoints.between(1500, 2000)]: {
    display: 'none',
  },
  [theme.breakpoints.between(400, 600)]: {
    display: 'none',
  },
  [theme.breakpoints.between(1150, 1270)]: {
    display: 'none',
  },
  [theme.breakpoints.between(1270, 1390)]: {
    display: 'none',
  },
  [theme.breakpoints.between(767, 920)]: {
    display: 'none',
  },
  [theme.breakpoints.between(2000, 3000)]: {
    display: 'none',
  },
}));
