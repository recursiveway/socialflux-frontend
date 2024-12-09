export interface SignupData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
  }
  
  export interface UserData {
    id: number;
    userName: string; 
    email: string;
    firstName: string;
    lastName: string;
  }
  
  export interface AuthResponseData {
    token: string;
    user: UserData;
  }
  
  export interface AuthResponse {
    status: 'success' | 'error';
    message: string;
    data: AuthResponseData 
  }
  
  export interface AuthResult {
    success: boolean;
    message: string;
    user: UserData | null;
  }
  

  export interface SignInCredentials {
    email: string;
    password: string;
  }