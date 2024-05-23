export interface User {
    id: number;
    first_name: string;
    last_name: string;
    avatar: string;
  }
  
  export interface UserState {
    users: User[];
    user: User | null;
    totalUsers: number;
    error: any;
  }
  