 // ExpenseList.tsx
import React from "react";
import { Expense } from "../types/ExpenseTypes";
import ExpenseItem from "./ExpenseItem";

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => Promise<void>;
  onEdit: (expense: Expense) => void; // <-- Added edit handler
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDelete, onEdit }) => {
  return (
    <div>
      {expenses.length === 0 ? (
        <p>No expenses to display.</p>
      ) : (
        <ul>
          {expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense} // passing entire expense object
              onDelete={onDelete}
              onEdit={onEdit} // passing edit function
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
