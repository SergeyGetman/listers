import { Grid } from '@mui/material';
import { FC, useEffect, useMemo } from 'react';
import { Control, Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { HeaderOnlyTitleGeneralInformation } from '../../../../../components/containers/UpdateUiContainer/UpdateUiConteinerGarage.style';
import MuiSelect from '../../../../../components/formElements/MuiSelect/MuiSelect';
import BuisenesCardInfo from '../../../../../compositeComponents/BissnesCard/BuisenesCardInfo';
import { SawEmtyLine } from '../GarageAgency/GarageAgency';
import { GarageAgencyStyle } from '../GarageAgency/GarageAgency.style';
import { ReactComponent as PeopleIcon } from '../../../../../assets/Images/network/contacts-icon.svg';
import { useGetContacts } from '../../../components/GarageCreateNewCar/useGetContacts';
import { ItemUserModel } from '../../../../../shared/models/itemUser.model';
import { transformToAssignUserSelectValueWithRole } from '../../../../../shared/functions/transformToAssignUserSelectValueWithRole';
import { updateDataPeopleAgent } from '../../../store/garageSliceV2';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';

interface IGarageAgent {
  control: Control<any>;
}

const GarageAgent: FC<IGarageAgent> = ({ control }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { connections }: ItemUserModel | any = useGetContacts();

  const formattedConnectionToOptions = useMemo(() => {
    if (connections) {
      return transformToAssignUserSelectValueWithRole(connections);
    }
    return [];
  }, [connections]);

  const watchPeopleAgent = useWatch({ control, name: 'agent' });

  useEffect(() => {
    if (watchPeopleAgent) {
      watchPeopleAgent.forEach((obj: any) => dispatch(updateDataPeopleAgent(obj)));
    }
  }, [watchPeopleAgent, dispatch]);

  const { arrayPeopleAgent } = useAppSelector((state) => state.garageV2);

  return (
    <>
      <GarageAgencyStyle>
        <Grid container rowSpacing={{ xs: '16px', sm: '16px' }} columnSpacing="24px">
          <Grid xs={6} md={2} lg={2} item>
            <HeaderOnlyTitleGeneralInformation variant="s2">
              {t('garageHub.AgentBlock.title')}
            </HeaderOnlyTitleGeneralInformation>
          </Grid>
          <Grid item xs={12} sm={10} spacing={2}>
            <Grid container rowSpacing={{ xs: '16px', sm: '16px' }} maxWidth="900px" columnSpacing="24px">
              <Grid xs={12} lg={6} md={6} sm={4} item>
                <Controller
                  name="agent"
                  control={control}
                  render={({ field, fieldState }) => (
                    <MuiSelect
                      {...field}
                      value={arrayPeopleAgent}
                      isMulti
                      isDisableKeybordClear
                      isSearchable
                      isDisabled={false}
                      options={formattedConnectionToOptions}
                      isShowAvatarInOptions
                      startIcon={<PeopleIcon sx={{ svg: { width: '20px' } }} />}
                      controlShouldRenderValue={false}
                      label={t('garageHub.AgentBlock.AgentLabel.title')}
                      placeholder={t('general.placeholders.selectAMember')}
                      isError={!!fieldState.error}
                    />
                  )}
                />
              </Grid>
              <Grid xs={12} lg={6} md={6} sm={4} item>
                <Controller
                  name="agent"
                  control={control}
                  render={({ field, fieldState }) => (
                    <MuiSelect
                      {...field}
                      value={arrayPeopleAgent}
                      isMulti
                      isDisableKeybordClear
                      isSearchable
                      isDisabled={false}
                      options={formattedConnectionToOptions}
                      isShowAvatarInOptions
                      startIcon={<PeopleIcon sx={{ svg: { width: '20px' } }} />}
                      controlShouldRenderValue={false}
                      label={t('garageHub.AgentBlock.AgentLabel.title')}
                      placeholder={t('general.placeholders.selectAMember')}
                      isError={!!fieldState.error}
                    />
                  )}
                />
              </Grid>
              {arrayPeopleAgent?.map((card: any) => (
                <Grid item xs={12} sm={6} md={6} lg={6} key={card.id}>
                  <BuisenesCardInfo
                    type="agent"
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
export default GarageAgent;
