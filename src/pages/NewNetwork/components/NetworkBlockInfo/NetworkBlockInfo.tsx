import React, { useEffect, useMemo } from 'react';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import CircleIconButton from '../../../../components/buttons/CircleIconButton';
import { networkUserStatusesConfig } from '../../../../shared/configs/networkUserStatuses.config';
import { NetworkUserStatus } from '../../../../shared/enums/networkUserStatus.enum';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux';
import { NetworkUserModel } from '../../../../shared/models/network';
import {
  NetworkBlockInfoContainer,
  NetworkBlockInfoHeaderContainer,
  NetworkBlockInfoCardContent,
  NetworkBlockInfoHeaderNameContainer,
} from './NetworkBlockInfo.style';
import MuiBaseInputView from '../../../../components/formElements/MuiBaseInputView';
import { PageStubContainer } from '../../../../shared/styles/StubContainer';
import Stub from '../../../../components/stubs/Stub';
import { noSelectedConnectionStubConfig } from '../../../../shared/configs/stub.config';
import GeneralCardInfo from './components/GeneralCardInfo/GeneralCardInfo';
import CardInfo from './components/CardInfo/CardInfo';
import MuiPhoneNumberInputView from '../../../../components/formElements/MuiPhoneNumberInputView';
import { setNetworkSelectUserInfo } from '../../../../store/network/networkSlice';
import NetworkBlockInfoSkeleton from './components/NetworkBlockInfoSkeleton';
import { networkActions } from '../../functions/networkActions';
import { isDisabledNetworkButton } from '../../functions/isDisabledNetworkButton';
import MuiTooltip from '../../../../components/MuiTooltip';

const NetworkBlockInfo = () => {
  const theme = useTheme();
  const isLargeDisplay = useMediaQuery(theme.breakpoints.down('lg'));
  const { id } = useParams();
  const { selectUserInfo, isLoading } = useAppSelector((state) => state.network.network);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!!id) {
      dispatch(setNetworkSelectUserInfo(+id));
    }
  }, [id, dispatch]);

  const statusConfigItem = useMemo(() => {
    return networkUserStatusesConfig[
      selectUserInfo?.entity_type ? selectUserInfo?.entity_type : NetworkUserStatus.incoming
    ];
  }, [selectUserInfo]);

  return !id && !isLargeDisplay ? (
    <Box sx={{ width: '100%', height: '100%', padding: '0 24px' }}>
      <PageStubContainer>
        <Stub value={noSelectedConnectionStubConfig} />
      </PageStubContainer>
    </Box>
  ) : isLoading ? (
    <NetworkBlockInfoSkeleton />
  ) : id ? (
    <NetworkBlockInfoContainer>
      {!isLargeDisplay && (
        <NetworkBlockInfoHeaderContainer>
          <NetworkBlockInfoHeaderNameContainer variant="s2">
            {selectUserInfo?.full_name}
          </NetworkBlockInfoHeaderNameContainer>

          {selectUserInfo?.entity_type !== NetworkUserStatus.friend && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ marginRight: '12px' }}>
                <CircleIconButton
                  onClick={() => {
                    networkActions({
                      type: statusConfigItem.secondButtonActionType,
                      dispatch,
                      user: selectUserInfo as NetworkUserModel,
                      navigate,
                    });
                  }}
                  colorIconBtn=""
                  label={isLargeDisplay ? '' : statusConfigItem.secondButtonText}
                  isShowText
                  icon={<statusConfigItem.secondButtonIcon />}
                />
              </Box>
              <Box>
                {isDisabledNetworkButton({ user: selectUserInfo as NetworkUserModel }) ? (
                  <MuiTooltip color="dark" placement="top" title={t('network.tooltips.alreadySentRequest')}>
                    <Box>
                      <CircleIconButton
                        isDisabled
                        colorIconBtn=""
                        label={isLargeDisplay ? '' : statusConfigItem.buttonText}
                        isShowText
                        icon={<statusConfigItem.buttonIcon />}
                      />
                    </Box>
                  </MuiTooltip>
                ) : (
                  <CircleIconButton
                    onClick={() => {
                      networkActions({
                        type: statusConfigItem.buttonActionType,
                        dispatch,
                        user: selectUserInfo as NetworkUserModel,
                        navigate,
                      });
                    }}
                    colorIconBtn=""
                    label={isLargeDisplay ? '' : statusConfigItem.buttonText}
                    isShowText
                    icon={<statusConfigItem.buttonIcon />}
                  />
                )}
              </Box>
            </Box>
          )}
        </NetworkBlockInfoHeaderContainer>
      )}

      <NetworkBlockInfoCardContent>
        <Box sx={{ mb: '16px' }}>
          <GeneralCardInfo userInfo={selectUserInfo} />
        </Box>

        <CardInfo title={t('general.containers.contacts')}>
          <Grid container rowSpacing="16px" columnSpacing="20px">
            <Grid xs={6} item>
              <MuiPhoneNumberInputView content={`${selectUserInfo?.phone ? selectUserInfo.phone : '-'}`} />
            </Grid>
            <Grid xs={6} item>
              <MuiBaseInputView
                isShowCopyBtn
                content={`${selectUserInfo?.email ? selectUserInfo.email : '-'}`}
                label={t('general.fieldNames.email')}
              />
            </Grid>
            <Grid xs={6} item>
              <MuiBaseInputView
                content="312 Valley Farms St.Clarkston, MI 48348"
                label={t('general.fieldNames.address')}
              />
            </Grid>
            <Grid xs={6} item />
            <Grid xs={6} item>
              <MuiBaseInputView content="website.com" label={t('general.fieldNames.website')} />
            </Grid>
            <Grid xs={6} item>
              <MuiBaseInputView content="Marta Babii" label={t('general.fieldNames.facebook')} />
            </Grid>
          </Grid>
        </CardInfo>

        <CardInfo title={t('general.containers.generalInformation')}>
          <Grid container rowSpacing="16px" columnSpacing="20px">
            <Grid xs={4} item>
              <MuiBaseInputView content="01/01/2001" label={t('general.fieldNames.birthday')} />
            </Grid>
            <Grid xs={4} item>
              <MuiBaseInputView content="Female" label={t('general.fieldNames.gender')} />
            </Grid>
            <Grid xs={4} item>
              <MuiBaseInputView content="Single" label={t('general.fieldNames.relationship')} />
            </Grid>
          </Grid>
        </CardInfo>
      </NetworkBlockInfoCardContent>

      {/* End Content */}
    </NetworkBlockInfoContainer>
  ) : (
    <></>
  );
};

export default NetworkBlockInfo;
