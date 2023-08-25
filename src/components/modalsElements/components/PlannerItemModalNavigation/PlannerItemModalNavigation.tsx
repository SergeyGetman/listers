import React, { FC } from 'react';
import { Box, useTheme } from '@mui/material';
import { TabList } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { PlannerItemModalNavigationEnum } from '../../../../shared/enums/plannerItemModalNavigationEnum';
import { PlannerItemModalNavigationTab } from './PlannerItemModalNavigation.style';

type PlannerItemModalNavigationProps = {
  handleChangeNavigationTab: (tab: PlannerItemModalNavigationEnum) => void;
  isShowNotes?: boolean;
  isShowComments?: boolean;
  commentCount?: number;
  isUnreadComment?: boolean;
};

const PlannerItemModalNavigation: FC<PlannerItemModalNavigationProps> = ({
  handleChangeNavigationTab,
  isShowNotes = true,
  isShowComments = true,
  commentCount,
  isUnreadComment = false,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box sx={{ borderBottom: 1, borderColor: theme.palette.case.neutral.n200, mt: '30px' }}>
      <TabList
        sx={{ minHeight: '26px' }}
        textColor="primary"
        indicatorColor="primary"
        onChange={(event: React.SyntheticEvent, newValue: PlannerItemModalNavigationEnum) =>
          handleChangeNavigationTab(newValue)
        }
      >
        <PlannerItemModalNavigationTab
          label={t('general.modalNavigation.main')}
          value={PlannerItemModalNavigationEnum.main}
        />
        <PlannerItemModalNavigationTab
          label={t('general.modalNavigation.checklist')}
          value={PlannerItemModalNavigationEnum.checklist}
        />
        {isShowNotes && (
          <PlannerItemModalNavigationTab
            label={t('general.modalNavigation.notes')}
            value={PlannerItemModalNavigationEnum.notes}
          />
        )}
        {isShowComments && (
          <PlannerItemModalNavigationTab
            label={`${t('general.modalNavigation.comments')} ${commentCount ? `(${commentCount})` : ''} `}
            value={PlannerItemModalNavigationEnum.comments}
            isUnread={isUnreadComment}
          />
        )}

        {/*        <PlannerItemModalNavigationTab
          sx={{ margin: '0  0 0 auto !important' }}
          label={t('general.modalNavigation.activity')}
          value={PlannerItemModalNavigationEnum.activity}
        /> */}
      </TabList>
    </Box>
  );
};

export default PlannerItemModalNavigation;
