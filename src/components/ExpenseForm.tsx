import { useState, useEffect } from "react";
import { Expense } from "../types/ExpenseTypes";

interface ExpenseFormProps {
  onAddExpense: (expense: Expense) => void;
  onUpdateExpense: (expense: Expense) => void;
  editingExpense: Expense | null;
}

const ExpenseForm = ({ onAddExpense, onUpdateExpense, editingExpense }: ExpenseFormProps) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Food");

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount.toString());
      setDate(editingExpense.date);
      setCategory(editingExpense.category);
    }
  }, [editingExpense]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount || !date || !category) return;

    const expenseData = {
      id: editingExpense ? editingExpense.id : Math.random().toString(),
      title,
      amount: parseFloat(amount),
      date,
      category,
    };

    if (editingExpense) {
      onUpdateExpense(expenseData);
    } else {
      onAddExpense(expenseData);
    }

    // Reset the form
    setTitle("");
    setAmount("");
    setDate("");
    setCategory("Food");
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Expense Title"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Food">🍔 Food</option>
        <option value="Transport">🚕 Transport</option>
        <option value="Rent">🏠 Rent</option>
        <option value="Entertainment">🎮 Entertainment</option>
        <option value="Shopping">🛒 Shopping</option>
        <option value="Utilities">💡 Utilities</option>
        <option value="Education">📚 Education</option>
      </select>
      <button type="submit">{editingExpense ? "Update Expense" : "Add Expense"}</button>
    </form>
  );
};

export default ExpenseForm;
