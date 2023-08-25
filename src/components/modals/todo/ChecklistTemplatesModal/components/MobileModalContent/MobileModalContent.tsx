import React, { FC } from 'react';
import { Box } from '@mui/material';

import { useTranslation } from 'react-i18next';
import ModalHeader from '../../../../../headers/ModalHeader';
import OnboardingSelect from '../../../../../OnboardingSelect';
import {
  getChecklistTemplatesLeftConfig,
  getChecklistTemplatesRightConfig,
} from '../../../../../../shared/configs/todo/checklistTemplates.config';
import MuiButton from '../../../../../buttons/MuiButton';
import { ChecklistItemTypeEnum } from '../../../../../../shared/enums/todo/checklistItemType.enum';

type Props = {
  func: (key: ChecklistItemTypeEnum) => void;
  onClose: () => void;
};

const MobileModalContent: FC<Props> = ({ onClose, func }) => {
  const { t } = useTranslation();

  return (
    <>
      <ModalHeader title={t('todo.checklistTemplateModal.title')} onClose={onClose} />
      <Box
        sx={{
          width: '100%',
          padding: '16px',
        }}
      >
        {getChecklistTemplatesLeftConfig(t).map((item, index) => (
          <Box sx={{ paddingBottom: '8px' }} key={index}>
            <OnboardingSelect
              onClick={() => {
                func(item.key);
              }}
              text={item.label}
              icon={item.icon}
              isCustomizeIcon
              selected={false}
            />
          </Box>
        ))}
        {getChecklistTemplatesRightConfig(t).map((item, index) => (
          <Box
            key={index}
            sx={{
              paddingBottom: '8px',
              '&:last-child': {
                padding: 0,
              },
            }}
          >
            <OnboardingSelect
              onClick={() => {
                func(item.key);
              }}
              text={item.label}
              icon={item.icon}
              isCustomizeIcon
              selected={false}
            />
          </Box>
        ))}

        <Box sx={{ marginTop: '8px' }}>
          <MuiButton
            fullWidth
            isShow
            label={t('general.buttons.skip')}
            variant="outlined"
            size="large"
            onClick={() => {
              func(ChecklistItemTypeEnum.new);
            }}
            isFullWid
          />
        </Box>
      </Box>
    </>
  );
};

export default MobileModalContent;
