import AcmeLogo from '@/app/ui/acme-logo';
import { Button } from '@/app/ui/button';
import LoginForm from '@/app/ui/login-form';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import PaymentForm from './paymentProcess/payment-form';
import PaymentButton from '@/app/dashboard/payment/paymentStatus-form'
import { Payment, YogaClass } from '@/app/lib/definitions';
import { sql } from '@vercel/postgres';
import { auth } from '@/auth';
import { lusitana } from '@/app/ui/fonts';
import { error } from 'console';
 
export default async function PaymentPage() {
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

  const currentDate = new Date();
  const todaydate = currentDate.getDate();
 
  async function getUserYogaForminPaymentPage(email: string): Promise<YogaClass | undefined> {
    try {
      // Check if the prepared statement exists before deallocating
    const statementExists = await sql`SELECT 1 FROM pg_prepared_statements WHERE name = 's766'`;
    
    if (statementExists.rows.length > 0) {
      // Deallocate the existing prepared statement
      await sql`DEALLOCATE s766`;
    }
      const user = await sql<YogaClass>`SELECT * from YOGACLASS where email=${email}`
      return user.rows[0]
    }catch (error) {
      console.error('Failed to fetch user:', error)
      throw new Error('Failed to fetch user.')
    }
  }
  
  const email = session?.user?.email
  const name = session?.user?.name
  let paymentOfUser: Payment | undefined
  let yogaclassOfUser: YogaClass | undefined
  


 if (email !== null && email !== undefined) {
    try {
     ;[yogaclassOfUser] = await Promise.all([getUserYogaForminPaymentPage(email)])
     console.log(yogaclassOfUser);
     
     if(!(yogaclassOfUser?.email)){
      return(
        <div><h1 className={`${lusitana.className} mb-3 text-2xl`}>Register for classes first</h1></div>
      )
     }
     const e = yogaclassOfUser?.email
     console.log(e)
  } catch (error) {
    console.error('Register for classes first:', error)
    return (
      <div><h1 className={`${lusitana.className} mb-3 text-2xl`}>Register for classes first</h1></div>
    )
  }
 } else {
  console.error('Email is null or undefined')
  }

  const date = new Date();
  const month = date.getMonth();
  const currentMonth = month + 1;
  console.log("curr", currentMonth);
  
  const paymentOfUserDetails = await sql<Payment>`
  SELECT * FROM payment WHERE email = ${email}
  `;
  const paymentStatus = paymentOfUserDetails.rows[0];
  console.log("status", paymentStatus);
  
  if (paymentStatus) {
    const datePayment  = paymentStatus?.dateofpayment;
    console.log("date", datePayment);
    if (datePayment) {
      const parsedDate = new Date(datePayment);
      if (!isNaN(parsedDate.getTime())) {
        const monthOfPayment = parsedDate.getMonth() + 1; // Adding 1 because months are zero-indexed
        // const monthOfPayment = 1;
        console.log("Month of payment:", monthOfPayment);
        if((monthOfPayment !== currentMonth) && monthOfPayment !== undefined){
          await sql`
            UPDATE payment
            SET payment = 'false'
            WHERE email = ${email}
          `;
          return(
            //here payment for next month is updated to false
            <Link href="/dashboard/payment">
                <Button className='w-15 mt-4'>
                Payment to be done
                </Button>
            </Link>)
        }
        if((monthOfPayment === currentMonth) && monthOfPayment !== undefined){
          return(
            <div><h1 className={`${lusitana.className} mb-3 text-2xl`}>Payment for this month is Paid.</h1></div>
          )
        }
    } 
  } else {
    console.error("Payment details not available.");
  }

  return(
    <PaymentForm/>
  )
  }}