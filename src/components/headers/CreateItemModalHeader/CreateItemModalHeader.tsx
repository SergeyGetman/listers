import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { useTranslation } from 'react-i18next';
import MuiButton from '../../buttons/MuiButton';
import ProgressBarWithLabel from '../../ProgressBarWithLabel';
import { CreateItemModalHeaderContainer } from './CreateItemModalHeader.style';
type CreateItemModalHeaderProps = {
  title: string;
  handleCancel: () => void;
  isDisabledConfirmBtn?: boolean;
  handleConfirm: () => void;
};
const CreateItemModalHeader: FC<CreateItemModalHeaderProps> = ({
  title,
  handleConfirm,
  handleCancel,
  isDisabledConfirmBtn,
}) => {
  const { t } = useTranslation();

  return (
    <CreateItemModalHeaderContainer>
      <Box sx={{ width: '100%', maxWidth: '920px', display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <MuiButton
            onClick={handleCancel}
            variant="tertiary"
            size="medium"
            label={t('general.buttons.cancel')}
          />
          <Typography sx={{ ml: '16px' }} variant="h3">
            {title}
          </Typography>
        </Box>
        <Box sx={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Box sx={{ maxWidth: '200px', width: '100%', marginRight: '40px' }}>
            <ProgressBarWithLabel hintText={t('general.completeRate')} value={5} />
          </Box>

          <MuiButton
            variant="contained"
            label={t('general.buttons.publish')}
            size="medium"
            isDisabled={isDisabledConfirmBtn}
            onClick={handleConfirm}
            startIcon={<DoneIcon />}
          />
        </Box>
      </Box>
    </CreateItemModalHeaderContainer>
  );
};

export default CreateItemModalHeader;
