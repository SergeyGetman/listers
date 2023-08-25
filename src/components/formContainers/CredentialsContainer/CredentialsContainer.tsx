import React, { FC, memo, useMemo } from 'react';
import { Box } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import MuiBaseTextFiled from '../../formElements/MuiBaseTextFiled';
import MuiDotAccordion from '../../accordions/MuiDotAccordion';

type CredentialsContainerProps = {
  control: Control<any>;
  isContainAccordion?: boolean;
  isDefaultExpand?: boolean;
};
const CredentialsContainer: FC<CredentialsContainerProps> = ({
  control,
  isContainAccordion = true,
  isDefaultExpand = false,
}) => {
  const { t } = useTranslation();

  const renderContent = useMemo(() => {
    return (
      <Box>
        <Box sx={{ width: '100%' }}>
          <Controller
            name="site"
            control={control}
            render={({ field, fieldState }) => (
              <MuiBaseTextFiled
                label={t('general.fieldNames.url')}
                placeholder={t('general.placeholders.enter_url')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
                type="text"
                {...field}
              />
            )}
          />
        </Box>
        <Box sx={{ width: '100%', mt: '16px' }}>
          <Controller
            name="meeting_id"
            control={control}
            render={({ field, fieldState }) => (
              <MuiBaseTextFiled
                label={t('general.fieldNames.meetingId')}
                placeholder={t('general.placeholders.enter_id')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
                type="text"
                {...field}
              />
            )}
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
            <Controller
              name="login"
              control={control}
              render={({ field, fieldState }) => (
                <MuiBaseTextFiled
                  label={t('general.fieldNames.login')}
                  placeholder={t('general.placeholders.enter_login')}
                  isError={!!fieldState?.error?.message}
                  errorMessage={fieldState?.error?.message}
                  type="text"
                  {...field}
                />
              )}
            />
          </Box>
          <Box sx={{ width: '48%', ml: '16px' }}>
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <MuiBaseTextFiled
                  label={t('general.fieldNames.password')}
                  placeholder={t('general.placeholders.enter_password')}
                  isError={!!fieldState?.error?.message}
                  errorMessage={fieldState?.error?.message}
                  type="password"
                  {...field}
                />
              )}
            />
          </Box>
        </Box>
      </Box>
    );
  }, [control, t]);

  return isContainAccordion ? (
    <MuiDotAccordion label={t('general.containers.credentials')} isDefaultExpand={isDefaultExpand}>
      {renderContent}
    </MuiDotAccordion>
  ) : (
    <>{renderContent}</>
  );
};

export default memo(CredentialsContainer);
