'use server'

import { cookies } from 'next/headers';

interface SignupData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

interface UserData {
  id: number;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
}
  
interface SignupResponseData {
  token: string;
  user: UserData;
}
  
interface SignupResponse {
  status: 'success' | 'error';
  message: string;
  data: SignupResponseData;
}

interface SignupResult {
  success: boolean;
  message: string;
  user: UserData | null;
}

export const signup = async (data: SignupData): Promise<SignupResult> => {
  try {
    const res = await fetch('https://api.socialflux.club/api/v1/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      cache: 'no-store', 
    });

    const response: SignupResponse = await res.json();
    if (response.status === 'success') {
      const cookieStore = cookies();
      cookieStore.set('authToken', response.data.token, { 
        path: '/', 
        maxAge: 7 * 24 * 60 * 60, 
        httpOnly: true,
       
      });

      return {
        success: true,
        message: response.message,
        user: response.data.user,
      };
    } else {
      return { 
        success: false, 
        message: response.message, 
        user: null 
      };
    }
  } catch (error) {
    console.error('Signup error:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'An unexpected error occurred.', 
      user: null 
    };
  }
};