import React, { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import MuiDotAccordion from '../../accordions/MuiDotAccordion';
import MuiBaseInputView from '../../formElements/MuiBaseInputView';
type ViewCredentialsContainerProps = {
  site?: string;
  meeting_id?: string;
  login?: string;
  password?: string;
  isDefaultExpand?: boolean;
};
// TODO storybook

const ViewCredentialsContainer: FC<ViewCredentialsContainerProps> = ({
  site,
  meeting_id,
  password,
  login,
  isDefaultExpand = true,
}) => {
  const { t } = useTranslation();

  return (
    <MuiDotAccordion label={t('general.containers.credentials')} isDefaultExpand={isDefaultExpand}>
      <Box sx={{ width: '100%' }}>
        <MuiBaseInputView
          isShowCopyBtn={!!site}
          label={t('general.fieldNames.url')}
          content={site ? site : 'N/A'}
        />
      </Box>
      <Box sx={{ width: '100%', mt: '16px' }}>
        <MuiBaseInputView
          isShowCopyBtn={!!meeting_id}
          label={t('general.fieldNames.meetingId')}
          content={meeting_id ? meeting_id : 'N/A'}
        />
      </Box>
      <Box
        sx={{
          width: '100%',
          mt: '16px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ width: '50%' }}>
          <MuiBaseInputView
            isShowCopyBtn={!!login}
            label={t('general.fieldNames.login')}
            content={login ? login : 'N/A'}
          />
        </Box>
        <Box sx={{ width: '48%', ml: '16px' }}>
          <MuiBaseInputView
            label={t('general.fieldNames.password')}
            isPassword={!!password}
            content={password ? password : 'N/A'}
          />
        </Box>
      </Box>
    </MuiDotAccordion>
  );
};

export default memo(ViewCredentialsContainer);
