import { createAction, props } from '@ngrx/store';

export const loadUsers = createAction('[User] Load Users', props<{ page: number }>());
export const loadUsersSuccess = createAction('[User] Load Users Success', props<{ users: any[], total: number }>());
export const loadUsersFailure = createAction('[User] Load Users Failure', props<{ error: any }>());

export const changePage = createAction('[User] Change Page', props<{ page: number }>());
