import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid } from '@mui/material';
import { ProfileAppearanceSchema } from './schema';
import { useAppDispatch, useAppSelector } from '../../../../../../shared/hooks/redux';
import { GenderEnum } from '../../../../../../shared/enums/gender.enum';
import MuiDefaultDrawerHeader from '../../../../../modalsElements/containers/MuiDrawer/MuiDrawersHeders/MuiDefaultDrawerHeader';
import ModalFooter from '../../../../../modalsElements/containers/Footer/ModalFooter';
import MuiDotAccordion from '../../../../../accordions/MuiDotAccordion';
import MuiBaseTextFiled from '../../../../../formElements/MuiBaseTextFiled';
import MuiSelect from '../../../../../formElements/MuiSelect';
import { BodyTypeConfig } from '../../../../../../shared/configs/selectors/bodyType.config';
import { BodyTypeEnum } from '../../../../../../shared/enums/bodyType.enum';
import { BustCupSizeConfig } from '../../../../../../shared/configs/selectors/bustCupSize.config';
import { BustCupSizeEnum } from '../../../../../../shared/enums/bustCupSize.enum';
import { BustConfig } from '../../../../../../shared/configs/selectors/bust.config';
import { ShoeSizeConfig } from '../../../../../../shared/configs/selectors/shoeSize.config';
import { HairLengthConfig } from '../../../../../../shared/configs/selectors/hairLength.config';
import { HairLengthEnum } from '../../../../../../shared/enums/hairLength.enum';
import { HairTypeConfig } from '../../../../../../shared/configs/selectors/hairType.config';
import { HairTypeEnum } from '../../../../../../shared/enums/hairType.enum';
import { HairColorConfig } from '../../../../../../shared/configs/selectors/hairColor.config';
import { HairColorEnum } from '../../../../../../shared/enums/hairColor.enum';
import { EyeColorConfig } from '../../../../../../shared/configs/selectors/eyeColor.config';
import { EyeColorEnum } from '../../../../../../shared/enums/eyeColor.enum';
import { EyewearConfig } from '../../../../../../shared/configs/selectors/eyewear.config';
import { EyewearEnum } from '../../../../../../shared/enums/eyewear.enum';
import { updateProfileAppearance } from '../../../../../../store/Profile/profile.actions';
import { NotificationService } from '../../../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import errorsHandler from '../../../../../../shared/functions/errorsHandler';
import {
  GeneralModalContainer,
  GeneralModalContentContainer,
} from '../../../../../../shared/styles/GeneralModalContainers';
import { onlyNumbers } from '../../../../../../shared/functions/onlyNumbers';
type ProfileAppearanceModalContainerProps = {
  onClose: (isSubmitted?: boolean) => void;
  setIsShowUnsavedDataModal: (val: boolean) => void;
};
const ProfileAppearanceModalContainer: FC<ProfileAppearanceModalContainerProps> = ({
  onClose,
  setIsShowUnsavedDataModal,
}) => {
  const dispatch = useAppDispatch();
  const { appearance, gender } = useAppSelector(({ profile }) => profile.data);
  const [isShowConfirmLoader, setIsShowConfirmLoader] = useState<boolean>(false);
  const { t } = useTranslation();

  const initialValues = {
    bodyType: appearance.body.type === null ? null : BodyTypeConfig[appearance.body.type],
    weight: appearance.body.weight ? appearance.body.weight : '',
    heightFt: appearance.body.height ? Math.floor(appearance.body.height / 12) : '',
    heightIn: appearance.body.height
      ? (appearance.body.height - 12 * Math.floor(appearance.body.height / 12)).toFixed(0) === '0'
        ? ''
        : (appearance.body.height - 12 * Math.floor(appearance.body.height / 12)).toFixed(0)
      : '',
    waist: appearance.body.waist ? appearance.body.waist : '',
    hips: appearance.body.hips ? appearance.body.hips : '',
    bust_cup: appearance.body.bust_cup === null ? null : BustCupSizeConfig[appearance.body.bust_cup],
    bust: appearance.body.bust === null ? null : BustConfig[appearance.body.bust],
    shoe_size: appearance.body.shoe_size === null ? null : ShoeSizeConfig[appearance.body.shoe_size],
    hairLength: appearance.hair.length === null ? null : HairLengthConfig[appearance.hair.length],
    hairColor: appearance.hair.color === null ? null : HairColorConfig[appearance.hair.color],
    hairType: appearance.hair.type === null ? null : HairTypeConfig[appearance.hair.type],
    eyeColor: appearance.eye.color === null ? null : EyeColorConfig[appearance.eye.color],
    eyeWear: appearance.eye.wear === null ? null : EyewearConfig[appearance.eye.wear],
  };

  const { handleSubmit, control, setError, formState, reset } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(ProfileAppearanceSchema),
  });

  const onSubmit = (val: any) => {
    setIsShowConfirmLoader(true);
    const formatHeight = +(val.heightFt * 12 + val.heightIn * 1).toFixed(0);
    const reqData = {
      body: {
        bust: val?.bust?.value,
        bust_cup: val?.bust_cup?.value,
        height: formatHeight === 0 ? undefined : formatHeight,
        hips: val.hips,
        shoe_size: val?.shoe_size?.value,
        type: val?.bodyType?.value,
        waist: val.waist,
        weight: val.weight,
      },
      eye: {
        color: val?.eyeColor?.value,
        wear: val?.eyeWear?.value,
      },
      hair: {
        color: val?.hairColor?.value,
        length: val?.hairLength?.value,
        type: val?.hairType?.value,
      },
    };
    dispatch(updateProfileAppearance(reqData))
      .then((result) => {
        if (updateProfileAppearance.fulfilled.match(result)) {
          NotificationService.success(t('general.notifications.profileAppearanceUpdated'));
          reset();
          onClose(true);
        } else {
          errorsHandler(result, setError);
        }
      })
      .finally(() => {
        setIsShowConfirmLoader(false);
      });
  };

  const bodyTypeOptions = [
    BodyTypeConfig[BodyTypeEnum.petite],
    BodyTypeConfig[BodyTypeEnum.slim],
    BodyTypeConfig[BodyTypeEnum.athletic],
    BodyTypeConfig[BodyTypeEnum.average],
    BodyTypeConfig[BodyTypeEnum.few_extra_pounds],
    BodyTypeConfig[BodyTypeEnum.full_figured],
    BodyTypeConfig[BodyTypeEnum.large_and_lovely],
    BodyTypeConfig[BodyTypeEnum.other],
  ];

  const bustCupSizeOptions = [
    BustCupSizeConfig[BustCupSizeEnum.a],
    BustCupSizeConfig[BustCupSizeEnum.b],
    BustCupSizeConfig[BustCupSizeEnum.c],
    BustCupSizeConfig[BustCupSizeEnum.d],
    BustCupSizeConfig[BustCupSizeEnum.dd],
    BustCupSizeConfig[BustCupSizeEnum.ddd],
    BustCupSizeConfig[BustCupSizeEnum.e],
    BustCupSizeConfig[BustCupSizeEnum['f+']],
    BustCupSizeConfig[BustCupSizeEnum.g],
  ];

  const shoeSizeOptions = [
    ShoeSizeConfig[4],
    ShoeSizeConfig[4.5],
    ShoeSizeConfig[5],
    ShoeSizeConfig[5.5],
    ShoeSizeConfig[6],
    ShoeSizeConfig[6.5],
    ShoeSizeConfig[7],
    ShoeSizeConfig[7.5],
    ShoeSizeConfig[8],
    ShoeSizeConfig[8.5],
    ShoeSizeConfig[9],
    ShoeSizeConfig[9.5],
    ShoeSizeConfig[10],
    ShoeSizeConfig[10.5],
    ShoeSizeConfig[11],
    ShoeSizeConfig[11.5],
    ShoeSizeConfig[12],
    ShoeSizeConfig[12.5],
    ShoeSizeConfig[13],
    ShoeSizeConfig[13.5],
    ShoeSizeConfig[14],
    ShoeSizeConfig[14.5],
    ShoeSizeConfig[15],
    ShoeSizeConfig[15.5],
    ShoeSizeConfig[16],
  ];

  const hairLengthOptions = [
    HairLengthConfig[HairLengthEnum.bald],
    HairLengthConfig[HairLengthEnum.bald_on_top],
    HairLengthConfig[HairLengthEnum.shaved],
    HairLengthConfig[HairLengthEnum.short],
    HairLengthConfig[HairLengthEnum.medium],
    HairLengthConfig[HairLengthEnum.long],
    HairLengthConfig[HairLengthEnum.other],
  ];

  const hairTypeOptions = [
    HairTypeConfig[HairTypeEnum.straight],
    HairTypeConfig[HairTypeEnum.wavy],
    HairTypeConfig[HairTypeEnum.curly],
    HairTypeConfig[HairTypeEnum.other],
  ];

  const hairColorOptions = [
    HairColorConfig[HairColorEnum.white],
    HairColorConfig[HairColorEnum.yellow],
    HairColorConfig[HairColorEnum.dark_brown],
    HairColorConfig[HairColorEnum.blond],
    HairColorConfig[HairColorEnum.black],
    HairColorConfig[HairColorEnum.gray],
    HairColorConfig[HairColorEnum.brown],
    HairColorConfig[HairColorEnum.silver],
    HairColorConfig[HairColorEnum.changes_frequently],
    HairColorConfig[HairColorEnum.other],
  ];

  const eyeColorOptions = [
    EyeColorConfig[EyeColorEnum.blue],
    EyeColorConfig[EyeColorEnum.black],
    EyeColorConfig[EyeColorEnum.gray],
    EyeColorConfig[EyeColorEnum.brown],
    EyeColorConfig[EyeColorEnum.hazel],
    EyeColorConfig[EyeColorEnum.green],
    EyeColorConfig[EyeColorEnum.changes_frequently],
    EyeColorConfig[EyeColorEnum.other],
  ];

  const eyewearOptions = [
    EyewearConfig[EyewearEnum.contact_lenses],
    EyewearConfig[EyewearEnum.glasses],
    EyewearConfig[EyewearEnum.contact_lenses_glasses],
    EyewearConfig[EyewearEnum.other],
  ];

  const bustOptions = [
    BustConfig[32],
    BustConfig[34],
    BustConfig[36],
    BustConfig[38],
    BustConfig[40],
    BustConfig[42],
    BustConfig[44],
    BustConfig[46],
  ];

  useEffect(() => {
    setIsShowUnsavedDataModal(formState.isDirty);
  }, [formState.isDirty, setIsShowUnsavedDataModal]);

  return (
    <GeneralModalContainer>
      <MuiDefaultDrawerHeader isEditMode onClose={onClose} title={t('general.header.appearance')} />
      <form style={{ height: '100%' }} onSubmit={handleSubmit(onSubmit)} noValidate>
        <GeneralModalContentContainer>
          <MuiDotAccordion isDisabledExpand label={t('general.containers.bodyParameters')} isDefaultExpand>
            <Grid container rowSpacing="16px" columnSpacing="20px">
              <Grid xs={12} item>
                <Grid container rowSpacing="16px" columnSpacing="20px">
                  <Grid xs={6} sm={6} item>
                    <Controller
                      name="bodyType"
                      control={control}
                      render={({ field, fieldState }) => (
                        <MuiSelect
                          {...field}
                          isSearchable
                          isError={!!fieldState?.error?.message}
                          helpText={fieldState?.error?.message}
                          options={bodyTypeOptions}
                          isClearable
                          label={t('general.fieldNames.bodyType')}
                          placeholder={t('general.placeholders.select_body_type')}
                        />
                      )}
                    />
                  </Grid>
                  <Grid xs={6} sm={6} item>
                    <Controller
                      name="weight"
                      control={control}
                      render={({ field, fieldState }) => (
                        <MuiBaseTextFiled
                          label={t('general.fieldNames.weightLB')}
                          placeholder={t('general.placeholders.enter_weight')}
                          isError={!!fieldState?.error?.message}
                          errorMessage={fieldState?.error?.message}
                          type="number"
                          {...field}
                          onKeyPress={onlyNumbers}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid xs={12} item>
                <Grid container rowSpacing="16px" columnSpacing="20px">
                  <Grid xs={6} sm={6} item>
                    <Controller
                      name="heightFt"
                      control={control}
                      render={({ field, fieldState }) => (
                        <MuiBaseTextFiled
                          label={t('general.fieldNames.heightFT')}
                          placeholder={t('general.placeholders.enter_height_ft')}
                          isError={!!fieldState?.error?.message}
                          errorMessage={fieldState?.error?.message}
                          type="number"
                          {...field}
                          onKeyPress={onlyNumbers}
                        />
                      )}
                    />
                  </Grid>
                  <Grid xs={6} sm={6} item>
                    <Controller
                      name="heightIn"
                      control={control}
                      render={({ field, fieldState }) => (
                        <MuiBaseTextFiled
                          label={t('general.fieldNames.heightIN')}
                          placeholder={t('general.placeholders.enter_height_in')}
                          isError={!!fieldState?.error?.message}
                          errorMessage={fieldState?.error?.message}
                          type="number"
                          {...field}
                          onKeyPress={onlyNumbers}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid xs={12} item>
                <Grid container rowSpacing="16px" columnSpacing="20px">
                  <Grid xs={6} sm={6} item>
                    <Controller
                      name="waist"
                      control={control}
                      render={({ field, fieldState }) => (
                        <MuiBaseTextFiled
                          label={t('general.fieldNames.waistIN')}
                          placeholder={t('general.placeholders.enter_waist_circumference')}
                          isError={!!fieldState?.error?.message}
                          errorMessage={fieldState?.error?.message}
                          type="number"
                          {...field}
                          onKeyPress={onlyNumbers}
                        />
                      )}
                    />
                  </Grid>
                  <Grid xs={6} sm={6} item>
                    <Controller
                      name="hips"
                      control={control}
                      render={({ field, fieldState }) => (
                        <MuiBaseTextFiled
                          label={t('general.fieldNames.hipsIN')}
                          placeholder={t('general.placeholders.enter_hips_circumference')}
                          isError={!!fieldState?.error?.message}
                          errorMessage={fieldState?.error?.message}
                          type="number"
                          {...field}
                          onKeyPress={onlyNumbers}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {gender === GenderEnum.female && (
                <Grid xs={12} item>
                  <Grid container rowSpacing="16px" columnSpacing="20px">
                    <Grid xs={6} sm={6} item>
                      <Controller
                        name="bust_cup"
                        control={control}
                        render={({ field, fieldState }) => (
                          <MuiSelect
                            {...field}
                            isClearable
                            isSearchable
                            isError={!!fieldState?.error?.message}
                            helpText={fieldState?.error?.message}
                            options={bustCupSizeOptions}
                            label={t('general.fieldNames.bustCupSize')}
                            placeholder={t('general.placeholders.select_bust_cup_size')}
                          />
                        )}
                      />
                    </Grid>
                    <Grid xs={6} sm={6} item>
                      <Controller
                        name="bust"
                        control={control}
                        render={({ field, fieldState }) => (
                          <MuiSelect
                            {...field}
                            isClearable
                            isSearchable
                            isError={!!fieldState?.error?.message}
                            helpText={fieldState?.error?.message}
                            options={bustOptions}
                            label={t('general.fieldNames.bustIN')}
                            placeholder={t('general.placeholders.select_bust_circumference')}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              )}

              <Grid xs={12} item>
                <Grid container rowSpacing="16px" columnSpacing="20px">
                  <Grid xs={6} sm={6} item>
                    <Controller
                      name="shoe_size"
                      control={control}
                      render={({ field, fieldState }) => (
                        <MuiSelect
                          {...field}
                          isClearable
                          isSearchable
                          isError={!!fieldState?.error?.message}
                          helpText={fieldState?.error?.message}
                          options={shoeSizeOptions}
                          label={t('general.fieldNames.shoeSize')}
                          placeholder={t('general.placeholders.select_shoe_size')}
                        />
                      )}
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
                    <Grid xs={6} sm={6} item>
                      <Controller
                        name="hairType"
                        control={control}
                        render={({ field, fieldState }) => (
                          <MuiSelect
                            {...field}
                            isClearable
                            isSearchable
                            isError={!!fieldState?.error?.message}
                            helpText={fieldState?.error?.message}
                            options={hairTypeOptions}
                            label={t('general.fieldNames.hairType')}
                            placeholder={t('general.placeholders.select_type')}
                          />
                        )}
                      />
                    </Grid>
                    <Grid xs={6} sm={6} item>
                      <Controller
                        name="hairLength"
                        control={control}
                        render={({ field, fieldState }) => (
                          <MuiSelect
                            {...field}
                            isClearable
                            isSearchable
                            isError={!!fieldState?.error?.message}
                            helpText={fieldState?.error?.message}
                            options={hairLengthOptions}
                            label={t('general.fieldNames.hairLength')}
                            placeholder={t('general.placeholders.select_length')}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid xs={12} item>
                  <Grid container rowSpacing="16px" columnSpacing="20px">
                    <Grid xs={6} sm={6} item>
                      <Controller
                        name="hairColor"
                        control={control}
                        render={({ field, fieldState }) => (
                          <MuiSelect
                            {...field}
                            isClearable
                            isSearchable
                            isError={!!fieldState?.error?.message}
                            helpText={fieldState?.error?.message}
                            options={hairColorOptions}
                            label={t('general.fieldNames.hairColor')}
                            placeholder={t('general.placeholders.select_color')}
                          />
                        )}
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
                    <Grid xs={6} sm={6} item>
                      <Controller
                        name="eyeColor"
                        control={control}
                        render={({ field, fieldState }) => (
                          <MuiSelect
                            {...field}
                            isClearable
                            isSearchable
                            isError={!!fieldState?.error?.message}
                            helpText={fieldState?.error?.message}
                            options={eyeColorOptions}
                            label={t('general.fieldNames.eyeColor')}
                            placeholder={t('general.placeholders.select_color')}
                          />
                        )}
                      />
                    </Grid>
                    <Grid xs={6} sm={6} item>
                      <Controller
                        name="eyeWear"
                        control={control}
                        render={({ field, fieldState }) => (
                          <MuiSelect
                            {...field}
                            isClearable
                            isSearchable
                            isError={!!fieldState?.error?.message}
                            helpText={fieldState?.error?.message}
                            options={eyewearOptions}
                            label={t('general.fieldNames.eyeWear')}
                            placeholder={t('general.placeholders.select_eyewear')}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </MuiDotAccordion>
          </Box>
        </GeneralModalContentContainer>
        <ModalFooter
          position="absolute"
          middleBtnProps={{
            isShow: true,
            label: t('general.buttons.cancel'),
            variant: 'outlined',
            onClick: () => onClose(),
          }}
          rightBtnProps={{
            isShow: true,
            isLoadingBtn: true,
            loading: isShowConfirmLoader,
            label: t('general.buttons.save'),
            variant: 'contained',
            isStopPropagation: false,
            type: 'submit',
          }}
        />
      </form>
    </GeneralModalContainer>
  );
};

export default ProfileAppearanceModalContainer;
