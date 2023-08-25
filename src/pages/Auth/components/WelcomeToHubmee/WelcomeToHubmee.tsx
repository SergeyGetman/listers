/* eslint-disable no-console */
import React, { FC } from 'react';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthPageImgGridItem } from '../../../../shared/styles/AuthPageImgGridItem';
import signUpImg from '../../../../assets/Images/signUp.png';
import { ReactComponent as PhoneIcon } from '../../../../assets/Images/phone-icon.svg';
import { ReactComponent as MailIcon } from '../../../../assets/Images/mail-icon.svg';

import { WelcomeHubmeeSocialNetworkBox } from './WelcomeToHubmee.style';
import { Container, ContantBox, BottomBoxContainer } from '../Auth.style';
import HubmeeLogoContainer from '../HubmeeLogoContainer';
import theme from '../../../../theme/theme';
import MuiLinkTextButton from '../../../../components/buttons/MuiLinkTextButton';
import SocialNetworkContainer from '../SocialNetworkContainer';
import FullWidthIconButton from '../../../../components/buttons/FullWidthIconButton';

type Props = {
  handleOpenTermsModal?: () => void;
  handleOpenPolicyModal?: () => void;
  onClickFirst: () => void;
  onClickSecond: () => void;
  title: string;
  subtitle: string;
  linkBlockData: { text: string; link: string; buttonLabel: string };
};

const WelcomeToHubmee: FC<Props> = ({
  onClickFirst,
  onClickSecond,
  handleOpenTermsModal,
  handleOpenPolicyModal,
  title,
  subtitle,
  linkBlockData,
}) => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <AuthPageImgGridItem xl={6} item>
        <img loading="lazy" src={signUpImg} alt="mainAuth" />
      </AuthPageImgGridItem>

      <Container>
        <HubmeeLogoContainer />

        <ContantBox>
          <Box sx={{ mb: '8px' }}>
            <Typography sx={{ color: theme.palette.case.neutral.n900 }} variant="h1">
              {title}
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ color: theme.palette.case.neutral.n700 }} variant="default">
              {subtitle}
            </Typography>
          </Box>
          <Box
            sx={{
              width: '100%',
            }}
          >
            <WelcomeHubmeeSocialNetworkBox>
              <SocialNetworkContainer />
              <Divider
                sx={{
                  width: '100%',
                  mt: '24px',
                  color: theme.palette.case.neutral.n200,
                }}
              >
                <Typography
                  sx={{
                    color: theme.palette.case.neutral.n500,
                  }}
                  variant="badge"
                >
                  {t('auth.text.or')}
                </Typography>
              </Divider>
            </WelcomeHubmeeSocialNetworkBox>
          </Box>

          <Box sx={{ mt: '24px' }}>
            <FullWidthIconButton
              startIcon={<MailIcon />}
              label={t('auth.links.continueEmail')}
              onClick={onClickFirst}
            />
          </Box>

          <Box sx={{ mt: '16px' }}>
            <FullWidthIconButton
              startIcon={<PhoneIcon />}
              label={t('auth.links.continuePhone')}
              onClick={onClickSecond}
            />
          </Box>

          <Box
            sx={{
              mt: '24px',
              textAlign: 'center',
            }}
          >
            <Typography variant="default">{linkBlockData.text} </Typography>
            <Link to={linkBlockData.link}>
              <MuiLinkTextButton
                sx={{ color: theme.palette.case.blue.b600, fontWeight: '700' }}
                label={linkBlockData.buttonLabel}
              />
            </Link>
          </Box>
        </ContantBox>

        <BottomBoxContainer>
          {!!handleOpenTermsModal && !!handleOpenPolicyModal && (
            <>
              <Typography variant="default">{t('auth.text.IAgree')} </Typography>
              <Box>
                <MuiLinkTextButton
                  sx={{ color: theme.palette.case.primary.p600 }}
                  onClick={handleOpenTermsModal}
                  label={t('auth.links.terms')}
                />
                <Typography sx={{ m: '0 3px' }} variant="default">
                  {t('auth.text.and')}
                </Typography>
                <MuiLinkTextButton
                  sx={{ color: theme.palette.case.primary.p600 }}
                  onClick={handleOpenPolicyModal}
                  label={t('auth.links.policy')}
                />
              </Box>
            </>
          )}
        </BottomBoxContainer>
      </Container>
    </Grid>
  );
};

export default WelcomeToHubmee;
