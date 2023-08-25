import React, { FC, useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import MuiBaseMobileAccordion from '../../accordions/MuiBaseMobileAccordion';
import MuiBaseAccordion from '../../accordions/MuiBaseAccordion';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import MuiDotAccordion from '../../accordions/MuiDotAccordion';
import MuiBaseInputView from '../../formElements/MuiBaseInputView';
import { GenderEnum } from '../../../shared/enums/gender.enum';
import { BodyTypeConfig } from '../../../shared/configs/selectors/bodyType.config';
import { BustCupSizeConfig } from '../../../shared/configs/selectors/bustCupSize.config';
import { HairLengthConfig } from '../../../shared/configs/selectors/hairLength.config';
import { HairTypeConfig } from '../../../shared/configs/selectors/hairType.config';
import { HairColorConfig } from '../../../shared/configs/selectors/hairColor.config';
import { EyeColorConfig } from '../../../shared/configs/selectors/eyeColor.config';
import { EyewearConfig } from '../../../shared/configs/selectors/eyewear.config';
import modalObserver from '../../../shared/utils/observers/modalObserver';

type ProfileAppearanceContainerProps = {
  appearance: any;
  isMobileDisplay?: boolean;
  isEdit?: boolean;
  gender: GenderEnum;
};
// TODO storybook

const ProfileAppearanceContainer: FC<ProfileAppearanceContainerProps> = ({
  appearance,
  gender,
  isMobileDisplay = false,
  isEdit = false,
}) => {
  const { t } = useTranslation();
  const menuList = [
    {
      label: t('general.actionMenus.edit'),
      callback: () => modalObserver.addModal(ModalNamesEnum.profileAppearance, {}),
      isDisabled: false,
    },
  ];
  const renderContent = useMemo(() => {
    return (
      <Box>
        <MuiDotAccordion isDisabledExpand label={t('general.containers.bodyParameters')} isDefaultExpand>
          <Grid container rowSpacing="16px" columnSpacing="20px">
            <Grid xs={12} item>
              <Grid container rowSpacing="16px" columnSpacing="20px">
                <Grid xs={6} item>
                  <MuiBaseInputView
                    content={
                      BodyTypeConfig[appearance?.body?.type]
                        ? BodyTypeConfig[appearance.body.type]?.label
                        : '-'
                    }
                    label={t('general.fieldNames.bodyType')}
                  />
                </Grid>
                <Grid xs={6} item>
                  <MuiBaseInputView
                    content={appearance?.body?.weight ? appearance.body.weight : '-'}
                    label={t('general.fieldNames.weightLB')}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} item>
              <Grid container rowSpacing="16px" columnSpacing="20px">
                <Grid xs={6} item>
                  <MuiBaseInputView
                    content={appearance?.body?.height ? Math.floor(appearance.body.height / 12) : '-'}
                    label={t('general.fieldNames.heightFT')}
                  />
                </Grid>
                <Grid xs={6} item>
                  <MuiBaseInputView
                    content={
                      appearance?.body?.height
                        ? (appearance.body.height - 12 * Math.floor(appearance.body.height / 12)).toFixed(
                            0,
                          ) === '0'
                          ? '-'
                          : (appearance.body.height - 12 * Math.floor(appearance.body.height / 12)).toFixed(0)
                        : '-'
                    }
                    label={t('general.fieldNames.heightIN')}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} item>
              <Grid container rowSpacing="16px" columnSpacing="20px">
                <Grid xs={6} item>
                  <MuiBaseInputView
                    content={appearance?.body?.waist ? appearance?.body?.waist : '-'}
                    label={t('general.fieldNames.waistIN')}
                  />
                </Grid>
                <Grid xs={6} item>
                  <MuiBaseInputView
                    content={appearance?.body?.hips ? appearance?.body?.hips : '-'}
                    label={t('general.fieldNames.hipsIN')}
                  />
                </Grid>
              </Grid>
            </Grid>
            {gender === GenderEnum.female && (
              <Grid xs={12} item>
                <Grid container rowSpacing="16px" columnSpacing="20px">
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={
                        BustCupSizeConfig[appearance?.body?.bust_cup]
                          ? BustCupSizeConfig[appearance.body.bust_cup]?.label
                          : '-'
                      }
                      label={t('general.fieldNames.bustCupSize')}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={appearance?.body?.bust ? appearance.body.bust : '-'}
                      label={t('general.fieldNames.bustIN')}
                    />
                  </Grid>
                </Grid>
              </Grid>
            )}

            <Grid xs={12} item>
              <Grid container rowSpacing="16px" columnSpacing="20px">
                <Grid xs={6} item>
                  <MuiBaseInputView
                    content={appearance?.body?.shoe_size ? appearance.body.shoe_size : '-'}
                    label={t('general.fieldNames.shoeSize')}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MuiDotAccordion>
        <Box sx={{ mt: '30px' }}>
          <MuiDotAccordion isDisabledExpand label={t('general.containers.hair')} isDefaultExpand>
            <Grid container rowSpacing="16px" columnSpacing="20px">
              <Grid xs={12} item>
                <Grid container rowSpacing="16px" columnSpacing="20px">
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={
                        HairTypeConfig[appearance?.hair?.type]
                          ? HairTypeConfig[appearance.hair.type]?.label
                          : '-'
                      }
                      label={t('general.fieldNames.hairType')}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={
                        HairLengthConfig[appearance?.hair?.length]
                          ? HairLengthConfig[appearance.hair.length]?.label
                          : '-'
                      }
                      label={t('general.fieldNames.hairLength')}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid xs={12} item>
                <Grid container rowSpacing="16px" columnSpacing="20px">
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={
                        HairColorConfig[appearance?.hair?.color]
                          ? HairColorConfig[appearance.hair.color]?.label
                          : '-'
                      }
                      label={t('general.fieldNames.hairColor')}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </MuiDotAccordion>
        </Box>
        <Box sx={{ mt: '30px' }}>
          <MuiDotAccordion isDisabledExpand label={t('general.containers.eyes')} isDefaultExpand>
            <Grid container rowSpacing="16px" columnSpacing="20px">
              <Grid xs={12} item>
                <Grid container rowSpacing="16px" columnSpacing="20px">
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={
                        EyeColorConfig[appearance?.eye?.color]
                          ? EyeColorConfig[appearance.eye.color]?.label
                          : '-'
                      }
                      label={t('general.fieldNames.eyeColor')}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={
                        EyewearConfig[appearance?.eye?.wear] ? EyewearConfig[appearance.eye.wear]?.label : '-'
                      }
                      label={t('general.fieldNames.eyeWear')}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </MuiDotAccordion>
        </Box>
      </Box>
    );
  }, [t, appearance, gender]);
  return isMobileDisplay ? (
    <MuiBaseMobileAccordion
      menuList={isEdit ? menuList : undefined}
      title={t('general.containers.appearance')}
      subtitleText={t('general.containerInfo.appearance')}
    >
      <Box sx={{ padding: '0 10px 16px 10px' }}> {renderContent}</Box>
    </MuiBaseMobileAccordion>
  ) : (
    <MuiBaseAccordion
      menuList={isEdit ? menuList : undefined}
      withHover
      label={t('general.containers.appearance')}
      isShowInfoDialog={false}
    >
      {renderContent}
    </MuiBaseAccordion>
  );
};

export default ProfileAppearanceContainer;
