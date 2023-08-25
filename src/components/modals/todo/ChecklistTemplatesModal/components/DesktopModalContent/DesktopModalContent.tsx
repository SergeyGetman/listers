import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ModalFooter from '../../../../../modalsElements/containers/Footer/ModalFooter';
import { ModalContainer, ModalContant } from './DesktopModalContent.style';
import ModalHeader from '../../../../../headers/ModalHeader';
import OnboardingSelect from '../../../../../OnboardingSelect';
import {
  getChecklistTemplatesLeftConfig,
  getChecklistTemplatesRightConfig,
} from '../../../../../../shared/configs/todo/checklistTemplates.config';
import { ChecklistItemTypeEnum } from '../../../../../../shared/enums/todo/checklistItemType.enum';

type Props = {
  onClose: () => void;
  func: (key: ChecklistItemTypeEnum) => void;
};

const DesktopModalContent: FC<Props> = ({ onClose, func }) => {
  const { t } = useTranslation();

  return (
    <ModalContainer>
      <ModalHeader title={t('todo.checklistTemplateModal.title')} onClose={onClose} />

      <ModalContant>
        <Grid container columnSpacing="24px" rowSpacing="16px">
          <Grid item xs={12} sm={6}>
            <Grid container rowSpacing="16px">
              {getChecklistTemplatesLeftConfig(t).map((item, index) => (
                <Grid xs={12} item key={index}>
                  <OnboardingSelect
                    onClick={() => {
                      func(item.key);
                    }}
                    text={item.label}
                    icon={item.icon}
                    isCustomizeIcon
                    selected={false}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container rowSpacing="16px">
              {getChecklistTemplatesRightConfig(t).map((item, index) => (
                <Grid xs={12} item key={index}>
                  <OnboardingSelect
                    onClick={() => {
                      func(item.key);
                    }}
                    text={item.label}
                    icon={item.icon}
                    isCustomizeIcon
                    selected={false}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </ModalContant>

      <ModalFooter
        position="sticky"
        middleBtnProps={{
          isShow: true,
          label: t('general.buttons.skip'),
          variant: 'outlined',
          size: 'medium',
          onClick: () => {
            func(ChecklistItemTypeEnum.new);
          },
        }}
      />
    </ModalContainer>
  );
};

export default DesktopModalContent;
