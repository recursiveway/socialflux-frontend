import CreateAccountForm from '@/app/components/signup'
import React from 'react'
import { cookies } from 'next/headers';
import { SignupData,AuthResult,AuthResponse } from '@/app/types/auth';
import { redirect } from 'next/navigation';

export const runtime = 'edge'


 const signup = async (data: SignupData): Promise<AuthResult> => {
  'use server'
  try {
    const res = await fetch(`${process.env.API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      cache: 'no-store', 
    });

    const response: AuthResponse = await res.json();
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

async function checkAuth() {
  const cookieStore = cookies();
  const token = cookieStore.get('authToken');
  
  if (token) {
    redirect('/');
  }
}


export default async function SigninPage() {
  await checkAuth();
  return (
    <CreateAccountForm signup={signup}/>
  )
}

