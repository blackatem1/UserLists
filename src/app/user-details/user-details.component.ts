import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { CacheService } from '../cache.service';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadUser } from '../store/user.actions';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  userId!: number;
  user: any;
  isLoadingdet: boolean = false;

  constructor(
    private location: Location,
    private cacheService: CacheService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private store: Store,
  ) {}

  ngOnInit() {
    this.isLoadingdet = true;
    this.route.params.subscribe((params) => {
      this.userId = +params['id'];
      this.store.dispatch(loadUser({ id: +this.userId }));
      this.fetchUserDetails(this.userId).subscribe((user) => {
        this.user = user?.data; // Adjust this based on your API response structure
        this.isLoadingdet = false;
      });
    });
  }
  
  fetchUserDetails(id: number): Observable<any> {
    const cacheKey = `user_${id}`;
    if (this.cacheService.has(cacheKey)) {
      return new Observable<any>((observer) => {
        observer.next(this.cacheService.get(cacheKey));
        observer.complete();
      });
    } else {
      return this.http.get<any>('https://reqres.in/api/users/' + this.userId);
    }
  }
  goBack() {
    this.location.back();
  }
}
