const { db } = require('@vercel/postgres');
const {
  users,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedYogaClass(client) {
  try {
    await client.sql`
    CREATE TYPE dropdown_options AS ENUM (
      '6:00 AM - 7:00 AM', 
      '7:00 AM - 8:00 AM', 
      '8:00 AM - 9:00 AM', 
      '5:00 PM - 6:00 PM'
    );
    `;

    // Create the "yogaclass" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS yogaclass (
        email TEXT PRIMARY KEY,
        age INTEGER NOT NULL,
        date DATE NOT NULL,
        batch dropdown_options NOT NULL,
        nextbatch dropdown_options
      );
    `;

    console.log(`Created "yogaclass" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding yogaclass:', error);
    throw error;
  }
}

async function seedPayment(client) {
  try {

    // Create the "payment" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS payment (
        email TEXT PRIMARY KEY,
        payment BOOLEAN DEFAULT false,
        dateOfPayment TIMESTAMP
      );
    `;

    console.log(`Created "payment" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding payment:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedYogaClass(client);
  await seedPayment(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});