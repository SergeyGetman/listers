import React, { FC, useCallback } from 'react';
import { bindPopover, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { Box, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  InfoPopover,
  InfoPopoverContainer,
  InfoPopoverHeader,
  InfoPopoverHeaderInfo,
} from './UserInfoPopover.style';
import { ItemUserModel } from '../../../shared/models/itemUser.model';
import MuiBaseInputView from '../../formElements/MuiBaseInputView';
import CircularButton from '../../buttons/CilrcularButton';
import { getUserConnectionRole } from '../../../shared/functions/getUserConnetctionRole';
import AvatarContainer from '../../avatars/AvatarContainer';
import MuiPhoneNumberInputView from '../../formElements/MuiPhoneNumberInputView';
import { useAppDispatch } from '../../../shared/hooks/redux';
import { sentInviteRequest } from '../../../store/network/networkThunk';
import { setLoading } from '../../../store/Common/commonSlice';
import router from '../../../shared/services/router';
import { NetworkTypeEnum } from '../../../shared/enums/networkType.enum';
import modalObserver from '../../../shared/utils/observers/modalObserver';

type UserInfoPopoverProps = {
  children: React.ReactNode;
  item: ItemUserModel;
  userId: number;
  anchorOriginVertical?: 'bottom' | 'top' | 'center';
  anchorOriginHorizontal?: 'center' | 'right' | 'left';
  transformOriginVertical?: 'bottom' | 'top' | 'center';
  transformOriginHorizontal?: 'center' | 'right' | 'left';
};
const UserInfoPopover: FC<UserInfoPopoverProps> = ({
  children,
  item,
  userId,
  anchorOriginHorizontal = 'left',
  anchorOriginVertical = 'top',
  transformOriginHorizontal = 'left',
  transformOriginVertical = 'bottom',
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'userInfoPopover',
  });
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSendRequest = useCallback(() => {
    dispatch(setLoading(true));
    dispatch(sentInviteRequest({ user_id: item?.id, role: t('general.friend'), login: null })).then(() => {
      modalObserver.closeAllModals();
      navigate(`${router.network.path}/${NetworkTypeEnum.all}`);
      dispatch(setLoading(false));
    });
  }, [dispatch, item?.id, navigate, t]);

  const connectionRole = getUserConnectionRole(item, userId);

  return (
    <Box onClick={(e) => e.stopPropagation()}>
      <Box sx={{ display: 'inline-block', cursor: 'pointer' }} {...bindTrigger(popupState)}>
        {children}
      </Box>
      <InfoPopover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: anchorOriginVertical,
          horizontal: anchorOriginHorizontal,
        }}
        transformOrigin={{
          vertical: transformOriginVertical,
          horizontal: transformOriginHorizontal,
        }}
      >
        {popupState.isOpen && (
          <InfoPopoverContainer>
            <InfoPopoverHeader>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AvatarContainer
                  firstName={item?.first_name}
                  lastName={item?.last_name}
                  src={
                    item?.avatar
                      ? item?.avatar?.additional_info?.size_urls?.avatar_icon || item?.avatar?.url
                      : ''
                  }
                  id={item?.id}
                />
                <InfoPopoverHeaderInfo>
                  <Typography noWrap variant="default" sx={{ lineHeight: '17px' }}>{`${
                    item?.full_name ||
                    `${item?.first_name ? item?.first_name : ''} ${item?.last_name ? item?.last_name : ''}`
                  }`}</Typography>
                  <Typography
                    noWrap
                    variant="small"
                    sx={{ color: theme.palette.case.neutral.n400, lineHeight: '16px' }}
                  >
                    {connectionRole}
                  </Typography>
                </InfoPopoverHeaderInfo>
              </Box>
              {item?.entity_type === null && !item?.is_fake && item?.id !== userId && !item?.is_deleted && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CircularButton size="small" onClick={() => handleSendRequest()} />
                </Box>
              )}
            </InfoPopoverHeader>
            <Box sx={{ marginTop: '16px' }}>
              <MuiPhoneNumberInputView
                content={item?.contacts?.phones[0]?.value ? item?.contacts?.phones[0]?.value : 'N/A'}
                isShowCopyBtn
              />

              <Box sx={{ marginTop: '16px' }}>
                <MuiBaseInputView
                  label="email"
                  isShowBottomBorder={false}
                  content={item?.contacts?.emails[0]?.value ? item?.contacts?.emails[0]?.value : 'N/A'}
                />
              </Box>
            </Box>
          </InfoPopoverContainer>
        )}
      </InfoPopover>
    </Box>
  );
};

export default UserInfoPopover;
