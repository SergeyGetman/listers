import React, { FC } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import Linkify from 'react-linkify';
import { useTranslation } from 'react-i18next';
import { NetworkUserModel } from '../../../../../../shared/models/network';
import CircleIconButton from '../../../../../../components/buttons/CircleIconButton';
import { NetworkBlockInfoContent, NetworkBlockInfoContentContainer } from '../../NetworkBlockInfo.style';
import {
  GeneralCardInfoTagContainer,
  GeneralCardInfoTagContent,
  GeneralCardInfoTagIcon,
} from './GeneralCardInfo.style';
import AvatarContainer from '../../../../../../components/avatars/AvatarContainer';
import { ReactComponent as QRCodeIcon } from '../../../../../../assets/Images/qr-code.svg';

type Props = {
  userInfo?: NetworkUserModel;
};

const GeneralCardInfo: FC<Props> = ({ userInfo }) => {
  const theme = useTheme();
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();

  const TagBtnBlock = () => (
    <>
      {isMobileDisplay && !(userInfo?.tag && userInfo?.tag?.length > 0) ? (
        <></>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {userInfo?.tag && userInfo?.tag?.length > 0 && (
            <Box>
              <GeneralCardInfoTagIcon />
              <GeneralCardInfoTagContainer>
                <GeneralCardInfoTagContent variant="t12m">{userInfo?.role}</GeneralCardInfoTagContent>
              </GeneralCardInfoTagContainer>
            </Box>
          )}
        </Box>
      )}

      <Box>
        <CircleIconButton
          onClick={() => {}}
          colorIconBtn=""
          colorLabelBtn={theme.palette.case.primary.p600}
          isButtonPadding={!isMobileDisplay}
          label={t('general.buttons.shareQR')}
          isShowText
          icon={<QRCodeIcon />}
        />
      </Box>
    </>
  );

  const TextLink = ({ email, phone }: { email?: string | null; phone?: string | null }) => (
    <>
      {email ? (
        <Linkify
          componentDecorator={(decoratedHref, decoratedText, key) => (
            <a onClick={(e) => e.stopPropagation()} target="blank" href={decoratedHref} key={key}>
              {decoratedText}
            </a>
          )}
        >
          <Typography sx={{ m: '8px 0' }} variant="t14r">
            {email}
          </Typography>
        </Linkify>
      ) : phone ? (
        <a href={`tel:${phone}`}>
          <Typography sx={{ m: '8px 0' }} variant="t14r">
            {phone}
          </Typography>
        </a>
      ) : (
        <></>
      )}
    </>
  );

  return (
    <NetworkBlockInfoContentContainer>
      <NetworkBlockInfoContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <AvatarContainer
            variant="circular"
            firstName={userInfo?.first_name}
            lastName={userInfo?.last_name}
            src={userInfo?.avatar?.additional_info?.size_urls?.avatar_profile || userInfo?.avatar?.url || ''}
            id={userInfo ? userInfo?.id : 0}
            size="large"
          />
          {isMobileDisplay ? (
            <Box
              sx={{
                margin: '0 0 0 20px',
                wordBreak: 'break-word',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h3">{userInfo?.full_name}</Typography>
              <TextLink email={userInfo?.email} phone={userInfo?.phone} />

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <TagBtnBlock />
              </Box>
            </Box>
          ) : (
            <Box sx={{ margin: '0 0 0 20px', wordBreak: 'break-word' }}>
              <Typography variant="h3">{userInfo?.full_name}</Typography>
              <TextLink email={userInfo?.email} phone={userInfo?.phone} />
            </Box>
          )}
        </Box>

        {!isMobileDisplay && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              height: '100px',
            }}
          >
            <TagBtnBlock />
          </Box>
        )}
      </NetworkBlockInfoContent>
    </NetworkBlockInfoContentContainer>
  );
};

export default GeneralCardInfo;
