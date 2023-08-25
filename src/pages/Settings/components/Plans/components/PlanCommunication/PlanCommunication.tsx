import { Box, Typography, Grid, useMediaQuery } from '@mui/material';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { CommunicationItemsType } from '../../../../../../shared/configs/plansTable/communicationItems.config';
import {
  CommunicationCardContainer,
  CommunicationCardHeaderContainer,
  CommunicationCardHeaderIcon,
} from './PlanCommunication.styled';

type PlanCommunicationProps = {
  // TODO eny
  communicationItems: any;
};
const PlanCommunication: FC<PlanCommunicationProps> = ({ communicationItems }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width:768px)');
  const isDesktop = useMediaQuery('(max-width:1100px)');

  return (
    <Grid container justifyContent="center" spacing={3}>
      {communicationItems(t).map((item: CommunicationItemsType) => {
        return (
          <Grid item xs={16} md={4}>
            <CommunicationCardContainer>
              <CommunicationCardHeaderContainer>
                <CommunicationCardHeaderIcon>{item.icon}</CommunicationCardHeaderIcon>
                <Typography variant="h3">{item.title}</Typography>
              </CommunicationCardHeaderContainer>
              <Box sx={{ height: isMobile ? 'initial' : isDesktop ? '100px' : '86px' }}>
                <Typography sx={{ fontWeight: '400' }} variant="large">
                  {item.description}
                </Typography>
              </Box>
            </CommunicationCardContainer>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default PlanCommunication;
