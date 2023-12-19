export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  status: string;
};

export type YogaClass = {
  email: string;
  age: number;
  date: Date;
  batch: "6:00 AM - 7:00 AM" | "7:00 AM - 8:00 AM" | "8:00 AM - 9:00 AM" | "5:00 PM - 6:00 PM";
};

export type Payment = {
  email: string;
  payment: Boolean;
  dateofpayment: string;
}

export type UserForm = {
  name: string;
  email: string;
};