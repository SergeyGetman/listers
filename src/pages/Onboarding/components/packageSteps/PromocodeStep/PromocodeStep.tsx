import { Box, Typography, useTheme } from '@mui/material';
import { FC, useMemo } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useTranslation, Trans } from 'react-i18next';
import {
  getToolsLeftConfig,
  getToolsRightConfig,
} from '../../../../../shared/configs/onboarding/tools.config';
import { PlanPeriodEnum } from '../../../../../shared/enums/planPeriodEnum';
import { ToolsEnum } from '../../../../../shared/enums/onboarding/tools.enum';
import { PlansPricingItemEnum } from '../../../../../shared/enums/plansPricingItem.enum';
import { PlanModel } from '../../../../../shared/models/plans.model';

type PropsType = {
  selectedPlan: PlanModel;
  period: PlanPeriodEnum;
};

const PromocodeStep: FC<PropsType> = ({ selectedPlan, period }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const toolsArray = [...getToolsLeftConfig(t), ...getToolsRightConfig(t)];

  const list = useMemo(() => {
    if (selectedPlan.tag === PlansPricingItemEnum.starter) {
      return [ToolsEnum.deadlines, ToolsEnum.events, ToolsEnum.tasks];
    }
    if (selectedPlan.tag === PlansPricingItemEnum.basic) {
      return [ToolsEnum.deadlines, ToolsEnum.events, ToolsEnum.tasks];
    }
    return [ToolsEnum.meetings, ToolsEnum.payments, ToolsEnum.appointment, ToolsEnum.reminders];
  }, [selectedPlan]);

  return (
    <Box
      sx={{ padding: '20px 0 0' }}
      flexGrow={1}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box>
          <Typography
            lineHeight="30px"
            sx={{
              color: theme.palette.case.neutral.n800,
            }}
            fontWeight={500}
            variant="subtitle1"
            component="span"
          >
            {t('onboarding.promocodeStep.youCanUse')}{' '}
            {list.map((item, index) => {
              return (
                <Typography
                  key={index}
                  variant="subtitle1"
                  sx={{
                    display: 'inline-block',
                    background: theme.palette.case.neutral.n300,
                    p: '0 10px',
                    marginRight: '5px',
                    borderRadius: '14px',
                    whiteSpace: 'nowrap',
                  }}
                  fontWeight={700}
                  component="span"
                >
                  {toolsArray.find((el) => el.key === item)?.label}
                </Typography>
              );
            })}{' '}
            {t('onboarding.promocodeStep.selectedPlan', { plan: selectedPlan.name })}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: '24px' }}>
          <Box mb="24px">
            <Typography variant="subtitle1" fontWeight={500} sx={{ color: theme.palette.case.neutral.n800 }}>
              {t('onboarding.promocodeStep.subtitle')}
            </Typography>
          </Box>
          <Box
            p="24px"
            sx={{
              background: theme.palette.case.neutral.n75,
              borderRadius: '8px',
              maxWidth: '450px',
              alignSelf: 'center',
            }}
          >
            <Typography sx={{ color: theme.palette.case.neutral.n900 }} variant="h2" component="span">
              <Typography variant="h2" component="span">
                <Trans i18nKey="onboarding.promocodeStep.title" values={{ plan: selectedPlan.name }}>
                  <Typography color={theme.palette.case.red.r600} variant="h2" component="span" />
                </Trans>
              </Typography>
              <br />
              {t('onboarding.promocodeStep.forThePlan', { plan: selectedPlan.name })}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box display="flex" alignItems="center">
        <Box
          sx={{
            minWidth: 36,
            minHeight: 36,
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: theme.palette.case.neutral.n200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <InfoOutlinedIcon sx={{ color: theme.palette.case.neutral.n600 }} />
        </Box>
        <Box ml="12px">
          <Typography color={theme.palette.case.neutral.n700} variant="body">
            {t('onboarding.promocodeStep.discount', { period })}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PromocodeStep;
