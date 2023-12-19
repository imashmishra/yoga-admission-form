import { auth } from '@/auth';
import { sql } from '@vercel/postgres'
import { error } from 'console';
import { NextResponse } from 'next/server'
import { Payment } from '@/app/lib/definitions'
import { date } from 'zod';

export async function POST (request: Request){
  try {
     const res = await request.json()
     const date = new Date();
     const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

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
      const user = await sql<Payment>`SELECT * FROM "payment" WHERE "email" = ${email} `;
      const fields = user.rows[0]
    // Insert the user into the database
      if (!fields){
        const response = await sql`
        INSERT INTO payment(email, payment, dateOfPayment)
        VALUES (${email}, 'true', ${currentDate})
        `;
      }

      const updatequery = await sql`
      UPDATE payment
      SET payment = 'true',
      dateOfPayment = ${currentDate}
      WHERE email = ${email}
    `;
      
      console.log("Payment Successful");
   return NextResponse.json({ message: 'Payment Successful' })
   } catch (e: any) {
     console.log("Something went wrong ", e);
     return NextResponse.json({ message: 'Something went wrong' }, {status: 400})
   }
}