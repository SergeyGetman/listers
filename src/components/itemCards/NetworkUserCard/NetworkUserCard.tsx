import React, { FC, useMemo } from 'react';
import { Box, Skeleton, Typography, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'react-i18next';
import BaseActionMenu from '../../actionMenus/BaseActionMenu';
import MuiTooltip from '../../MuiTooltip';

import {
  NetworkUserCardContainer,
  NetworkUserCardHeader,
  NetworkUserCardNameContainer,
  NetworkUserCardNameMobileContainer,
  NetworkUserCardNameRoleMobileContainer,
  NetworkUserCardSecondNameMobileContainer,
  NetworkUserCardTextMobileContainer,
  NetworkUserMobileCardHeader,
} from './NetworkUserCard.style';
import MuiBaseMobileAccordion from '../../accordions/MuiBaseMobileAccordion';
import MuiBaseInputView from '../../formElements/MuiBaseInputView';
import { NetworkUserStatus } from '../../../shared/enums/networkUserStatus.enum';
import { networkUserStatusesConfig } from '../../../shared/configs/networkUserStatuses.config';
import { AddressType } from '../../../shared/models/network';
import LocationView from '../../locations/LocationView';
import AvatarContainer from '../../avatars/AvatarContainer';
import { capitalizeFirstLetter } from '../../../shared/utils/capitalizeFirstLetter';
import NetworkUserCardButton from './components/NetworkUserCardButton/NetworkUserCardButton';

export type MenuListItem = {
  callback: () => void;
  isDisabled?: boolean;
  label: string;
  tooltipTitle?: string;
};

type Props = {
  id: number;
  full_name: string;
  entity_type: NetworkUserStatus;
  first_name: string;
  last_name: string;
  avatar: string;
  userShortInfo: {
    address?: AddressType;
    email?: string;
    phone?: string;
  } | null;
  userRole: string;
  is_company?: boolean;
  company?: string | null;
  onClickButton: () => void;
  onClickSecondButton: () => void;
  menuListItems: MenuListItem[];
  onToggleOpen: (isOpen: boolean) => void;
  handleClickOnCard: () => void;
  isDisable: () => boolean;
};

const NetworkUserCard: FC<Props> = ({
  id,
  full_name,
  entity_type,
  onClickButton,
  onClickSecondButton,
  first_name,
  last_name,
  userRole,
  avatar,
  menuListItems,
  userShortInfo,
  onToggleOpen,
  handleClickOnCard,
  isDisable,
  is_company,
  company,
}) => {
  const themed = useTheme();
  const isSmallDisplay = useMediaQuery(themed.breakpoints.down('sm'));
  const footerSkeleton = Array(3).fill('');
  const { t } = useTranslation();

  const statusConfigItem = useMemo(() => {
    return networkUserStatusesConfig[entity_type || NetworkUserStatus.friend];
  }, [entity_type]);

  const isCompanyName = useMemo(
    () => is_company || (is_company === undefined && company && !full_name.trim().length),
    [is_company, company, full_name],
  );

  return isSmallDisplay ? (
    <Box
      sx={{
        width: '100%',
      }}
      onClick={() =>
        entity_type !== NetworkUserStatus.friend && entity_type !== NetworkUserStatus.contact
          ? handleClickOnCard()
          : true
      }
    >
      <MuiBaseMobileAccordion
        onToggleOpen={onToggleOpen}
        isCustomHeader
        isDisabledExpand={
          entity_type !== NetworkUserStatus.friend && entity_type !== NetworkUserStatus.contact
        }
        isDefaultExpand={false}
        headerComponent={
          <NetworkUserMobileCardHeader>
            <Box sx={{ width: '100%', overflow: 'hidden', display: 'flex' }}>
              <AvatarContainer
                firstName={isCompanyName ? company?.slice(0, 1) : first_name}
                id={id}
                lastName={isCompanyName ? company?.slice(1, 2) : last_name}
                size="medium"
                src={avatar}
              />
              {entity_type === NetworkUserStatus.contact ||
              entity_type === NetworkUserStatus.incoming_contact ? (
                <NetworkUserCardTextMobileContainer>
                  {is_company || isCompanyName ? (
                    <NetworkUserCardSecondNameMobileContainer>
                      <NetworkUserCardNameMobileContainer noWrap variant="small_bolt">
                        {company}
                      </NetworkUserCardNameMobileContainer>
                      {!!full_name.trim().length && (
                        <Typography
                          noWrap
                          sx={(theme) => ({
                            color: theme.palette.case.neutral.n400,
                            margin: '2px 0 0 0',
                          })}
                          variant="extra_small"
                        >
                          {full_name}
                        </Typography>
                      )}
                    </NetworkUserCardSecondNameMobileContainer>
                  ) : (
                    <NetworkUserCardSecondNameMobileContainer>
                      <NetworkUserCardNameMobileContainer noWrap variant="small_bolt">
                        {full_name}
                      </NetworkUserCardNameMobileContainer>
                      {!!company?.length && (
                        <Typography
                          sx={(theme) => ({
                            color: theme.palette.case.neutral.n400,
                            margin: '2px 0 0 0',
                          })}
                          noWrap
                          variant="extra_small"
                        >
                          {company}
                        </Typography>
                      )}
                    </NetworkUserCardSecondNameMobileContainer>
                  )}
                </NetworkUserCardTextMobileContainer>
              ) : (
                <NetworkUserCardNameRoleMobileContainer>
                  <NetworkUserCardSecondNameMobileContainer>
                    <NetworkUserCardNameMobileContainer noWrap variant="small_bolt">
                      {isCompanyName ? company : full_name}
                    </NetworkUserCardNameMobileContainer>
                    {userRole && (
                      <Typography
                        noWrap
                        sx={(theme) => ({
                          color: theme.palette.case.neutral.n400,
                          margin: '2px 0 0 0',
                        })}
                        variant="extra_small"
                      >
                        {capitalizeFirstLetter(userRole)}
                      </Typography>
                    )}
                  </NetworkUserCardSecondNameMobileContainer>
                </NetworkUserCardNameRoleMobileContainer>
              )}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ mr: '20px' }}>
                {entity_type === NetworkUserStatus.incoming_contact ||
                entity_type === NetworkUserStatus.incoming ? (
                  <Box sx={{ display: 'flex' }}>
                    <Box sx={{ mr: '20px' }}>
                      <NetworkUserCardButton
                        onClickButton={onClickSecondButton}
                        isDisable={isDisable}
                        statusConfigItem={statusConfigItem}
                        startIcon={<statusConfigItem.secondButtonIcon />}
                        colorIconBtn={
                          statusConfigItem.secondButtonColor ? statusConfigItem.secondButtonColor : ''
                        }
                      />
                    </Box>
                    <NetworkUserCardButton
                      onClickButton={onClickButton}
                      isDisable={isDisable}
                      statusConfigItem={statusConfigItem}
                    />
                  </Box>
                ) : entity_type === NetworkUserStatus.contact ? (
                  <></>
                ) : isDisable() ? (
                  <MuiTooltip placement="top" title={t('network.tooltips.alreadySentRequest')}>
                    <Box
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <NetworkUserCardButton
                        onClickButton={onClickButton}
                        isDisable={isDisable}
                        statusConfigItem={statusConfigItem}
                      />
                    </Box>
                  </MuiTooltip>
                ) : (
                  <NetworkUserCardButton
                    onClickButton={onClickButton}
                    isDisable={isDisable}
                    statusConfigItem={statusConfigItem}
                  />
                )}
              </Box>
              <BaseActionMenu menuList={menuListItems} />
            </Box>
          </NetworkUserMobileCardHeader>
        }
        isEdit
        menuList={menuListItems}
      >
        <Box
          sx={(theme) => ({
            width: '100%',
            padding: '0 16px',
            background: theme.palette.case.neutral.n50,
          })}
          onClick={handleClickOnCard}
        >
          {userShortInfo ? (
            <>
              <Box sx={{ marginTop: '10px' }}>
                {userShortInfo.phone && (
                  <MuiBaseInputView
                    content={userShortInfo.phone}
                    isPhone
                    isShowCopyBtn
                    label={t('general.fieldNames.phoneNumber')}
                  />
                )}
              </Box>
              <Box sx={{ marginTop: '10px' }}>
                {userShortInfo.email && (
                  <MuiBaseInputView
                    content={userShortInfo.email}
                    isShowCopyBtn
                    label={t('general.fieldNames.email')}
                  />
                )}
              </Box>
              <Box sx={{ margin: '10px 0 12px 0' }}>
                {userShortInfo.address?.physical_address && userShortInfo.address.map.lat !== null && (
                  <LocationView
                    address={userShortInfo.address.physical_address}
                    location={userShortInfo.address?.map as { lat: number; lng: number }}
                    isShowHideBlockBtn={false}
                  />
                )}
              </Box>
            </>
          ) : (
            footerSkeleton.map((_, index) => (
              <Box key={index} sx={{ height: '36px', margin: index === 2 ? '10px 0 12px 0' : '10px 0 0 0 ' }}>
                <Skeleton sx={{ borderRadius: '5px' }} variant="rectangular" height={36} />
              </Box>
            ))
          )}
        </Box>
      </MuiBaseMobileAccordion>
    </Box>
  ) : (
    <NetworkUserCardContainer
      isContact={entity_type === NetworkUserStatus.contact}
      onClick={handleClickOnCard}
    >
      <NetworkUserCardHeader>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {statusConfigItem?.icon && <statusConfigItem.icon />}
          <Typography
            noWrap
            sx={{
              ml:
                entity_type !== NetworkUserStatus.contact &&
                entity_type !== NetworkUserStatus.incoming_contact
                  ? '11px'
                  : '',
            }}
            variant="small"
          >
            {statusConfigItem.label}
          </Typography>
        </Box>
        <BaseActionMenu iconSize="small" menuList={menuListItems} />
      </NetworkUserCardHeader>
      <Box sx={{ mb: '8px' }}>
        <AvatarContainer
          firstName={isCompanyName ? company?.slice(0, 1) : first_name}
          id={id}
          lastName={isCompanyName ? company?.slice(1, 2) : last_name}
          size="large"
          src={avatar}
          variant="circular"
        />
      </Box>

      {entity_type === NetworkUserStatus.contact || entity_type === NetworkUserStatus.incoming_contact ? (
        <>
          {is_company || isCompanyName ? (
            <>
              <NetworkUserCardNameContainer
                isIncomingContact={entity_type === NetworkUserStatus.incoming_contact}
                isCenter={!full_name.trim().length}
                noWrap
                variant="default_bolt"
              >
                {company}
              </NetworkUserCardNameContainer>
              <Typography
                noWrap
                sx={(theme) => ({
                  color: theme.palette.case.neutral.n400,
                })}
                variant="small"
              >
                {!!full_name.trim().length ? full_name : ''}
              </Typography>
            </>
          ) : (
            <>
              <NetworkUserCardNameContainer
                isIncomingContact={entity_type === NetworkUserStatus.incoming_contact}
                isCenter={!company?.length}
                noWrap
                variant="default_bolt"
              >
                {full_name}
              </NetworkUserCardNameContainer>
              <Typography
                noWrap
                sx={(theme) => ({
                  color: theme.palette.case.neutral.n400,
                })}
                variant="small"
              >
                {company ? company : ''}
              </Typography>
            </>
          )}
        </>
      ) : (
        <NetworkUserCardNameContainer noWrap variant="default_bolt">
          {isCompanyName ? company : full_name}
        </NetworkUserCardNameContainer>
      )}
      {userRole &&
        entity_type !== NetworkUserStatus.incoming_contact &&
        entity_type !== NetworkUserStatus.contact && (
          <Typography
            noWrap
            sx={(theme) => ({
              color: theme.palette.case.neutral.n400,
            })}
            variant="small"
          >
            {capitalizeFirstLetter(userRole)}
          </Typography>
        )}

      {entity_type === NetworkUserStatus.contact ? (
        <></>
      ) : entity_type === NetworkUserStatus.incoming_contact || entity_type === NetworkUserStatus.incoming ? (
        <Box sx={{ display: 'flex', mt: '8px', width: '100%' }}>
          <Box sx={{ width: '50%', borderRight: `1px solid ${themed.palette.case.neutral.n300}` }}>
            <NetworkUserCardButton
              isDisable={isDisable}
              statusConfigItem={statusConfigItem}
              label={networkUserStatusesConfig[entity_type].secondButtonText}
              onClickButton={onClickSecondButton}
              textColor={themed.palette.case.red.r600}
              hoverTextColor={themed.palette.case.red.r800}
            />
          </Box>
          <Box sx={{ width: '50%' }}>
            <NetworkUserCardButton
              onClickButton={onClickButton}
              isDisable={isDisable}
              statusConfigItem={statusConfigItem}
              label={networkUserStatusesConfig[entity_type].buttonText}
            />
          </Box>
        </Box>
      ) : isDisable() ? (
        <MuiTooltip placement="top" title={t('network.tooltips.alreadySentRequest')}>
          <Box sx={{ width: '100%', mt: '8px' }}>
            <NetworkUserCardButton
              onClickButton={onClickButton}
              isDisable={isDisable}
              statusConfigItem={statusConfigItem}
              label={networkUserStatusesConfig[entity_type].buttonText}
            />
          </Box>
        </MuiTooltip>
      ) : (
        <Box sx={{ width: '100%', mt: '8px' }}>
          <NetworkUserCardButton
            onClickButton={onClickButton}
            isDisable={isDisable}
            statusConfigItem={statusConfigItem}
            label={networkUserStatusesConfig[entity_type].buttonText}
          />
        </Box>
      )}
    </NetworkUserCardContainer>
  );
};

export default NetworkUserCard;
