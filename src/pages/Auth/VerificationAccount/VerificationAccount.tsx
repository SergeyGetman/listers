import React, { useEffect, useMemo, useState } from 'react';
import { Grid } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { parsePhoneNumber } from 'react-phone-number-input';
import signUpImg from '../../../assets/Images/signUp.png';

import { AuthPageImgGridItem } from '../../../shared/styles/AuthPageImgGridItem';
import VerificationFormContainer from '../../../components/formContainers/VerificationFormContainer';
import { useAppDispatch } from '../../../shared/hooks/redux';
import { setBreadcrumbs } from '../../../store/Common/commonThunk';

const VerificationAccount = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const email = searchParams.get('email');
  const isSignIn = searchParams.get('isSignIn');

  const [isPhone, setIsPhone] = useState<boolean>(false);

  useEffect(() => {
    dispatch(setBreadcrumbs([{ title: 'Verification account' }]));
  }, [dispatch]);

  const phone = useMemo(() => {
    return parsePhoneNumber(`+${searchParams.get('phone')}` || '');
  }, [searchParams]);

  const login = useMemo(() => {
    return isPhone ? (phone?.number ? phone?.number : '') : email ? email : '';
  }, [isPhone, email, phone?.number]);

  useEffect(() => {
    if (phone && phone.isValid()) {
      setIsPhone(true);
    }
  }, [phone]);

  return (
    <Grid container>
      <AuthPageImgGridItem xl={6} item>
        <img loading="lazy" src={signUpImg} alt="mainAuth" />
      </AuthPageImgGridItem>
      <VerificationFormContainer isSignIn={!!isSignIn} isPhone={isPhone} login={login} />
    </Grid>
  );
};

export default VerificationAccount;
