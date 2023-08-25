import React, { FC } from 'react';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router';
import { AuthPageImgGridItem } from '../../../../shared/styles/AuthPageImgGridItem';
import { WelcomeHubmeeSocialNetworkBox } from '../WelcomeToHubmee/WelcomeToHubmee.style';
import HubmeeLogoContainer from '../HubmeeLogoContainer';
import theme from '../../../../theme/theme';
import AuthBtn from '../../../../components/buttons/AuthBtn';
import SocialNetworkContainer from '../SocialNetworkContainer';
import MuiButton from '../../../../components/buttons/MuiButton';
import { Container, ContantBox, BottomBoxContainer } from '../Auth.style';

type Props = {
  title: string;
  description: string;
  handleSubmit: any;
  onSubmit: any;
  img: any;
  isShowConfirmLoader: boolean;
  children: React.ReactNode;
  goBackPath: string;
};

const AuthContainer: FC<Props> = ({
  title,
  description,
  handleSubmit,
  onSubmit,
  img,
  children,
  isShowConfirmLoader,
  goBackPath,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Grid container>
      <AuthPageImgGridItem xl={6} item>
        <img loading="lazy" src={img} alt="mainAuth" />
      </AuthPageImgGridItem>

      <Container>
        <HubmeeLogoContainer />

        <ContantBox>
          <form style={{ width: '100%' }} noValidate onSubmit={handleSubmit(onSubmit)}>
            <Typography sx={{ color: theme.palette.case.neutral.n900, textAlign: 'center' }} variant="h1">
              {title}
            </Typography>

            <Box sx={{ mt: '24px' }}>
              {children}

              <Typography sx={{ color: theme.palette.case.neutral.n700 }} variant="default">
                {description}
              </Typography>

              <Box sx={{ width: '200px', margin: '24px auto 0 auto' }}>
                <AuthBtn
                  type="submit"
                  label={t('auth.links.continue')}
                  loading={isShowConfirmLoader}
                  isStopPropagation={false}
                />
              </Box>
              <WelcomeHubmeeSocialNetworkBox>
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
                <SocialNetworkContainer />
              </WelcomeHubmeeSocialNetworkBox>
            </Box>
          </form>
          <Box sx={{ mt: '24px', textAlign: 'center' }}>
            <MuiButton
              size="large"
              variant="text"
              label={t('general.buttons.back')}
              onClick={() => {
                navigate(goBackPath);
              }}
              startIcon={<KeyboardBackspaceIcon />}
            />
          </Box>
        </ContantBox>

        <BottomBoxContainer />
      </Container>
    </Grid>
  );
};

export default AuthContainer;
