import { createReducer, on } from '@ngrx/store';
import { loadUsers, loadUsersSuccess, loadUsersFailure, changePage } from './actions';

export interface UserState {
  users: any[];
  totalUsers: number;
  currentPage: number;
  loading: boolean;
  error: any;
}

const initialState: UserState = {
  users: [],
  totalUsers: 0,
  currentPage: 1,
  loading: false,
  error: null
};

export const userReducer = createReducer(
  initialState,
  on(loadUsers, (state, { page }) => ({
    ...state,
    loading: true,
    currentPage: page
  })),
  on(loadUsersSuccess, (state, { users, total }) => ({
    ...state,
    users,
    totalUsers: total,
    loading: false,
    error: null
  })),
  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(changePage, (state, { page }) => ({
    ...state,
    currentPage: page
  }))
);
