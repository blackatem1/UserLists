import { createAction, props } from '@ngrx/store';

// Action to load users with pagination
export const loadUsers = createAction(
  '[User List] Load Users',
  props<{ page: number }>()
);

// Action dispatched when users are loaded successfully
export const loadUsersSuccess = createAction(
  '[User List] Load Users Success',
  props<{ users: any[], total: number }>()
);

// Action dispatched when loading users fails
export const loadUsersFailure = createAction(
  '[User List] Load Users Failure',
  props<{ error: any }>()
);

// Action to load a single user by ID
export const loadUser = createAction(
  '[User Detail] Load User',
  props<{ id: number }>()
);

// Action dispatched when a user is loaded successfully
export const loadUserSuccess = createAction(
  '[User Detail] Load User Success',
  props<{ user: any }>()
);

// Action dispatched when loading a user fails
export const loadUserFailure = createAction(
  '[User Detail] Load User Failure',
  props<{ error: any }>()
);
