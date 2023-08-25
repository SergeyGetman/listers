import { Box, styled } from '@mui/material';
export const GarageItemMobileContainer = styled(Box)(() => ({
  width: '100%',
  maxWidth: '355px',
}));

export const GarageItemPcContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const GarageItemImageBlock = styled(Box)(({ theme }) => ({
  width: '380px',
  height: '230px',
  position: 'relative',
  background: theme.palette.case.contrast.white,
  boxShadow: `0px 0px 3px ${theme.palette.case.neutral.n200}`,
  borderRadius: '5px 5px 0px 0px',
  padding: '10px',
}));

type GarageItemImageContainerType = {
  background?: string;
};

export const GarageItemImageContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'background',
})<GarageItemImageContainerType>(({ background }) => ({
  background: background,
  width: '100%',
  height: '100%',
  position: 'relative',
  borderRadius: '5px ',
  boxShadow: 'inset 1px -3px 21px 17px rgb(0 0 0 / 9%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const GarageItemHeaderButtonsContainer = styled(Box)(() => ({
  width: '100%',
  position: 'absolute',
  top: '17px',
  zIndex: 2,
}));

export const GarageItemButtonsContainer = styled(Box)(() => ({
  position: 'relative',
  width: '100%',
  display: 'flex',
}));

export const GarageItemLeftButtonContainer = styled(Box)(() => ({
  position: 'absolute',
  left: '0',
  top: '-12px',

  '& MuiButtonBase-root': {
    height: '18px !important',
  },
}));

export const GarageItemRightButtonContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: '11px',
  svg: {
    color: theme.palette.case.contrast.white,
  },
}));

type GarageItemInfoBlockType = {
  isHover?: boolean;
};

export const GarageItemInfoBlock = styled(Box, {
  shouldForwardProp: (prop: string) => !['isHover'].includes(prop),
})<GarageItemInfoBlockType>(({ isHover, theme }) => ({
  width: '380px',
  padding: '10px 10px 10px 10px',
  borderRadius: '0px 0px 5px 5px',
  position: 'relative',
  background: isHover ? theme.palette.case.contrast.white : 'inherit',

  [theme.breakpoints.down('sm')]: {
    maxWidth: '355px',
    paddingTop: '0',
    height: 'auto',
  },
}));

type GarageItemImageShadowBoxType = {
  isTop?: boolean;
};

export const GarageItemImageShadowBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isTop',
})<GarageItemImageShadowBoxType>(({ isTop, theme }) => ({
  width: '360px',
  height: '155px',
  borderRadius: '5px',
  background: 'linear-gradient(360deg, #000000 -60.95%, rgba(0, 0, 0, 0) 95.02%, rgba(0, 0, 0, 0) 95.02%)',
  position: 'absolute',
  transform: isTop ? 'rotate(-180deg)' : 'initial',
  top: isTop ? 10 : 'initial',
  bottom: isTop ? 'initial' : 10,
  left: '10px',
  zIndex: 1,

  [theme.breakpoints.down('sm')]: {
    width: '335px',
    height: '160px',
    background: 'linear-gradient(360deg, #000000 -80.95%, rgba(0, 0, 0, 0) 95.02%, rgba(0, 0, 0, 0) 95.02%)',
  },
}));
