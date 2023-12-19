import Search from '@/app/ui/search'
import type { User } from '@/app/lib/definitions'
import { lusitana } from '@/app/ui/fonts'
import { Suspense } from 'react'
import { Metadata } from 'next'
import { auth } from '@/auth'
import { log } from 'console'
import { Button } from '@/app/ui/button'
import toast, { Toaster } from 'react-hot-toast'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { sql } from '@vercel/postgres'

export const metadata: Metadata = {
  title: 'Profile'
}

export default async function ProfilePage() {
  interface Session {
     user: {
     name: string
     email: string
   }  
    expires: string
  }
  async function getUser(email: string): Promise<User | undefined> {
    try {
      const user = await sql<User>`SELECT * from USERS where email=${email}`
      return user.rows[0]
    }catch (error) {
      console.error('Failed to fetch user:', error)
      throw new Error('Failed to fetch user.')
    }
  }
   const session = await auth()
   const sessionObject = {
     session
    }
   const email = session?.user?.email
   const name = session?.user?.name
   let loggedinUser: User | undefined

  if (email !== null && email !== undefined) {
     try {
      ;[loggedinUser] = await Promise.all([getUser(email)])
      console.log(loggedinUser)
      const e = loggedinUser?.email
      const n = loggedinUser?.name
      console.log(e, n)
   } catch (error) {
     console.error('Failed to fetch user:', error)
   }
  } else {
   console.error('Email is null or undefined')
   }

   return (
     <>
      <Toaster />
       <div className='flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8'>
         <h1 className={`${lusitana.className} mb-3 text-2xl`}>Profile</h1>
          <div className='w-full'>
            <div>
              <ul>Name: {loggedinUser?.name} </ul>
            </div>
          <div>
              <ul>Email: {loggedinUser?.email} </ul>
            </div>

          <Link href={`/dashboard/profile/${email}/edit`}>
            <Button className='w-15 mt-4'>
              Edit Details{' '}
                <ArrowRightIcon className='ml-auto h-5 w-5 text-gray-50' />
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}