import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as UserActions from './user.actions';
import { CacheService } from '../cache.service';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private http: HttpClient, private cache: CacheService) {}

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.loadUsers),
    mergeMap(action => {
      const cachedData = this.cache.get(`users-page-${action.page}`);
      if (cachedData) {
        return of(UserActions.loadUsersSuccess({ users: cachedData.data, total: cachedData.total }));
      } else {
        return this.http.get(`https://reqres.in/api/users?page=${action.page}`)
          .pipe(
            map((response: any) => {
              this.cache.set(`users-page-${action.page}`, response);
              return UserActions.loadUsersSuccess({ users: response.data, total: response.total });
            }),
            catchError(error => of(UserActions.loadUsersFailure({ error })))
          );
      }
    })
  ));

  loadUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.loadUser),
    mergeMap(action => {
      const cachedData = this.cache.get(`user-${action.id}`);
      if (cachedData) {
        return of(UserActions.loadUserSuccess({ user: cachedData }));
      } else {
        return this.http.get(`https://reqres.in/api/users/${action.id}`)
          .pipe(
            map((response: any) => {
              this.cache.set(`user-${action.id}`, response.data);
              return UserActions.loadUserSuccess({ user: response.data });
            }),
            catchError(error => of(UserActions.loadUserFailure({ error })))
          );
      }
    })
  ));
}
