// In App.tsx (or wherever your Expense type is defined)
export interface Expense {
  id: string; // Change from number to string
  title: string;
  amount: number;
  date: string;
  category: string;
}
