interface ITransactions extends Document {
  emails: string[];
  senderEmail: string;
  recieverEmail: string;
  recieverId: string;
  amount: number;
  dateOfTransaction: string;
}

export default ITransactions;
