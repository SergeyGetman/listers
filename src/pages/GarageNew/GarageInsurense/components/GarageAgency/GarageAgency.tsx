import React, { FC, useEffect, useMemo } from 'react';
import { Grid } from '@mui/material';
import { Control, Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { HeaderOnlyTitleGeneralInformation } from '../../../../../components/containers/UpdateUiContainer/UpdateUiConteinerGarage.style';
import MuiSelect from '../../../../../components/formElements/MuiSelect';
import { ReactComponent as PeopleIcon } from '../../../../../assets/Images/network/contacts-icon.svg';
import { updateDataPeopleAgency } from '../../../store/garageSliceV2';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';
import { EmptyLine, GarageAgencyStyle } from './GarageAgency.style';
import BuisenesCardInfo from '../../../../../compositeComponents/BissnesCard';
import { useGetContacts } from '../../../components/GarageCreateNewCar/useGetContacts';
import { ItemUserModel } from '../../../../../shared/models/itemUser.model';
import { transformToAssignUserSelectValueWithRole } from '../../../../../shared/functions/transformToAssignUserSelectValueWithRole';

interface IGarageAgency {
  control: Control<any>;
}

export const SawEmtyLine = () => {
  return <EmptyLine />;
};

const GarageAgency: FC<IGarageAgency> = ({ control }) => {
  const dispatch = useAppDispatch();

  const { findUsersContactOnly }: ItemUserModel | any = useGetContacts();

  const formattedConnectionToOptions = useMemo(() => {
    if (findUsersContactOnly) {
      return transformToAssignUserSelectValueWithRole(findUsersContactOnly);
    }
    return [];
  }, [findUsersContactOnly]);

  const { arrayPeopleAgency } = useAppSelector((state) => state.garageV2);

  const watchPeopleAgency = useWatch({ control, name: 'agency' });

  useEffect(() => {
    if (watchPeopleAgency) {
      watchPeopleAgency.forEach((obj: any) => dispatch(updateDataPeopleAgency(obj)));
    }
  }, [watchPeopleAgency, dispatch]);

  const { t } = useTranslation();
  return (
    <>
      <GarageAgencyStyle>
        <Grid container rowSpacing={{ xs: '16px', sm: '16px' }} columnSpacing="24px">
          <Grid xs={6} md={2} lg={2} item>
            <HeaderOnlyTitleGeneralInformation variant="s2">
              {t('garageHub.AgencyBlock.title')}
            </HeaderOnlyTitleGeneralInformation>
          </Grid>
          <Grid item xs={12} sm={10} spacing={2}>
            <Grid container rowSpacing={{ xs: '16px', sm: '16px' }} maxWidth="900px" columnSpacing="24px">
              <Grid xs={12} lg={6} md={6} sm={4} item>
                <Controller
                  name="agency"
                  control={control}
                  render={({ field, fieldState }) => (
                    <MuiSelect
                      {...field}
                      value={arrayPeopleAgency}
                      isMulti
                      isDisableKeybordClear
                      isSearchable
                      isDisabled={false}
                      options={formattedConnectionToOptions}
                      isShowAvatarInOptions
                      startIcon={<PeopleIcon sx={{ svg: { width: '20px' } }} />}
                      controlShouldRenderValue={false}
                      label={t('garageHub.AgencyBlock.AgencyLabel.title')}
                      placeholder={t('general.placeholders.selectAMember')}
                      isError={!!fieldState.error}
                    />
                  )}
                />
              </Grid>
              {arrayPeopleAgency?.map((card: any) => (
                <Grid item xs={12} sm={6} md={6} lg={6} key={card.id}>
                  <BuisenesCardInfo
                    type="agency"
                    title={card.first_name || <SawEmtyLine />}
                    subtitle={card.last_name || <SawEmtyLine />}
                    email={card.contacts?.emails[0]?.value || <SawEmtyLine />}
                    phone={card.contacts?.phones[0]?.value || <SawEmtyLine />}
                    webSite={card.contacts?.urls[0]?.value || <SawEmtyLine />}
                    location={card.contacts?.phones[0]?.country || <SawEmtyLine />}
                    objId={card.id}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </GarageAgencyStyle>
    </>
  );
};

export default GarageAgency;
