import CreateAccountForm from '@/app/components/signup'
import React from 'react'
import { cookies } from 'next/headers';
import { SignupData,SignupResult,SignupResponse } from '@/app/types/auth';

export const runtime = 'edge'


 const signup = async (data: SignupData): Promise<SignupResult> => {
  'use server'
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


const SigninPage = () => {
  return (
    <CreateAccountForm signup={signup}/>
  )
}

export default SigninPage