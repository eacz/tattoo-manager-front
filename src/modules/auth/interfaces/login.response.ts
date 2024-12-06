export interface AuthResponse {
  token: string;
  user:  User;
}

export interface User {
  id:        number;
  username:  string;
  firstName: string;
  lastName:  string;
  email:     string;
  active:    boolean;
  country:   string;
  createdAt: Date;
  updatedAt: Date;
}
