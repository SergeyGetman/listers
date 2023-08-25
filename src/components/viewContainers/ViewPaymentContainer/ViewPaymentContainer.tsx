import React, { FC } from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import moment from 'moment/moment';
import { ReactComponent as PaymentGarageIcon } from '../../../assets/Images/payments/garage.svg';
import { PlannerItemStatusesEnum } from '../../../shared/enums/plannerItemStatuses.enum';
import MuiBaseInputView from '../../formElements/MuiBaseInputView';
import MuiDotAccordion from '../../accordions/MuiDotAccordion';
import { getSelectOptionValue } from '../../../shared/utils/generateSelectOptions';
import { getCurrencyValue } from '../../../shared/utils/getCurrencyValue';
import PlannerItemStatusBtn from '../../plannerItemStatuses/PlannerItemStatusBtn';
import { PaymentsTypeEnum } from '../../../shared/enums/paymentsTypeEnum';

type ViewPaymentContainerProps = {
  payment: any;
  handleChangeStatus: (value: PlannerItemStatusesEnum, setIsLoading?: (val: boolean) => void) => void;
};
// TODO storybook

const ViewPaymentContainer: FC<ViewPaymentContainerProps> = ({ payment, handleChangeStatus }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', width: '50%' }}>
          <PaymentGarageIcon />
          <Box
            sx={{
              ml: '10px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="default_bolt">{payment?.module}</Typography>
            <Typography sx={{ color: theme.palette.case.neutral.n700 }} variant="default">
              {payment?.title.substring(payment.title.indexOf('/') + 1)}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: '50%',
            pl: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: { sm: 'flex-start', xs: 'flex-end' },
          }}
        >
          <Box sx={{ mr: '20px' }}>
            <PlannerItemStatusBtn
              isSelected={payment.global_status === PlannerItemStatusesEnum.unpaid}
              variant={PlannerItemStatusesEnum.unpaid}
              isShowRequestLoading
              onClick={(setIsLoading?: (val: boolean) => void) =>
                handleChangeStatus(PlannerItemStatusesEnum.unpaid, setIsLoading)
              }
            />
          </Box>

          <PlannerItemStatusBtn
            isSelected={payment.global_status === PlannerItemStatusesEnum.paid}
            variant={PlannerItemStatusesEnum.paid}
            isShowRequestLoading
            onClick={(setIsLoading?: (val: boolean) => void) =>
              handleChangeStatus(PlannerItemStatusesEnum.paid, setIsLoading)
            }
          />
        </Box>
      </Box>
      <Box sx={{ mt: '16px' }}>
        <Grid container rowSpacing="16px" columnSpacing="20px">
          <Grid xs={12} item>
            <Grid container rowSpacing="16px" columnSpacing="20px">
              {payment.type === PaymentsTypeEnum.sticker && (
                <>
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={payment?.sticker_reference ? payment?.sticker_reference : '-'}
                      label={t('general.fieldNames.reference')}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={payment?.sticker_number ? payment?.sticker_number : '-'}
                      label={t('general.fieldNames.number')}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={payment?.sticker_type ? payment?.sticker_type : '-'}
                      label={t('general.fieldNames.type')}
                    />
                  </Grid>
                </>
              )}
              {payment.type === PaymentsTypeEnum.insurance && (
                <>
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={payment?.issued_by ? payment.issued_by : '-'}
                      label={t('general.fieldNames.issuedBy')}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={payment?.policy_number ? payment.policy_number : '-'}
                      label={t('general.fieldNames.policyNumber')}
                    />
                  </Grid>
                </>
              )}
              {payment.type === PaymentsTypeEnum.license && (
                <>
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={payment?.registration_id ? payment.registration_id : '-'}
                      label={t('general.fieldNames.registrationID')}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: '30px' }}>
        <MuiDotAccordion isDisabledExpand label={t('general.containers.payment')} isDefaultExpand>
          <Grid container rowSpacing="16px" columnSpacing="20px">
            <Grid xs={12} item>
              <Grid container rowSpacing="16px" columnSpacing="20px">
                <Grid xs={6} item>
                  <MuiBaseInputView
                    content={moment(payment?.paid_at).format('MM/DD/YYYY')}
                    label={t(
                      payment.type === PaymentsTypeEnum.insurance
                        ? 'general.fieldNames.paymentDay'
                        : 'general.fieldNames.purchaseDate',
                    )}
                  />
                </Grid>

                <Grid xs={6} item>
                  <MuiBaseInputView
                    content={moment(payment?.due_dated_at).format('MM/DD/YYYY')}
                    isLate={payment?.is_global_late}
                    label={t(
                      payment.type === PaymentsTypeEnum.insurance
                        ? 'general.fieldNames.paymentDueDay'
                        : 'general.fieldNames.purchaseDueDate',
                    )}
                  />
                </Grid>
                {payment.type === PaymentsTypeEnum.insurance && (
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={getSelectOptionValue(payment?.item?.frequency, 'garage.frequency')}
                      label={t('general.fieldNames.frequency')}
                    />
                  </Grid>
                )}
                <Grid xs={6} item>
                  <MuiBaseInputView
                    content={getCurrencyValue(payment?.amount || payment.item?.amount)}
                    label={t('general.fieldNames.amount')}
                  />
                </Grid>
                {payment?.late_fee && (
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={getCurrencyValue(payment?.late_fee)}
                      label={t('general.fieldNames.lateFee')}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </MuiDotAccordion>
      </Box>
    </Box>
  );
};

export default ViewPaymentContainer;
