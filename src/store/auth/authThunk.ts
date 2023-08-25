import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorType } from '../../shared/interfaces/error.interfaces';
import { AppDispatch } from '../store';
import api from '../../shared/services/api';
import { SignUpFormType } from '../../pages/Auth/SignUpPhone/SignUpPhone';
import { OnboardingModel, OnboardingSaveModel } from '../../shared/models/onboarding.model';
import { SignInPhoneFormType } from '../../pages/Auth/SignInPhone/SignInPhone';

export const loginRequest = createAsyncThunk<
  { token: string; is_login: boolean },
  { login: string; code: string },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('loginRequest', async (params, { rejectWithValue }) => {
  try {
    return await api.auth.login(params);
  } catch (e: any) {
    return rejectWithValue({ ...e.data, status: e.status } as ErrorType);
  }
});

export const activateUserRequest = createAsyncThunk<
  any,
  { login: string; token: string },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('activateUser', async (params, { rejectWithValue }) => {
  try {
    return await api.auth.activateUser(params);
  } catch (e: any) {
    return rejectWithValue({ ...e.data, status: e.status } as ErrorType);
  }
});

export const resendActivateUserVerificationCode = createAsyncThunk<
  any,
  { login?: string | null },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('resendActivateUserVerificationCode', async (params, { rejectWithValue }) => {
  try {
    return await api.auth.activationResendCode(params);
  } catch (e: any) {
    return rejectWithValue({ ...e.data, status: e.status } as ErrorType);
  }
});

export const registrationRequest = createAsyncThunk<
  any,
  SignUpFormType,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('registrationRequest', async (params, { rejectWithValue }) => {
  try {
    return await api.auth.registration(params);
  } catch (e: any) {
    return rejectWithValue(e.data as ErrorType);
  }
});

export const confirmationLoginRequest = createAsyncThunk<
  any,
  SignInPhoneFormType,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('registrationRequest', async (params, { rejectWithValue }) => {
  try {
    return await api.auth.confirmationLogin(params);
  } catch (e: any) {
    return rejectWithValue(e.data as ErrorType);
  }
});

export const handleDeleteSocialNetwork = createAsyncThunk<
  any,
  { provider: string; data: { password: string | null } },
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('confirmPasswordRequest', async ({ provider, data }, { rejectWithValue }) => {
  try {
    return await api.auth.deleteSocialNetwork(provider, data);
  } catch (e: any) {
    return rejectWithValue(e.data as ErrorType);
  }
});

export const getOnboardingInfo = createAsyncThunk<
  OnboardingModel,
  undefined,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('confirmPasswordRequest', async (_, { rejectWithValue }) => {
  try {
    return await api.auth.getOnboarding();
  } catch (e: any) {
    return rejectWithValue(e.data as ErrorType);
  }
});

export const setOnboardingInfo = createAsyncThunk<
  any,
  OnboardingSaveModel,
  { rejectValue: ErrorType; dispatch: AppDispatch }
>('confirmPasswordRequest', async (data, { rejectWithValue }) => {
  try {
    return await api.auth.setOnboarding(data);
  } catch (e: any) {
    return rejectWithValue(e.data as ErrorType);
  }
});
