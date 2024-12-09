'use client'
import React, { useState } from 'react';
import { signup  } from '@/app/actions/auth';
import { useRouter } from 'next/navigation'
import { SignupData, SignupResult } from '@/app/types/auth';

interface CreateAccountFormProps {
  signup: (data: SignupData) => Promise<SignupResult>;
}

const CreateAccountForm: React.FC<CreateAccountFormProps> = ({ signup }) => {
  const [loading, setLoading] = useState(false); 

  const router = useRouter()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const res = await signup(formData);
      if (res.success) {
        localStorage.setItem('user', JSON.stringify(res.user));
        router.push('/');
      } else {
        console.error('Signup failed:', res.message);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    } finally {
      setLoading(false); 
    }
  };


  return (
    <div className='flex items-center   justify-center h-screen'>
      <div className="bg-white shadow-md rounded-lg p-8 max-w-sm mx-auto ">
        <h2 className="text-2xl font-semibold  text-center">Create Account</h2>
        <p className='text-sm text-[#4B5563] font-normal text-center mb-6'>Join us to start your journey</p>
        <form onSubmit={handleSubmit}>
          <div className='flex items-center gap-2'>
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-black font-semibold mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                placeholder="John"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-black font-semibold mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Smith"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-black font-semibold mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              placeholder="johnsmith"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-black font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              placeholder="john.smith@example.com"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-black font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              placeholder="********"
              value={formData.password}
              onChange={handleInputChange}
            />
            <p className="text-gray-400 text-xs ">Password must be at least 8 characters long</p>
          </div>
<div className='flex items-center justify-center'>
<button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600  text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
             {loading ? 'Signing up...' : 'Create Account'}
            
          </button>
</div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccountForm;