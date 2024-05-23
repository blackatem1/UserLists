import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { Store } from '@ngrx/store';
import { changePage, loadUsers } from '../store/actions';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  // [x: string]: boolean;
  disn= false;
  fetchingst: any[] = [];
  users: any[] = [];
  allusers: any[] = [];
  currentPage: any;
  nPage: number = 1;
  filteredUsers: any[] = [];
  isLoading: boolean = false;
  nousers: boolean = false;
  forsearch: any[]=[];
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router  ) {}

  ngOnInit() {
    this.isLoading = true;
   
    this.route.queryParams.subscribe((params) => {
      this.currentPage = +params['page'] || 1;
      this.fetchUsers(this.currentPage);
    });    
   this.fetchAllUsers();
    this.checkdis();
    // this.store.dispatch(loadUsers({ page: 1 }));
    // this.userService.getAllUsers().subscribe(users => {
    //   this.users = users;
    // });
  }
  fetchUsers(page: number) {
    this.userService.getAllUsers(page).subscribe((users) => {
      if (Array.isArray(users) && users.length > 0) {
        this.users = users;
        this.allusers = users;
        this.isLoading = false; // Turn off loading indicator
      } else {
        this.users = []; // Provide a default value
        this.isLoading = false; // Turn off loading indicator
        this.nousers = true;
      }
    });
  }
  
  fetchAllUsers(): void {
      this.userService.fetchAllUsersFromPages().subscribe(
      (users: any): void => {
        this.forsearch = users;
      },
      (error) => {
        console.error('Error fetching all users:', error);
      }
    );
  }

  onSearchChange(searchTerm: string): void {
    if (searchTerm) {
        this.filteredUsers = this.forsearch.filter(
          (user) => user.id.toString() === searchTerm
        );  
      this.users = this.filteredUsers;
    } else {
      this.users = this.allusers;
    }
  }
  navigateToUserDetails(userId: number) {
    this.router.navigate(['/user', userId]);
  }
  nextPage(event:Event): void {
    if (this.disn) {
      event.preventDefault(); // Prevent default action (e.g., navigation)
    }
    
    this.currentPage++;
    this.fetchUsers(this.currentPage);
    this.updateUrl();
    this.store.dispatch(changePage({ page: this.currentPage })); // Dispatch changePage with the correct payload
    
    this.checkdis();
  
  }
  checkdis(): void {
    this.nPage =1+this.currentPage

    // alert('shit')
  this.userService.getAllUsers(this.nPage++).subscribe((users) => {
    if (Array.isArray(users) && users.length == 0) {
      this.disn = true;
    }
})}
  previousPage(): void {
    this.disn = false;
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchUsers(this.currentPage);
    }
    this.updateUrl();
  }
  private updateUrl(): void {
    this.router.navigate(['/users'], {
      queryParams: { page: this.currentPage },
    });
  }
}


