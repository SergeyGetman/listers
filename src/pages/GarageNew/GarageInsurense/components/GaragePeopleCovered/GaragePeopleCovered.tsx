import React, { FC, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { Control, Controller, useWatch } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';
import { ReactComponent as DeleteIcon } from '../../../../../assets/Images/newGarage/action-menu/Delete.svg';
import MuiSelect from '../../../../../components/formElements/MuiSelect';
import { ReactComponent as PeopleIcon } from '../../../../../assets/Images/network/contacts-icon.svg';
import { transformToAssignUserSelectValueWithRole } from '../../../../../shared/functions/transformToAssignUserSelectValueWithRole';
import { HeaderOnlyTitleGeneralInformation } from '../../../../../components/containers/UpdateUiContainer/UpdateUiConteinerGarage.style';
import { getConnections } from '../../../../../store/Profile/profile.actions';
import NetworkCard from '../../../../../components/itemCards/NetworkCard/NetworkCard';
import { removeDataPeopleCoverItem, updateDataPeopleCovered } from '../../../store/garageSliceV2';
import { GaragePeopleCoveredStyle } from './GaragePeopleCovered.style';

interface IGaragePeopleCovered {
  control: Control<any>;
}

const GaragePeopleCovered: FC<IGaragePeopleCovered> = ({ control }) => {
  const dispatch = useAppDispatch();
  const { connections } = useAppSelector((state) => state.profile);

  const { arrayPeopleCovered } = useAppSelector((state) => state.garageV2);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getConnections());
  }, [dispatch]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const watchPeopleCovered = useWatch({ control, name: 'people_covered' }) || [];

  useEffect(() => {
    if (watchPeopleCovered) {
      watchPeopleCovered.forEach((obj: any) => dispatch(updateDataPeopleCovered(obj)));
    }
  }, [watchPeopleCovered, dispatch]);

  const formattedConnectionToOptions = useMemo(() => {
    if (connections) {
      return transformToAssignUserSelectValueWithRole(connections);
    }
    return [];
  }, [connections]);

  return (
    <>
      <GaragePeopleCoveredStyle>
        <Grid container rowSpacing={{ xs: '16px', sm: '16px' }} columnSpacing="24px">
          <Grid xs={6} md={2} lg={2} item>
            <HeaderOnlyTitleGeneralInformation variant="s2">
              {t('garageHub.PeopleCoveredBlock.title')}
            </HeaderOnlyTitleGeneralInformation>
          </Grid>
          <Grid item xs={12} sm={10} spacing={2}>
            <Grid container rowSpacing={{ xs: '16px', sm: '16px' }} maxWidth="900px" columnSpacing="24px">
              <Grid xs={12} lg={6} md={6} sm={4} item>
                <Controller
                  name="people_covered"
                  control={control}
                  render={({ field, fieldState }) => (
                    <MuiSelect
                      {...field}
                      value={arrayPeopleCovered}
                      isMulti
                      isDisableKeybordClear
                      isSearchable
                      isDisabled={false}
                      options={formattedConnectionToOptions}
                      isShowAvatarInOptions
                      startIcon={<PeopleIcon sx={{ svg: { width: '20px' } }} />}
                      controlShouldRenderValue={false}
                      placeholder={t('general.placeholders.selectAMember')}
                      isError={!!fieldState.error}
                      label={t('garageHub.PeopleCoveredBlock.PeopleCoveredLabel.title')}
                    />
                  )}
                />
              </Grid>
              {arrayPeopleCovered?.map((card: any, idx: number) => (
                <Grid item xs={12} sm={6} md={6} lg={6} key={card.id}>
                  <NetworkCard
                    isActiveCard={!idx}
                    id={card.id}
                    firstName={card.first_name}
                    lastName={card.last_name}
                    avatar={card.avatar?.url}
                  >
                    <DeleteIcon onClick={() => dispatch(removeDataPeopleCoverItem(card.id))} />
                  </NetworkCard>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </GaragePeopleCoveredStyle>
    </>
  );
};

export default GaragePeopleCovered;
