import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, mergeMap, toArray } from 'rxjs/operators';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient, private cacheService: CacheService) { }

  getAllUsers(page: number): Observable<any[]> {
    const cacheKey = `users_page_${page}`;
    if (this.cacheService.has(cacheKey)) {
      return of(this.cacheService.get(cacheKey));
    } else {
      return this.http.get<any>('https://reqres.in/api/users?page=' + page).pipe(
        map(response => response.data),
        map(users => {
          this.cacheService.set(cacheKey, users);
          return users;
        }),
        catchError(error => {
          // Handle error
          console.error('Error fetching users:', error);
          return of([]);
        })
      );
    }}
    fetchAllUsersFromPages(): Observable<any[]> {
      return this.http.get<any>(this.baseUrl).pipe(
        map(response => response.total_pages),
        mergeMap(totalPages => {
          const pageRequests = [];
          for (let i = 1; i <= totalPages; i++) {
            pageRequests.push(this.http.get<any>(`${this.baseUrl}?page=${i}`).pipe(
              map(response => response.data),
              catchError(error => {
                console.error(`Error fetching users from page ${i}:`, error);
                return of([]);
              })
            ));
          }
          return forkJoin(pageRequests);
        }),
        map(usersArrays => usersArrays.reduce((acc, users) => acc.concat(users), [])),
        catchError(error => {
          console.error('Error fetching total pages:', error);
          return of([]);
        })
      );
    }
}
