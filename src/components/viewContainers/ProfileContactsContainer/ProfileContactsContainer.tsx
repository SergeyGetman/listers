import React, { FC, useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import MuiBaseMobileAccordion from '../../accordions/MuiBaseMobileAccordion';
import MuiBaseAccordion from '../../accordions/MuiBaseAccordion';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import { ProfileContactsFormModel } from '../../../shared/models/profile/profileContactsForm.model';
import MuiBaseInputView from '../../formElements/MuiBaseInputView';
import MuiPhoneNumberInputView from '../../formElements/MuiPhoneNumberInputView';
import { FieldTypeConfig } from '../../../shared/configs/selectors/fieldType.config';
import { FieldsTypeEnum } from '../../../shared/enums/phoneType.enum';
import ViewLocationContainer from '../ViewLocationContainer';
import modalObserver from '../../../shared/utils/observers/modalObserver';

type ProfileContactsContainerProps = {
  isMobileDisplay?: boolean;
  isEdit?: boolean;
  contacts: ProfileContactsFormModel;
};
// TODO storybook

const ProfileContactsContainer: FC<ProfileContactsContainerProps> = ({
  isMobileDisplay = false,
  isEdit = false,
  contacts,
}) => {
  const { t } = useTranslation();

  const homeAddressIndex = contacts?.addresses?.findIndex((item) => item.type === FieldsTypeEnum.home);
  const currentAddressIndex = contacts?.addresses?.findIndex((item) => item.type === FieldsTypeEnum.current);

  const menuList = [
    {
      label: t('general.actionMenus.edit'),
      callback: () => modalObserver.addModal(ModalNamesEnum.profileContacts, {}),
      isDisabled: false,
    },
  ];
  const renderContent = useMemo(() => {
    return (
      <Box>
        <Grid container rowSpacing="16px" columnSpacing="20px">
          <Grid xs={12} item>
            <Grid container rowSpacing="16px" columnSpacing="20px">
              {contacts?.phones?.map((item, index) => (
                <Grid key={index} xs={12} item>
                  <MuiPhoneNumberInputView country={item?.country} content={item?.value} />
                </Grid>
              ))}

              {contacts?.emails?.map((item, index) => (
                <Grid key={index} xs={12} item>
                  <MuiBaseInputView
                    isShowCopyBtn
                    content={item?.value}
                    label={`${t('general.fieldNames.email')} (${
                      FieldTypeConfig[item?.type || FieldsTypeEnum.home]?.label
                    })`}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        {homeAddressIndex !== -1 && homeAddressIndex !== undefined && (
          <>
            {contacts?.addresses[homeAddressIndex]?.address && (
              <Box sx={{ mt: '30px' }}>
                <ViewLocationContainer
                  isDisabledExpand
                  subLabel={contacts?.is_same_hometown ? t('general.tooltips.theCurrentAddressTheSame') : ''}
                  label={t('general.containers.homeAddress')}
                  location={contacts?.addresses[homeAddressIndex]}
                />
              </Box>
            )}
          </>
        )}
        {currentAddressIndex !== -1 &&
          homeAddressIndex !== undefined &&
          !contacts?.is_same_hometown &&
          contacts?.addresses[currentAddressIndex]?.address && (
            <Box sx={{ mt: '30px' }}>
              <ViewLocationContainer
                isDisabledExpand
                label={t('general.containers.currentAddress')}
                location={contacts?.addresses[currentAddressIndex]}
              />
            </Box>
          )}
      </Box>
    );
  }, [contacts, t, currentAddressIndex, homeAddressIndex]);
  return isMobileDisplay ? (
    <MuiBaseMobileAccordion
      menuList={isEdit ? menuList : undefined}
      title={t('general.containers.contacts')}
      subtitleText={t('general.containerInfo.contacts')}
    >
      <Box sx={{ padding: '0 10px 16px 10px' }}> {renderContent}</Box>
    </MuiBaseMobileAccordion>
  ) : (
    <MuiBaseAccordion
      menuList={isEdit ? menuList : undefined}
      withHover
      label={t('general.containers.contacts')}
      isShowInfoDialog={false}
    >
      {renderContent}
    </MuiBaseAccordion>
  );
};

export default ProfileContactsContainer;
