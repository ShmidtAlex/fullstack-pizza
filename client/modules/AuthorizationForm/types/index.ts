export interface AuthState {
  _isAuth: boolean;
  _user: User | {};
}

export type UserRole = "ADMIN" | "USER" | "VISITOR" | "REDACTOR" | "SUPERADMIN";

export interface User {
  role: UserRole;
}
