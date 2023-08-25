import React, { FC, useCallback, useMemo } from 'react';
import { useMediaQuery, useTheme, Box, Typography, Skeleton } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { isDisabledNetworkButton } from '../../../../../pages/NewNetwork/functions/isDisabledNetworkButton';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';
import BaseHeader from '../BaseHeader';
import { setShowNetworkFilter } from '../../../../../store/network/networkSlice';
import NavigationButton from '../../../../buttons/NavigationButton';
import router from '../../../../../shared/services/router';
import { NetworkUserModel } from '../../../../../shared/models/network';
import BaseActionMenu from '../../../../actionMenus/BaseActionMenu';
import { ActionMenuListModel } from '../../../../../shared/models/actionMenuList.model';
import { NetworkMobileHeaderContainer } from './NetworkHeader.style';
import { networkActions } from '../../../../../pages/NewNetwork/functions/networkActions';
import { networkUserStatusesConfig } from '../../../../../shared/configs/networkUserStatuses.config';
import { NetworkUserStatus } from '../../../../../shared/enums/networkUserStatus.enum';

type ArchiveHeaderProps = {
  isShowRightSidebar?: boolean;
};
const NetworkHeader: FC<ArchiveHeaderProps> = ({ isShowRightSidebar }) => {
  const dispatch = useAppDispatch();
  const { isShowFilter } = useAppSelector((state) => state.network.network);
  const { id } = useParams();
  const { selectUserInfo, isLoading } = useAppSelector((state) => state.network.network);

  const theme = useTheme();
  const navigate = useNavigate();

  const isLargeDisplay = useMediaQuery(theme.breakpoints.down('lg'));

  const handleHideNavigationPanel = useCallback(
    (value: boolean) => {
      dispatch(setShowNetworkFilter(value));
    },
    [dispatch],
  );

  const statusConfigItem = useMemo(() => {
    return networkUserStatusesConfig[
      selectUserInfo?.entity_type ? selectUserInfo?.entity_type : NetworkUserStatus.incoming
    ];
  }, [selectUserInfo]);

  const handleGoBack = () => {
    navigate(`${router.networkNew.path}`);
  };

  const menuList: ActionMenuListModel = useMemo(() => {
    return [
      {
        label: statusConfigItem.buttonText,
        callback: () => {
          networkActions({
            type: statusConfigItem.buttonActionType,
            dispatch,
            user: selectUserInfo as NetworkUserModel,
            navigate,
          });
        },
        isDisabled: isDisabledNetworkButton({ user: selectUserInfo as NetworkUserModel }),
      },
      {
        label: statusConfigItem.secondButtonText,
        callback: () => {
          networkActions({
            type: statusConfigItem.secondButtonActionType,
            dispatch,
            user: selectUserInfo as NetworkUserModel,
            navigate,
          });
        },
        isDisabled: false,
      },
    ];
  }, [selectUserInfo, dispatch, navigate, statusConfigItem]);

  return isLargeDisplay && id ? (
    <NetworkMobileHeaderContainer>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <NavigationButton onClick={handleGoBack} type="back" />

        <Box sx={{ ml: '8px' }}>
          {isLoading ? (
            <Skeleton variant="rectangular" height={20} width={100} />
          ) : (
            <Typography variant="s1">{selectUserInfo?.full_name}</Typography>
          )}
        </Box>
      </Box>

      <BaseActionMenu menuList={menuList} />
    </NetworkMobileHeaderContainer>
  ) : (
    <BaseHeader
      isShowNavigationPanel={isShowFilter}
      handleHideNavigationPanel={handleHideNavigationPanel}
      isShowRightSidebar={isShowRightSidebar}
    />
  );
};

export default NetworkHeader;
