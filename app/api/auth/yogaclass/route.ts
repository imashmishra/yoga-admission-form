import { getUser } from '@/app/lib/actions';
import { User } from '@/app/lib/definitions';
import { auth } from '@/auth';
import { sql } from '@vercel/postgres'
import { error } from 'console';
import { NextResponse } from 'next/server'

export async function POST (request: Request){
  try {
     const { email, age, date, batch } = await request.json()
     const session = await auth()
     const sessionObject = {
       session
     }
     const sessionemail = session?.user?.email
     console.log("sessionemail", sessionemail);
     console.log("email", email);
     if(sessionemail !== email){
      throw error
     }
     const user = await sql<User>`SELECT * FROM "yogaclass" WHERE "email" = ${email} `;
     const fields = user.rows[0]
     
    // Insert the user into the database
    if(!fields){
     const response = await sql`
      INSERT INTO yogaclass(email, age, date, batch)
      VALUES (${email}, ${age}, ${date}, ${batch})
    `;}
    const updatequery = await sql`
      UPDATE yogaclass
      SET age = ${age},
          date = ${date},
          batch = ${batch}
      WHERE email = ${email}
    `;
      
      console.log("Details Submitted Successfully");
   return NextResponse.json({ message: 'Details Submitted Successful' })
   } catch (e: any) {
     console.log("Check your email again");
     return NextResponse.json({ message: 'Check your email again' }, {status: 400})
   }
}