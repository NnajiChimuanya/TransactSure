interface IUser extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  paymentId: string[];
  balance: number;
}

export default IUser;
