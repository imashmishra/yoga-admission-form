'use client';
 
import { lusitana } from '@/app/ui/fonts';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '../ui/button';
import { Toaster } from 'react-hot-toast';
import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation';


export default function SignupForm() {
  const router = useRouter();
  const [error, setError] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')
  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const password = formData.get('password') as string
    const confirmPassword = formData.get('repassword') as string

    // Password validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      setSuccessMessage('')
      return
    }
    if (password != confirmPassword) {
      setError('Your password is not matching')
    }

    // Password match validation
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setSuccessMessage('')
      return
    }

    try {
      const response = await fetch(`/api/auth/signup`, {
        method: 'POST',
        body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        password: password
     })
     })
     console.log(response)
     const responseData = await response.json()
     if (response.ok) {
     setSuccessMessage(responseData.message)
     router.push('/login')
     } else {
     const errorData = await response.json()
     setError(responseData.error || 'An unexpected error occurred')
     }
   } catch (error) {
     console.error('Error creating account:', error)
     setError('This email already exist')
   }
 }

 return (
   <>
     <Toaster />
     <form onSubmit={handleSignup} className='space-y-3'>
     <div className='flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8'>
     <h1 className={`${lusitana.className} mb-3 text-2xl`}>
         Create an Account
         </h1>
         <div className='w-full'>
          
         {/* Name Input */}
           <div>
             <label
                 className='mb-3 mt-5 block text-xs font-medium text-gray-900'
                 htmlFor='name'
            >
             Full Name
             </label>
             <input
               className='w-full rounded-md border border-gray-200 py-[9px] pl-3 pr-10 text-sm outline-2 placeholder:text-gray-500'
               id='name'
               type='text'
               name='name'
               placeholder='Enter your full name'
               required
            />
           </div>

           {/* Email Input */}
           <div className='mt-4'>
             <label
               className='mb-3 block text-xs font-medium text-gray-900'
                 htmlFor='email'
             >
             Email Address
         </label>
           <input
             className='w-full rounded-md border border-gray-200 py-[9px] pl-3 pr-10 text-sm outline-2 placeholder:text-gray-500'
             id='email'
             type='email'
             name='email'
             placeholder='Enter your email'
             required
               />
             </div>

             {/* Password Input */}
             <div className='mt-4'>
             <label
               className='mb-3 block text-xs font-medium text-gray-900'
                 htmlFor='repassword'
               >
                 Password
               </label>
               <input
                 className='w-full rounded-md border border-gray-200 py-[9px] pl-3 pr-10 text-sm outline-2 placeholder:text-gray-500'
                 id='repassword'
                 type='password'
                 name='repassword'
                 placeholder='Enter your password'
                 required
             />
             </div>

             {/* Re-enter Password */}
               <div className='mt-4'>
               <label
                 className='mb-3 block text-xs font-medium text-gray-900'
               htmlFor='password'
             >
                 Re-enter Password
               </label>
               <input
               className='w-full rounded-md border border-gray-200 py-[9px] pl-3 pr-10 text-sm outline-2 placeholder:text-gray-500'
               id='password'
               type='password'
               name='password'
               placeholder='Re-enter your password'
               required
             />
             </div>

             {/* Display Success Message */}
             {successMessage && (
             <p className='mb-3 text-black '>{successMessage}</p>
           )}

             {/* Display Error */}
             {error && <p className='mb-3 text-red-500'>{error}</p>}
         </div>
           <Button className='mt-4 w-full'>
           Sign Up <ArrowRightIcon className='ml-auto h-5 w-5 text-gray-50' />
            </Button>
     </div>
   </form>
   </>
  )
}