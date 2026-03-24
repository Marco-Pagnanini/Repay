export interface Transaction {
  id: string;
  subscriptionId: string;
  name: string;
  amount: number;
  date: Date;
  label?: string;
}
  