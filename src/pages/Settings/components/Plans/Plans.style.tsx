import { Box, styled } from '@mui/material';
export const PlansPricingContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  msOverflowStyle: 'none',
  '& ::-webkit-scrollbar': {
    width: '0px !important',
    display: 'none',
  },
  scrollbarWidth: 'none',
  padding: '0 0 20px',
}));

export const PlansTableTitleContainer = styled(Box)(() => ({
  textAlign: 'center',
  margin: '48px 0 24px 0',
}));

export const PlansComingSoonHubsContainer = styled(Box)(({ theme }) => ({
  maxWidth: '1109px',
  width: '92%',
  background: theme.palette.case.contrast.white,
  margin: 'auto',
}));

export const PlansPricingCardContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['match', 'matchSmallDisplay'].includes(prop),
})<{
  matchSmallDisplay: boolean;
  match: boolean;
}>(({ matchSmallDisplay, match }) => ({
  marginRight: matchSmallDisplay ? 'initial' : match ? '24px' : '40px',
  '&:last-of-type': { marginRight: 0 },
}));

export const PlansPricingCardsContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['matchSmallDisplay'].includes(prop),
})<{
  matchSmallDisplay: boolean;
}>(({ matchSmallDisplay }) => ({
  display: matchSmallDisplay ? 'block' : 'flex',
  alignItems: 'center',
  margin: matchSmallDisplay ? 'initial' : 'auto',
}));

export const PlansSwiperContainer = styled('div')`
  .swiper {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
  }
  .swiper-slide {
    width: 240px;
    height: 385px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
