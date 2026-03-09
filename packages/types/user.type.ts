export interface GoogleUserType {
  _json: {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
  };
}

export interface UserTypeUnregistered {
  name: string;
  email: string;
  password: string;
}

export interface UserLoginType {
  email: string;
  password: string;
}

export interface UserSignupResponse {
  message: string;
  data: {
    name: string;
    email: string;
    id: string;
  };
}

export interface UserType {
  name: string;
  email: string;
  id: string;
}

export interface UserTypeDB {
  id: string;
  name: string;
  email: string;
  google_id?: string;
  password?: string;
  joined_at: string;
  avatar: string;
  bio?: string;
  is_verified: boolean;
  location?: string;
}
