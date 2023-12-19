import Search from '@/app/ui/search'
import type { YogaClass, User } from '@/app/lib/definitions'
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
  title: 'Batch'
}

export default async function BatchPage() {
  interface Session {
     user: {
     name: string
     email: string
   }  
    expires: string
  }
  const session = await auth()
   const sessionObject = {
     session
    }
   const email = session?.user?.email
   const name = session?.user?.name

  async function batchChangeAtOne(){
    try{
      const statementExists = await sql`SELECT 1 FROM pg_prepared_statements WHERE name = 's749'`;
    
      if (statementExists.rows.length > 0) {
        // Deallocate the existing prepared statement
        await sql`DEALLOCATE s749`;
      }
      const nextBatchQuery = await sql`
      SELECT nextBatch FROM yogaclass WHERE email = ${email}
      `
      const nextBatchRows = nextBatchQuery.rows
      console.log("nextBatchRows", nextBatchRows);
      if (nextBatchRows[0]) {
        const nextBatchValue = nextBatchRows[0].nextbatch;
        console.log("nextBatchValue", nextBatchValue);
    
        if (nextBatchValue !== undefined && nextBatchValue !== null) {
            await sql`
                UPDATE yogaclass
                SET batch = ${nextBatchValue},
                    nextbatch = null
                WHERE email = ${email}
            `;
        } else {
            console.error("nextBatchValue is undefined or null. Cannot update yogaclass.");
        }
    } else {
        console.error("No rows found for the given email. Cannot update yogaclass.");
    }
    
      
    }catch(error){
      console.error("Something went wrong", error)
      console.log("Something went wrong", error);
    }
    
  }

  const date = new Date();
  const currentDate = date.getDate();
  console.log("today", currentDate);
  if(currentDate === 1){
    batchChangeAtOne();
  }


  async function getUserYogaForminBatchPage(email: string): Promise<YogaClass | undefined> {
    try {
      // Check if the prepared statement exists before deallocating
    const statementExists = await sql`SELECT 1 FROM pg_prepared_statements WHERE name = 's162'`;
    
    if (statementExists.rows.length > 0) {
      // Deallocate the existing prepared statement
      await sql`DEALLOCATE s162`;
    }
      const batchQuery = await sql<YogaClass>`SELECT * from YOGACLASS where email=${email}`
      return batchQuery.rows[0]
    }catch (error: any) {
      console.error('Failed to fetch user:', error)
      throw new Error('Failed to fetch user.')
    }
  }
   
   let loggedinUser: YogaClass | undefined

  if (email !== null && email !== undefined) {
     try {
      ;[loggedinUser] = await Promise.all([getUserYogaForminBatchPage(email)])
      // console.log(loggedinUser)
      if(!(loggedinUser?.email)){
        return(
          <div><h1 className={`${lusitana.className} mb-3 text-2xl`}>Register for classes first</h1></div>
        )
      }
      
      const userEmail = loggedinUser?.email
      const batch = loggedinUser?.batch
      console.log(userEmail, batch)
   } catch (error: any) {
    //   if(error.code == '26000'){
    //     await sql`DEALLOCATE s162`
    //   }else{
    //  console.error('Failed to fetch user:', error)
    // }
    console.error('Failed to fetch user:', error)
   }
  } else {
   console.error('Email is null or undefined')
   return(
    <div><h1 className={`${lusitana.className} mb-3 text-2xl`}>Register for classes first</h1></div>
   )
   }

   return (
     <>
      <Toaster />
       <div className='flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8'>
         <h1 className={`${lusitana.className} mb-3 text-2xl`}>Batch</h1>
          <div className='w-full'>
            <div>
              <ul>Email: {loggedinUser?.email} </ul>
            </div>
          <div>
              <ul>Batch: {loggedinUser?.batch} </ul>
            </div>
            {/* <div>
              <ul>Next Month Batch: {nextBatchQuery.rows.nextbatch}</ul>
            </div> */}

          <Link href={`/dashboard/batchChange/${email}/edit`}>
            <Button className='w-15 mt-4'>
              Change Batch{' '}
                <ArrowRightIcon className='ml-auto h-5 w-5 text-gray-50' />
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}