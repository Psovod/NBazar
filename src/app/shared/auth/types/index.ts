export enum AuthRole {
  ADMIN = 'Admin',
  USER = 'User',
}
export interface Auth {
  user: User | null;
  isAuthenticated: boolean;
  authorization: Authorization | null;
}
export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  watched_estates?: Array<string>;
  role: AuthRole;
}

export interface Authorization {
  accessToken: string;
}
