import React, { FC, useEffect, useMemo, useRef } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MuiBaseTextFiled from '../../../../../../formElements/MuiBaseTextFiled';
import { CouponModel } from '../../../../../../../shared/models/plans.model';

type Props = {
  handleApply: (promocode: string, handleSetError: (text: string) => void) => void;
  couponState: CouponModel | null;
  gridSize?: number;
};

type Form = {
  promocode: string;
};

const defaultValues: Form = {
  promocode: '',
};

const Promocode: FC<Props> = ({ handleApply, couponState, gridSize = 7 }) => {
  const { control, handleSubmit, reset, setError } = useForm<Form>({ defaultValues });
  const formRef = useRef<HTMLFormElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const promocodeValue = useWatch({ control, name: 'promocode' });
  const { t } = useTranslation();

  const handleSetError = (text: string) => {
    setError('promocode', { type: 'manual', message: text });
  };

  const onSubmit = (form: Form) => {
    handleApply(form.promocode, handleSetError);
  };

  const isCoupon = useMemo(() => {
    return couponState?.coupon.percent_off || couponState?.coupon.amount_off;
  }, [couponState]);

  useEffect(() => {
    const promo = searchParams.get('promo');

    setSearchParams({});
    if (promo) {
      onSubmit({ promocode: promo });
      reset({ promocode: promo || '' });
    }

    // eslint-disable-next-line
  }, [searchParams]);

  return (
    <Box>
      <Typography variant="large_bolt">{t('plans.promocode.title')}</Typography>
      <Box mt="16px">
        <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
          <Grid container>
            <Grid item xs={gridSize}>
              <Controller
                control={control}
                name="promocode"
                render={({ field, fieldState }) => (
                  <MuiBaseTextFiled
                    {...field}
                    isFullWidth
                    isDisabled={isCoupon}
                    placeholder={t('general.placeholders.enter_promo_code')}
                    isError={!!fieldState.error?.message}
                    errorMessage={fieldState.error?.message}
                    withButton
                    buttonProps={{
                      isDisabled: isCoupon || !!promocodeValue === false,
                      label: 'Apply',
                      variant: 'contained',
                      type: 'submit',
                      isStopPropagation: false,
                    }}
                  />
                )}
              />
              {isCoupon && (
                <Box mt="5px">
                  <Typography
                    variant="extra_small"
                    sx={{
                      color: (theme) => theme.palette.case.neutral.n700,
                    }}
                  >
                    {t('plans.promocode.discount', {
                      discount: couponState?.coupon.percent_off
                        ? `${couponState?.coupon.percent_off}%`
                        : `$${
                            couponState?.coupon?.amount_off
                              ? (couponState?.coupon.amount_off as number) / 100
                              : couponState?.coupon.amount_off
                          }`,
                    })}
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default Promocode;
