'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { request } from "http";
import { NextResponse } from "next/server";
import {hash} from "bcrypt";
import { list } from 'postcss';
import { User } from './definitions';
import { error, log } from 'console';
import email from 'next-auth/providers/email';

const ProfileSchema = z.object({
  name: z.string({
    invalid_type_error: 'Invalid User.',
  }),
  email: z.string({
    invalid_type_error: 'Invalid Email.',
  }),
});

const YogaSchema = z.object({
  email: z.string({
    invalid_type_error: 'Invalid Email.',
  }),
  batch: z.enum(['6:00 AM - 7:00 AM', '7:00 AM - 8:00 AM', '8:00 AM - 9:00 AM', '5:00 PM - 6:00 PM'], {
    invalid_type_error: 'Invalid Batch.',
  }),
});

const PaymentSchema = z.object({
  email: z.string({
    invalid_type_error: 'Invalid Email.',
  }),
  payment: z.boolean({
    invalid_type_error: 'Invalid Payment.'
  })
})


export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * from USERS where email=${email}`;
    return user.rows[0] as User;
  } catch (error: any) {
    if (error.code === '42703') {
      // status is pending
        return null;
      }
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return 'CredentialSignin';
    }
    throw error;
  }
}

const UpdateProfile = ProfileSchema.omit({ email: true });

export async function updateProfile(session: any, formData: FormData) {
  const email = session?.user?.email
  const { name } = UpdateProfile.parse({
    name: formData.get('name'),
  });

  try {
    await sql`
        UPDATE users
        SET name = ${name}
        WHERE email = ${email}
      `;
  } catch (error) {
    console.log(error);
    return { message: 'Database Error: Failed to Update Profile.' };
  }
  revalidatePath('/dashboard/profile');
  redirect('/dashboard/profile');
}

const UpdateBatch = YogaSchema.omit({ email: true });

export async function updateBatch(session: any, formData: FormData) {
  const email = session?.user?.email
  console.log("e", email);
  
  const { batch } = UpdateBatch.parse({
    batch: formData.get('batch'),
  });
  console.log("batch",batch);
  console.log("formData",formData);
  

  try {
    const batchUpdateQyery = await sql`
        UPDATE yogaclass
        SET "nextbatch" = ${batch}
        WHERE email = ${email}
      `;
      console.log(batchUpdateQyery);
      
  } catch (error) {
    console.log(error);
    return { message: 'Database Error: Failed to Update Profile.' };
  }
  revalidatePath('/dashboard/batchChange');
  redirect('/dashboard/batchChange');
}

