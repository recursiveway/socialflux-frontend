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
  
  export interface SignupResponseData {
    token: string;
    user: UserData;
  }
  
  export interface SignupResponse {
    status: 'success' | 'error';
    message: string;
    data: SignupResponseData 
  }
  
  export interface SignupResult {
    success: boolean;
    message: string;
    user: UserData | null;
  }
  