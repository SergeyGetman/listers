import React, { FC, memo, useMemo, useState } from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'react-i18next';
import { useSortable } from '@dnd-kit/sortable';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CSS } from '@dnd-kit/utilities';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { ActionMenuListModel } from '../../../shared/models/actionMenuList.model';
import { ReactComponent as AssignUserIcon } from '../../../assets/Images/assignUser.svg';
import { ReactComponent as ShareUserIcon } from '../../../assets/Images/shareUser.svg';
import useBgColor from '../../../shared/hooks/useBgColor';
import MuiBaseMobileAccordion from '../../accordions/MuiBaseMobileAccordion';
import {
  GarageItemButtonsContainer,
  GarageItemHeaderButtonsContainer,
  GarageItemImageBlock,
  GarageItemImageContainer,
  GarageItemImageShadowBox,
  GarageItemInfoBlock,
  GarageItemLeftButtonContainer,
  GarageItemMobileContainer,
  GarageItemPcContainer,
  GarageItemRightButtonContainer,
} from './GarageItemCard.style';
import UserListPopover from '../../popovers/UserListPopover';
import MuiIconButton from '../../buttons/MuiIconButton';
import BaseActionMenu from '../../actionMenus/BaseActionMenu';
import MuiBaseInputView from '../../formElements/MuiBaseInputView';
import PayDateInputView from '../../formElements/PayDateInputView';
import MuiDotAccordion from '../../accordions/MuiDotAccordion';
import FileView from '../../FilePreView';
import { DragIndicatorButtonContainer } from '../../formElements/MuiBaseInputView/MuiBaseInputView.style';
import { GarageItemModel, GarageItemSharedUserModel } from '../../../shared/models/garage.model';
import { capitalizeFirstLetter } from '../../../shared/utils/capitalizeFirstLetter';

type Props = {
  item: GarageItemModel;
  onViewFile: (index: number) => void;
  onClickCard: () => void;
  menuListItems: ActionMenuListModel;
};

const GarageItemCard: FC<Props> = ({ item, menuListItems, onClickCard }) => {
  const theme = useTheme();

  const isSmallDisplay = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();

  const { bgColor } = useBgColor();

  const [isHover, setIsHover] = useState<boolean>(false);

  const bgStyle = useMemo(() => {
    return !!item?.photos?.length
      ? `url(${
          item.photos[0]?.additional_info?.size_urls?.gallery || item.photos[0]?.url || ''
        })center center / cover no-repeat`
      : bgColor(item.id);
  }, [item.photos, item.id, bgColor]);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
    cursor: isDragging ? 'grabbing' : 'pointer',
  };

  const popoverUsers = useMemo(() => {
    if (item && item?.is_personal) {
      return item.shared_users.filter((el) => el.permission !== 'owner') as GarageItemSharedUserModel[];
    }
    return [
      ...item.shared_users.filter((el) => el.permission === 'owner').map((el) => ({ ...el, isOwner: true })),
      ...item.shared_users.filter((el) => el.permission !== 'owner'),
    ];
  }, [item]);

  return isSmallDisplay ? (
    <GarageItemMobileContainer>
      <MuiBaseMobileAccordion
        isDefaultHeaderPadding={false}
        headerComponent={
          <GarageItemImageBlock>
            {!!item?.photos?.length && (
              <>
                <GarageItemImageShadowBox isTop />
                <GarageItemImageShadowBox isTop={false} />
              </>
            )}
            <GarageItemImageContainer background={bgStyle}>
              <GarageItemHeaderButtonsContainer>
                <GarageItemButtonsContainer>
                  {item.is_shared && (
                    <GarageItemLeftButtonContainer>
                      <UserListPopover
                        anchorOriginHorizontal="left"
                        transformOriginHorizontal="left"
                        transformOriginVertical="top"
                        anchorOriginVertical="bottom"
                        users={popoverUsers}
                      >
                        <MuiIconButton isStopPropagation={false} size="large">
                          {item.is_personal ? <AssignUserIcon /> : <ShareUserIcon />}
                        </MuiIconButton>
                      </UserListPopover>
                    </GarageItemLeftButtonContainer>
                  )}
                  <GarageItemRightButtonContainer>
                    <BaseActionMenu menuList={menuListItems} />
                  </GarageItemRightButtonContainer>
                </GarageItemButtonsContainer>
              </GarageItemHeaderButtonsContainer>

              <Typography
                noWrap
                sx={{ color: theme.palette.case.contrast.white, zIndex: 2 }}
                variant="extra_large_bolt"
              >
                {item.make}
              </Typography>
            </GarageItemImageContainer>
          </GarageItemImageBlock>
        }
        isCustomHeader
      >
        <GarageItemInfoBlock onClick={onClickCard}>
          <Grid container rowSpacing="16px" columnSpacing="20px">
            <Grid xs={6} item>
              <MuiBaseInputView
                content={item.transport_type ? capitalizeFirstLetter(item.transport_type) : '-'}
                label={t('general.fieldNames.transportType')}
              />
            </Grid>
            <Grid xs={6} item>
              <MuiBaseInputView content={item.year ? item.year : '-'} label={t('general.fieldNames.year')} />
            </Grid>
            <Grid xs={6} item>
              <MuiBaseInputView content={item.make ? item.make : '-'} label={t('general.fieldNames.make')} />
            </Grid>
            <Grid xs={6} item>
              <MuiBaseInputView
                content={item.model ? item.model : '-'}
                label={t('general.fieldNames.model')}
              />
            </Grid>
            <Grid xs={6} item>
              <MuiBaseInputView
                content={item.expiration_block?.name ? item.expiration_block?.name : '-'}
                label={t('general.containers.insurance')}
              />
            </Grid>
            <Grid xs={6} item>
              <PayDateInputView
                date={item.expiration_block?.expiration ? item.expiration_block?.expiration : '-'}
                label={t('general.fieldNames.expirationDate')}
              />
            </Grid>
          </Grid>
          {(item?.documents?.all?.length > 0 || item?.documents?.insurances?.length > 0) && (
            <Box sx={{ mt: '16px' }}>
              <Grid container rowSpacing="16px" columnSpacing="20px">
                {item.documents?.insurances?.length > 0 && (
                  <Grid xs={item.documents?.all?.length > 0 ? 6 : 12} item>
                    <MuiDotAccordion label={t('general.containers.insuranceCad')} isDisabledExpand>
                      <Grid container rowSpacing="16px" columnSpacing="20px">
                        <Grid sm={12} item>
                          <FileView files={item.documents.insurances} />
                        </Grid>
                      </Grid>
                    </MuiDotAccordion>
                  </Grid>
                )}
                {item.documents?.all?.length > 0 && (
                  <Grid xs={item.documents?.insurances?.length > 0 ? 6 : 12} item>
                    <MuiDotAccordion label={t('general.containers.documents')} isDisabledExpand>
                      <Grid container rowSpacing="16px" columnSpacing="20px">
                        <Grid sm={12} item>
                          <FileView
                            files={
                              item.documents?.all?.length > 3
                                ? item.documents?.all.slice(0, 3)
                                : item.documents?.all
                            }
                          />
                        </Grid>
                      </Grid>
                    </MuiDotAccordion>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
        </GarageItemInfoBlock>
      </MuiBaseMobileAccordion>
    </GarageItemMobileContainer>
  ) : (
    <GarageItemPcContainer
      ref={setNodeRef}
      style={style}
      onClick={onClickCard}
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      <GarageItemImageBlock>
        {!!item?.photos?.length && (
          <>
            <GarageItemImageShadowBox isTop />
            <GarageItemImageShadowBox isTop={false} />
          </>
        )}
        <GarageItemImageContainer background={bgStyle}>
          <GarageItemHeaderButtonsContainer>
            <GarageItemButtonsContainer>
              {item.is_shared && (
                <GarageItemLeftButtonContainer>
                  <UserListPopover
                    anchorOriginHorizontal="left"
                    transformOriginHorizontal="left"
                    transformOriginVertical="top"
                    anchorOriginVertical="bottom"
                    users={popoverUsers}
                  >
                    <MuiIconButton isStopPropagation={false} size="large">
                      {item.is_personal ? <AssignUserIcon /> : <ShareUserIcon />}
                    </MuiIconButton>
                  </UserListPopover>
                </GarageItemLeftButtonContainer>
              )}
              <GarageItemRightButtonContainer>
                <BaseActionMenu menuList={menuListItems} />
              </GarageItemRightButtonContainer>
            </GarageItemButtonsContainer>
          </GarageItemHeaderButtonsContainer>
          <Typography
            noWrap
            sx={{ color: theme.palette.case.contrast.white, zIndex: 3 }}
            variant="extra_large_bolt"
          >
            {item.make}
          </Typography>
        </GarageItemImageContainer>
      </GarageItemImageBlock>
      <GarageItemInfoBlock isHover={isHover}>
        <DragIndicatorButtonContainer
          style={{
            opacity: isHover ? 1 : 0,
            transition: 'all 0.3s',
            color: theme.palette.case.neutral.n400,
          }}
          {...listeners}
          {...attributes}
        >
          <DragIndicatorIcon sx={{ cursor: 'grab' }} />
        </DragIndicatorButtonContainer>
        <Grid container rowSpacing="16px" columnSpacing="20px">
          <Grid sm={6} item>
            <MuiBaseInputView content={item.make ? item.make : '-'} label={t('general.fieldNames.make')} />
          </Grid>
          <Grid sm={6} item>
            <MuiBaseInputView content={item.year ? item.year : '-'} label={t('general.fieldNames.year')} />
          </Grid>
          <Grid xs={12} sm={6} item>
            <MuiBaseInputView content={item.model ? item.model : '-'} label={t('general.fieldNames.model')} />
          </Grid>
          <Grid xs={12} sm={6} item>
            <MuiBaseInputView
              content={item.license_plate ? item.license_plate : '-'}
              label={t('general.fieldNames.licensePlate')}
            />
          </Grid>
          <Grid xs={12} sm={6} item>
            <MuiBaseInputView
              content={item.expiration_block?.name ? item.expiration_block.name : '-'}
              label={t('general.containers.insurance')}
            />
          </Grid>
          <Grid xs={12} sm={6} item>
            <PayDateInputView
              date={item.expiration_block?.expiration ? item.expiration_block.expiration : '-'}
              label={t('general.fieldNames.expirationDate')}
            />
          </Grid>
        </Grid>

        {(item.documents?.all?.length > 0 || item.documents?.insurances?.length > 0) && (
          <Box sx={{ mt: '16px' }}>
            <Grid container rowSpacing="16px" columnSpacing="20px">
              {item.documents?.insurances?.length > 0 && (
                <Grid sm={item.documents?.all?.length > 0 ? 6 : 12} item>
                  <MuiDotAccordion label={t('general.containers.insuranceCad')} isDisabledExpand>
                    <Grid container rowSpacing="16px" columnSpacing="20px">
                      <Grid sm={12} item>
                        <FileView files={item.documents?.insurances} />
                      </Grid>
                    </Grid>
                  </MuiDotAccordion>
                </Grid>
              )}
              {item.documents?.all?.length > 0 && (
                <Grid sm={item.documents?.insurances?.length > 0 ? 6 : 12} item>
                  <MuiDotAccordion label={t('general.containers.documents')} isDisabledExpand>
                    <Grid container rowSpacing="16px" columnSpacing="20px">
                      <Grid sm={12} item>
                        <FileView
                          files={
                            item.documents?.all?.length > 3
                              ? item.documents?.all.slice(0, 3)
                              : item.documents?.all
                          }
                        />
                      </Grid>
                    </Grid>
                  </MuiDotAccordion>
                </Grid>
              )}
            </Grid>
          </Box>
        )}
      </GarageItemInfoBlock>
    </GarageItemPcContainer>
  );
};

export default memo(GarageItemCard);
