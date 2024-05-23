import { createSelector, createFeatureSelector } from '@ngrx/store';

const selectUserState = createFeatureSelector<any>('user');

export const selectUsers = createSelector(selectUserState, state => state.users);
export const selectUser = createSelector(selectUserState, state => state.user);
export const selectTotalUsers = createSelector(selectUserState, state => state.totalUsers);
