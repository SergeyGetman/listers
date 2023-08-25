import { Box, Typography, useTheme } from '@mui/material';
import React, { FC } from 'react';
import moment from 'moment';
import { useTranslation, Trans } from 'react-i18next';
import { ReactComponent as HubmeekKissIcon } from '../../../../../assets/Images/hubbmeek/hubmeek_kiss.svg';
import { OnboardingModel } from '../../../../../shared/models/onboarding.model';
import { getRelationShipConfig } from '../../../../../shared/configs/onboarding/relationShip.config';
import {
  getCheckListLeftConfig,
  getCheckListRightConfig,
} from '../../../../../shared/configs/onboarding/checklist.config';
import {
  getToolsLeftConfig,
  getToolsRightConfig,
} from '../../../../../shared/configs/onboarding/tools.config';

type ChipProps = { color: string; children: React.ReactNode };
const OnboardingChip: FC<ChipProps> = ({ color, children }) => {
  return (
    <Typography
      noWrap
      variant="subtitle1"
      sx={{ background: color, p: '0 10px', borderRadius: '14px' }}
      fontWeight={700}
      component="span"
    >
      {children}
    </Typography>
  );
};

type Props = {
  data: OnboardingModel;
};
const SummarizingStep: FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const checkListConfig = [...getCheckListLeftConfig(t), ...getCheckListRightConfig(t)];
  const toolsListConfig = [...getToolsLeftConfig(t), ...getToolsRightConfig(t)];
  const age = moment().diff(data.birthday[0], 'years');
  const relationship = getRelationShipConfig(t).find(({ key }) => data.relationship[0] === key)?.label;

  return (
    <Box>
      <Box>
        <Typography
          component="span"
          lineHeight="30px"
          sx={{
            width: '100%',
            display: 'inline-block',
            alignItems: 'center',
            justifyContent: 'left',
            listStyleType: 'none',
            color: theme.palette.case.neutral.n900,
          }}
          variant="subtitle1"
        >
          <Box component="span" sx={{ mr: '6px' }}>
            <Trans i18nKey="onboarding.seventhStep.ageLabel" values={{ age }}>
              <OnboardingChip color={theme.palette.case.primary.p100}>{age}</OnboardingChip>
            </Trans>
          </Box>
          <Box component="span" sx={{ mr: '6px' }}>
            <Trans i18nKey="onboarding.seventhStep.relationshipLabel" values={{ relationship }}>
              <OnboardingChip color={theme.palette.case.orange.o100}>{relationship}</OnboardingChip>
            </Trans>
          </Box>

          {data.checklist
            .slice(0, data.checklist.length > 2 ? data.checklist.length - 1 : data.checklist.length)
            .map((item, index) => (
              <Box key={index} sx={{ mr: '6px', display: 'inline-block' }}>
                <OnboardingChip color={theme.palette.case.magenta.m100}>
                  {checkListConfig.find(({ key }) => item === key)?.label}
                </OnboardingChip>
              </Box>
            ))}

          {data.checklist.length > 2 ? (
            <>
              <Box sx={{ mr: '6px', display: 'inline-block' }}>{t('onboarding.seventhStep.and')}</Box>
              <Box sx={{ mr: '6px', display: 'inline-block' }}>
                <OnboardingChip color={theme.palette.case.magenta.m100}>
                  {
                    checkListConfig.find(({ key }) => data.checklist[data.checklist.length - 1] === key)
                      ?.label
                  }
                </OnboardingChip>
              </Box>
            </>
          ) : (
            <></>
          )}

          <Typography sx={{ mr: '6px', display: 'inline-block' }} lineHeight="30px" variant="subtitle1">
            {t('onboarding.seventhStep.byUsing')}
          </Typography>

          {data.tools
            .slice(0, data.tools.length > 1 ? data.tools.length - 1 : data.tools.length)
            .map((item, index) => {
              return (
                <Box key={index} sx={{ mr: '6px', display: 'inline-block' }}>
                  <OnboardingChip color={theme.palette.case.blue.b100}>
                    {toolsListConfig.find(({ key }) => item === key)?.label}
                  </OnboardingChip>
                </Box>
              );
            })}

          {data.tools.length > 1 ? (
            <>
              <Box sx={{ mr: '6px', display: 'inline-block' }}>{t('onboarding.seventhStep.and')}</Box>
              <OnboardingChip color={theme.palette.case.blue.b100}>
                {toolsListConfig.find(({ key }) => data.tools[data.tools.length - 1] === key)?.label}
              </OnboardingChip>
            </>
          ) : (
            <></>
          )}
        </Typography>
      </Box>
      <Box display="flex" mt="24px" alignItems="center" justifyContent="center">
        <HubmeekKissIcon />
      </Box>
    </Box>
  );
};

export default SummarizingStep;
