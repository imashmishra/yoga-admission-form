import { hash } from 'bcrypt'
import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { headers } from 'next/headers';

export async function POST(request: Request) {
  try {
     const { name, email, password, repassword } = await request.json()

    // Hash the password
      const hashedPassword = await hash(password, 10)

    // Insert the user into the database
     const response = await sql`
       INSERT INTO users(name, email, password)
       VALUES (${name}, ${email}, ${hashedPassword})
     `;
      
      console.log("Signup Successfully");
   return NextResponse.json({ message: 'Signup Successful' })
   } catch (e: any) {
     // Check if the error is a duplicate key violation (unique constraint violation)
     if (e.code === '23505') {
     // Duplicate key error, email already exists
     console.log("Email Resgistered already");
       return NextResponse.json({ message: 'This email is already registered' }, {status: 400})
     }
     console.log(e);
     return NextResponse.json({ message: 'Something went wrong',  e })
   }
}