import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid } from '@mui/material';
import Moment from 'moment/moment';
import MuiBaseAccordion from '../../accordions/MuiBaseAccordion';
import MuiBaseInputView from '../../formElements/MuiBaseInputView';
import MuiDotAccordion from '../../accordions/MuiDotAccordion';
import MuiBaseMobileAccordion from '../../accordions/MuiBaseMobileAccordion';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import { RelationshipConfig } from '../../../shared/configs/relationship.config';
import { GenderConfig } from '../../../shared/configs/gender.config';
import FileView from '../../FilePreView';
import { DocumentsEntityTypeEnum } from '../../../shared/enums/documentEntityType.enum';
import modalObserver from '../../../shared/utils/observers/modalObserver';

type ProfileGeneralInformationContainerProps = {
  isMobileDisplay?: boolean;
  documents?: any;
  isEdit?: boolean;
  fullName: string;
  birthday: string;
  gender: string;
  userRole?: string;
  relationship?: string;
};
// TODO storybook

const ProfileGeneralInformationContainer: FC<ProfileGeneralInformationContainerProps> = ({
  isMobileDisplay = false,
  documents = [],
  isEdit = false,
  fullName,
  birthday,
  gender,
  userRole,
  relationship,
}) => {
  const { t } = useTranslation();
  const menuList = [
    {
      label: t('general.actionMenus.edit'),
      callback: () => modalObserver.addModal(ModalNamesEnum.profileGeneralInformation, {}),
      isDisabled: false,
    },
  ];

  const renderContent = useMemo(() => {
    return (
      <Grid container rowSpacing="16px" columnSpacing="20px">
        <Grid xs={12} item>
          <Grid container rowSpacing="16px" columnSpacing="20px">
            <Grid xs={6} item>
              <MuiBaseInputView content={fullName} label={t('general.fieldNames.fullName')} />
            </Grid>
            <Grid xs={6} item>
              <MuiBaseInputView
                content={
                  birthday !== null ? Moment.utc(birthday, 'YYYY-MM-DD ').local().format('MM/DD/YYYY') : '-'
                }
                label={t('general.fieldNames.birthday')}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={12} item>
          <Grid container rowSpacing="16px" columnSpacing="20px">
            <Grid xs={6} item>
              <MuiBaseInputView
                content={GenderConfig[gender]?.label ? GenderConfig[gender].label : '-'}
                label={t('general.fieldNames.gender')}
              />
            </Grid>
            <Grid xs={6} item>
              <MuiBaseInputView
                content={
                  RelationshipConfig[relationship || '']?.label
                    ? RelationshipConfig[relationship || ''].label
                    : '-'
                }
                label={t('general.fieldNames.relationship')}
              />
            </Grid>
          </Grid>
        </Grid>

        {!!userRole && (
          <Grid xs={12} item>
            <Grid container rowSpacing="16px" columnSpacing="20px">
              <Grid xs={12} sm={12} md={6} item>
                <MuiBaseInputView content={userRole ? userRole : '-'} label={t('general.fieldNames.role')} />
              </Grid>
            </Grid>
          </Grid>
        )}

        {!!documents.length && (
          <Grid xs={12} item sx={{ pt: '30px !important' }}>
            <MuiDotAccordion
              isDisabledExpand
              label={t('general.containers.documents')}
              contentInformation={t('general.containerInfo.documents')}
              contentCounter={documents.length}
              isDefaultExpand
            >
              <FileView
                files={documents}
                entityType={DocumentsEntityTypeEnum.user_document}
                permission={{ isDelete: false, isDownload: true, isUpdate: false }}
              />
            </MuiDotAccordion>
          </Grid>
        )}
      </Grid>
    );
  }, [birthday, documents, fullName, gender, relationship, userRole, t]);
  return isMobileDisplay ? (
    <MuiBaseMobileAccordion
      menuList={isEdit ? menuList : undefined}
      title={t('general.containers.generalInformation')}
      subtitleText={t('general.containerInfo.generalInformation')}
    >
      <Box sx={{ padding: '0 10px 16px 10px', width: ' 100%' }}> {renderContent}</Box>
    </MuiBaseMobileAccordion>
  ) : (
    <MuiBaseAccordion
      menuList={isEdit ? menuList : undefined}
      withHover
      label={t('general.containers.generalInformation')}
      isShowInfoDialog={false}
    >
      {renderContent}
    </MuiBaseAccordion>
  );
};

export default ProfileGeneralInformationContainer;
