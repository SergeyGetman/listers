import React, { FC, useMemo } from 'react';
import { Box, Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate, useParams } from 'react-router';
import StickyLine from '../../../../components/StickyLine';
import { NetworkCardsContainer, NetworkListItemContainer } from '../../Network.style';
import { NetworkUserModel } from '../../../../shared/models/network';
import { groupByKey } from '../../../../shared/utils/groupByKey';
import { NetworkUserStatus } from '../../../../shared/enums/networkUserStatus.enum';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux';
import { ActionMenuListModel } from '../../../../shared/models/actionMenuList.model';
import NetworkCard from '../../../../components/itemCards/NetworkCard/NetworkCard';
import { networkUserStatusesConfig } from '../../../../shared/configs/networkUserStatuses.config';
import CircleIconButton from '../../../../components/buttons/CircleIconButton';
import { UnstyledLink } from '../../../../shared/styles/UnstyledLink';
import { networkActions } from '../../functions/networkActions';
import MuiTooltip from '../../../../components/MuiTooltip';
import { isDisabledNetworkButton } from '../../functions/isDisabledNetworkButton';

type Props = {
  getNetworkUser: () => void;
  containerRef: any;
};

const SORT_PRIORITY: { [key: string]: number } = {
  [NetworkUserStatus.incoming]: 1,
  [NetworkUserStatus.outgoing]: 2,
  [NetworkUserStatus.friend]: 3,
  [NetworkUserStatus.incoming_contact]: 4,
  [NetworkUserStatus.contact]: 5,
};

const NetworkListItems: FC<Props> = ({ getNetworkUser, containerRef }) => {
  const { data, isLoading, isStopPagination } = useAppSelector((state) => state.network.network);
  const dispatch = useAppDispatch();

  const theme = useTheme();
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'));
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const skeletonArray = Array(15).fill('');

  const renderData: { type: string; items: NetworkUserModel[] }[] = useMemo(() => {
    return groupByKey(data, 'entity_type').sort((a, b) => SORT_PRIORITY[a.type] - SORT_PRIORITY[b.type]);
  }, [data]);

  const menuList: ActionMenuListModel = useMemo(() => {
    return [
      {
        label: t('general.actionMenus.edit'),
        callback: () => {},
        isDisabled: false,
      },
      {
        label: t('general.actionMenus.copyProfileLink'),
        callback: () => {},
        isDisabled: false,
      },
      {
        label: t('general.actionMenus.delete'),
        callback: () => {},
        isDisabled: false,
      },
    ];
  }, [t]);

  const CardContent: React.FC<{ entityType: NetworkUserStatus; user: NetworkUserModel }> = ({
    entityType,
    user,
  }) => {
    const statusConfigItem = useMemo(() => {
      return networkUserStatusesConfig[entityType || NetworkUserStatus.friend];
    }, [entityType]);

    if (entityType === NetworkUserStatus.friend) {
      return (
        <>
          <Box
            sx={{
              width: '16px',
              height: '16px',
              svg: {
                width: '16px',
                height: '16px',
              },
            }}
          >
            <statusConfigItem.icon />
          </Box>

          <Box sx={{ margin: '0 4px' }}>
            <Typography variant="t12r">{statusConfigItem.title}</Typography>
          </Box>
        </>
      );
    }
    return (
      <>
        <Box sx={{ marginRight: '12px' }}>
          <CircleIconButton
            onClick={(event: React.MouseEvent<any, MouseEvent>) => {
              event.preventDefault();
              networkActions({ type: statusConfigItem.secondButtonActionType, dispatch, user, navigate });
            }}
            colorIconBtn=""
            label={isMobileDisplay ? '' : statusConfigItem.secondButtonText}
            isShowText
            icon={statusConfigItem?.secondButtonIcon && <statusConfigItem.secondButtonIcon />}
          />
        </Box>
        {isDisabledNetworkButton({ user }) ? (
          <MuiTooltip color="dark" placement="top" title={t('network.tooltips.alreadySentRequest')}>
            <Box>
              <CircleIconButton
                isDisabled
                onClick={(event: React.MouseEvent<any, MouseEvent>) => {
                  event.preventDefault();
                }}
                colorIconBtn=""
                label={isMobileDisplay ? '' : statusConfigItem.buttonText}
                isShowText
                icon={<statusConfigItem.buttonIcon />}
              />
            </Box>
          </MuiTooltip>
        ) : (
          <CircleIconButton
            onClick={(event: React.MouseEvent<any, MouseEvent>) => {
              event.preventDefault();
              networkActions({ type: statusConfigItem.buttonActionType, dispatch, user, navigate });
            }}
            colorIconBtn=""
            label={isMobileDisplay ? '' : statusConfigItem.buttonText}
            isShowText
            icon={<statusConfigItem.buttonIcon />}
          />
        )}
      </>
    );
  };

  return (
    <NetworkCardsContainer ref={containerRef} id="network-user-scroll">
      {data.length === 0 && isStopPagination === false ? (
        <NetworkListItemContainer>
          {skeletonArray.map((_, skeletonIndex) => (
            <Box sx={{ mb: '12px', width: '100%' }} key={skeletonIndex}>
              <Skeleton sx={{ borderRadius: '8px' }} variant="rectangular" height={64} />
            </Box>
          ))}
        </NetworkListItemContainer>
      ) : null}
      {data.length !== 0 ? (
        <InfiniteScroll
          next={getNetworkUser}
          hasMore={isStopPagination === false}
          style={{ overflow: 'initial' }}
          loader={isLoading}
          dataLength={data.length}
          scrollableTarget="network-user-scroll"
        >
          {renderData.map((item, index) => (
            <Box sx={{ mb: '32px' }} key={index}>
              <Box sx={{ mb: '12px' }}>
                <StickyLine type={item.type} />
              </Box>

              <NetworkListItemContainer>
                {item.items.map((userInfo) => (
                  <Box sx={{ width: '100%' }}>
                    <UnstyledLink to={`${userInfo?.entity_type}/${userInfo?.id}`}>
                      <NetworkCard
                        isActiveCard={id ? userInfo?.id === +id : false}
                        id={userInfo?.id}
                        firstName={userInfo?.first_name}
                        lastName={userInfo?.last_name}
                        avatar={
                          userInfo?.avatar?.additional_info?.size_urls?.avatar_profile ||
                          userInfo?.avatar?.url ||
                          ''
                        }
                        company={userInfo?.company}
                        actionMenuList={userInfo?.entity_type === NetworkUserStatus.friend ? menuList : null}
                      >
                        <CardContent
                          user={userInfo}
                          entityType={userInfo?.entity_type as NetworkUserStatus}
                        />
                      </NetworkCard>
                    </UnstyledLink>
                  </Box>
                ))}
                {isStopPagination === false &&
                  index === renderData.length - 1 &&
                  Array(3)
                    .fill('')
                    .map((_, skeletonIndex) => (
                      <Box sx={{ mb: '12px', width: '100%' }} key={skeletonIndex}>
                        <Skeleton sx={{ borderRadius: '8px' }} variant="rectangular" height={64} />
                      </Box>
                    ))}
              </NetworkListItemContainer>
            </Box>
          ))}
        </InfiniteScroll>
      ) : (
        <></>
      )}
    </NetworkCardsContainer>
  );
};

export default NetworkListItems;
