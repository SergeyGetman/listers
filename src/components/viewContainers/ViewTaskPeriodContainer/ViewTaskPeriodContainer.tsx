import React, { FC, memo, useMemo } from 'react';
import { Box, Collapse } from '@mui/material';
import Moment from 'moment';
import { useTranslation } from 'react-i18next';
import MuiCheckbox from '../../formElements/MuiCheckbox';
import MuiBaseInputView from '../../formElements/MuiBaseInputView';
import MuiDotAccordion from '../../accordions/MuiDotAccordion';
import { RecurringPatternModal } from '../../../shared/models/recurringPatternModal';
import { getRecurringItemRepeatText } from '../../../shared/functions/getRecurringItemRpeatText';

type ViewTaskPeriodContainerProps = {
  is_all_day_due_date?: boolean;
  is_all_day: boolean;
  due_dated_at?: string;
  started_at?: string;
  finished_at?: string;
  isShowRangeDate?: boolean;
  isShowDueDate?: boolean;
  isContainAccordion?: boolean;
  isLate?: boolean;
  isRecurring?: boolean;
  isShowDueTime?: boolean;
  recurringPattern?: RecurringPatternModal;
};
// TODO storybook

const ViewTaskPeriodContainer: FC<ViewTaskPeriodContainerProps> = ({
  is_all_day_due_date,
  is_all_day,
  started_at,
  finished_at,
  due_dated_at,
  isShowRangeDate = true,
  isShowDueDate = true,
  isShowDueTime = false,
  isContainAccordion = true,
  isLate,
  isRecurring,
  recurringPattern,
}) => {
  const { t } = useTranslation();

  const renderContent = useMemo(() => {
    return (
      <Box>
        <Collapse in={isShowRangeDate}>
          <Box sx={{ mb: isShowDueDate ? '16px' : '0px' }}>
            <Box sx={{ width: '100%' }}>
              <MuiCheckbox value={is_all_day} isDisabled label={t('general.fieldNames.allDay')} />
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
                  label={t('general.fieldNames.starts')}
                  content={
                    started_at
                      ? Moment.utc(started_at, 'YYYY-MM-DD HH:mm:ss').local().format('MM/DD/YYYY')
                      : 'N/A'
                  }
                />
              </Box>
              {!is_all_day && (
                <Box sx={{ width: '48%', ml: '16px' }}>
                  <MuiBaseInputView
                    label={t('general.fieldNames.time')}
                    content={
                      started_at && !is_all_day
                        ? Moment.utc(started_at, 'YYYY-MM-DD HH:mm:ss').local().format('hh:mm A')
                        : 'HH:MM'
                    }
                  />
                </Box>
              )}
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
                  label={t('general.fieldNames.ends')}
                  content={
                    finished_at
                      ? Moment.utc(finished_at, 'YYYY-MM-DD HH:mm:ss').local().format('MM/DD/YYYY')
                      : 'N/A'
                  }
                />
              </Box>
              {!is_all_day && (
                <Box sx={{ width: '48%', ml: '16px' }}>
                  <MuiBaseInputView
                    label={t('general.fieldNames.time')}
                    content={
                      finished_at && !is_all_day
                        ? Moment.utc(finished_at, 'YYYY-MM-DD HH:mm:ss').local().format('hh:mm A')
                        : 'HH:MM'
                    }
                  />
                </Box>
              )}
            </Box>
          </Box>
        </Collapse>

        {isShowDueDate && (
          <Box>
            <Collapse sx={{ width: '100%' }} in={isShowDueTime}>
              <Box sx={{ width: '100%', mb: '16px' }}>
                <MuiCheckbox value={is_all_day_due_date} isDisabled label={t('general.fieldNames.allDay')} />
              </Box>
            </Collapse>

            <Box
              sx={{
                width: '100%',

                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ width: '50%' }}>
                <MuiBaseInputView
                  isLate={isLate}
                  label={t('general.fieldNames.dueDate')}
                  content={
                    due_dated_at
                      ? Moment.utc(due_dated_at, 'YYYY-MM-DD HH:mm:ss').local().format('MM/DD/YYYY')
                      : 'N/A'
                  }
                />
              </Box>
              {!is_all_day_due_date && (
                <Collapse sx={{ width: '48%', ml: '16px' }} in={isShowDueTime}>
                  <Box sx={{ width: '100%' }}>
                    <MuiBaseInputView
                      label={t('general.fieldNames.dueTime')}
                      content={
                        due_dated_at && !is_all_day_due_date
                          ? Moment.utc(due_dated_at, 'YYYY-MM-DD HH:mm:ss').local().format('hh:mm A')
                          : 'HH:MM'
                      }
                    />
                  </Box>
                </Collapse>
              )}
            </Box>
          </Box>
        )}
        {recurringPattern && isRecurring && (
          <Box sx={{ mt: '16px' }}>
            <Box sx={{ width: '100%' }}>
              <MuiBaseInputView
                label={t('general.fieldNames.repeat')}
                content={isRecurring ? getRecurringItemRepeatText(recurringPattern) : 'N/A'}
              />
            </Box>
          </Box>
        )}
      </Box>
    );
  }, [
    t,
    due_dated_at,
    is_all_day_due_date,
    is_all_day,
    finished_at,
    started_at,
    isShowDueDate,
    isShowRangeDate,
    isLate,
    isRecurring,
    isShowDueTime,
    recurringPattern,
  ]);

  return isContainAccordion ? (
    <MuiDotAccordion
      label={t('general.containers.period')}
      isDisabledExpand
      isShowAccordionSummery={isShowRangeDate}
      isShowInfoDialog
      // TODO need tooltip text
      infoTooltipText="Two-factor authentication is a great way to keep your hubmee account secure and private. Choose how you would like to authenticate: using a phone number or email. From now on, no one else can log into your hubmee account, even if they have your username and password. We care about our users’ privacy; enjoy hubmee with peace of mind"
    >
      {renderContent}
    </MuiDotAccordion>
  ) : (
    <>{renderContent}</>
  );
};

export default memo(ViewTaskPeriodContainer);
