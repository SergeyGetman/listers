import React, { FC, useEffect, useState } from 'react';
import { Box, Skeleton, Typography, useTheme } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import DowngradeFormsContainer from '../../../../DowngradePlanModal/DowngradePlanContainer/components/DowngradeFormsContainer';
import { CouponModel, PlanModel } from '../../../../../../../shared/models/plans.model';
import { PlanPeriodEnum } from '../../../../../../../shared/enums/planPeriodEnum';
import { useAppDispatch, useAppSelector } from '../../../../../../../shared/hooks/redux';
import { getPlanProrate } from '../../../../../../../store/settings/settingsThunk';
import MuiSquareIconButton from '../../../../../../buttons/MuiSquareIconButtton';
import MuiSnackbar from '../../../../../../MuiSnackbar';
import MuiTooltip from '../../../../../../MuiTooltip';
import Promocode from '../../../../DowngradePlanModal/DowngradePlanContainer/components/Promocode';

type Props = {
  plan: PlanModel;
  onClose: () => void;
  handleUpgradePlan: () => void;
  errorText: string;
  handleEditCard: () => void;
  handleGetCouponInfo: (promocode: string, handleSetError: (text: string) => void) => void;
  couponState: CouponModel | null;
};

const UpgradePlan: FC<Props> = ({
  plan,
  onClose,
  handleUpgradePlan,
  errorText,
  handleGetCouponInfo,
  handleEditCard,
  couponState,
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.profile.data);
  const [total, setTotal] = useState<number | null>(null);

  const getProrate = () => {
    dispatch(getPlanProrate(plan.id)).then((result) => {
      if (getPlanProrate.fulfilled.match(result)) {
        setTotal(result.payload.total);
      }
    });
  };

  useEffect(() => {
    if (plan?.period === PlanPeriodEnum.year && profile?.subscription?.period === PlanPeriodEnum.year) {
      getProrate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <DowngradeFormsContainer
      title={plan?.name && `Upgrade ${plan?.name}`}
      isStepper={false}
      onClose={onClose}
      rightBtnProps={{
        isShow: true,
        label: 'Pay',
        variant: 'contained',
        onClick: handleUpgradePlan,
        isStopPropagation: false,
      }}
      middleBtnProps={{ isShow: true, label: 'Cancel', type: 'button', onClick: onClose }}
    >
      <Box>
        {((plan?.period === PlanPeriodEnum.month && profile?.subscription?.period === PlanPeriodEnum.month) ||
          (plan?.period === PlanPeriodEnum.year &&
            profile?.subscription?.period === PlanPeriodEnum.month)) && (
          <Box mb="4px" display="flex" justifyContent="center">
            <Typography
              variant="h3"
              component="span"
              sx={{
                color: theme.palette.case.neutral.n700,
              }}
            >
              Total amount{' '}
              <Typography
                component="span"
                sx={{
                  color: theme.palette.primary.main,
                }}
                variant="h3"
              >
                ${couponState?.amount ? couponState.amount / 100 : plan?.amount ? plan.amount / 100 : ''}
              </Typography>
            </Typography>
          </Box>
        )}

        {plan?.period === PlanPeriodEnum.month && (
          <Box mb="16px" display="flex" justifyContent="center">
            <Typography
              sx={{
                color: theme.palette.case.neutral.n700,
              }}
              variant="large"
            >
              for your monthly subscription
            </Typography>
          </Box>
        )}
        {plan?.period === PlanPeriodEnum.year && profile?.subscription?.period === PlanPeriodEnum.month && (
          <Box mb="16px" display="flex" justifyContent="center">
            <Typography
              sx={{
                color: theme.palette.case.neutral.n700,
              }}
              variant="large"
            >
              for your annual subscription, saving <Typography variant="large_bolt">20%</Typography> of{' '}
              <Typography variant="large_bolt">
                ${((plan && plan.amount * 100) / 80 / 100).toFixed(0)}
              </Typography>
            </Typography>
          </Box>
        )}

        {plan?.period === PlanPeriodEnum.year && profile?.subscription?.period === PlanPeriodEnum.year && (
          <>
            <Box mb="16px">
              <Box mb="16px">
                <Typography variant="h3">We have great news!</Typography>
              </Box>
              <Box>
                {total ? (
                  <Typography variant="large">
                    Since you&apos;ve been using an annual plan since{' '}
                    {moment(profile?.subscription?.created_at).format('MM.DD.YYYY')}, we want to thank you for
                    your trust. So, here are the great news for you - only{' '}
                    <Typography variant="large_bolt" component="span">
                      ${total ? total / 100 : ''}{' '}
                    </Typography>
                    is left to pay from the total amount.
                  </Typography>
                ) : (
                  <Box>
                    <Skeleton height="23px" variant="text" />
                    <Skeleton height="23px" variant="text" />
                  </Box>
                )}
              </Box>
            </Box>
            <Box p="8px 16px" display="flex" justifyContent="space-between">
              <Box>
                <Typography variant="default">{plan?.name}</Typography>
              </Box>
              <Box>
                <Typography variant="large_bolt">${plan && plan.amount / 100}</Typography>
              </Box>
            </Box>
            <Box
              height="1px"
              width="100%"
              sx={{
                background: '#F2EDED',
              }}
            />
            <Box p="8px 16px" display="flex" justifyContent="space-between">
              <Box>
                <Typography variant="default">Your allowance</Typography>
              </Box>
              <Box>
                <Typography variant="large_bolt">
                  {total ? (
                    `$${(plan && plan.amount - total) / 100}`
                  ) : (
                    <Skeleton height="23px" width="100px" variant="text" />
                  )}
                </Typography>
              </Box>
            </Box>
            <Box
              height="1px"
              width="100%"
              sx={{
                background: '#F2EDED',
              }}
            />
            <Box p="16px" mb="16px" display="flex" justifyContent="space-between">
              <Box>
                <Typography variant="extra_large_bolt">Total amount</Typography>
              </Box>
              <Box>
                <Typography color="primary" variant="h3">
                  {total ? `$${total / 100}` : <Skeleton height="30px" width="100px" variant="text" />}
                </Typography>
              </Box>
            </Box>
          </>
        )}

        <Box>
          {plan?.period === PlanPeriodEnum.year && profile?.subscription?.period === PlanPeriodEnum.year ? (
            <></>
          ) : (
            <Box
              height="1px"
              width="100%"
              sx={{
                background: '#F2EDED',
              }}
            />
          )}

          {errorText && <MuiSnackbar text={errorText} />}

          <Box display="flex" p="16px 0" justifyContent="space-between">
            <Box display="flex">
              <Typography variant="large_bolt">Payment method</Typography>
              <MuiTooltip title="Edit card information">
                <Box ml="8px">
                  <MuiSquareIconButton onClick={handleEditCard}>
                    <EditIcon color="primary" sx={{ fontSize: '16px' }} />
                  </MuiSquareIconButton>
                </Box>
              </MuiTooltip>
            </Box>
            <Box display="flex" alignItems="center">
              <Box>
                <Typography
                  sx={{
                    color: theme.palette.case.neutral.n700,
                  }}
                  variant="default"
                >
                  **** **** **** {profile?.card_data?.data?.last4}
                </Typography>
              </Box>
              <Box ml="8px">
                <DoneIcon
                  color="primary"
                  sx={{
                    fontSize: '16px',
                  }}
                />
              </Box>
            </Box>
          </Box>
          {plan?.period !== PlanPeriodEnum.year && (
            <Box mt="16px">
              <Promocode couponState={couponState} handleApply={handleGetCouponInfo} />
            </Box>
          )}
        </Box>
      </Box>
    </DowngradeFormsContainer>
  );
};

export default UpgradePlan;
