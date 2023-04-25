import { USER_ACTION_TYPES } from './user.types';
import { createAction } from '../../utils/reducer/reducer.utils';
import { UserProfile } from 'firebase/auth';

export const setCurrentUser = (user: UserProfile) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export const checkUserSession = () =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const googleSignInStart = () =>
  createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email: string, password: string) =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password });

export const signInSuccess = (user: UserProfile) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);

export const signInFailed = (user: UserProfile) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_FAILURE, user);

export const signUpStart = (email: string, password: string, displayName: string) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_START, {
    email,
    password,
    displayName,
  });

export const signUpSuccess = (user: UserProfile, additionalDetails: any) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails });

export const signUpFailed = (error: Error) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error);

export const signOutStart = () =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_START);

export const signOutSuccess = () =>
  createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS);

export const signOutFailed = (error: Error) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, error);
