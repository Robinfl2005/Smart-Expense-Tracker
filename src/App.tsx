// App.tsx
import { useEffect, useState } from "react";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import { Expense } from "./types/ExpenseTypes";
import {
  fetchExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
} from "./firebase/firebaseService";

const App = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [sortOption, setSortOption] = useState<"date" | "title" | "amount" | "category">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [loading, setLoading] = useState<boolean>(true);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  // Fetch expenses
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchExpenses();
        setExpenses(data);
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    localStorage.setItem("sortOption", sortOption);
    localStorage.setItem("sortOrder", sortOrder);
  }, [sortOption, sortOrder]);

  const handleAddExpense = async (newExpense: Omit<Expense, "id">) => {
  try {
    const newId = await addExpense(newExpense);
    if (newId) {
      setExpenses((prev) => [...prev, { ...newExpense, id: newId }]);
    }
  } catch (error) {
    console.error("Failed to add expense:", error);
  }
};


  const handleDeleteExpense = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this expense?");
    if (!confirmDelete) return;

    try {
      await deleteExpense(id);
      setExpenses((prev) => prev.filter((exp) => exp.id !== id));
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
  };

  const handleUpdateExpense = async (updatedExpense: Expense) => {
    try {
      await updateExpense(updatedExpense);
      setExpenses((prev) =>
        prev.map((exp) => (exp.id === updatedExpense.id ? updatedExpense : exp))
      );
      setEditingExpense(null);
    } catch (error) {
      console.error("Failed to update expense:", error);
    }
  };

  const sortedExpenses = [...expenses].sort((a, b) => {
    let comparison = 0;
    if (sortOption === "date") {
      comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortOption === "title") {
      comparison = a.title.localeCompare(b.title);
    } else if (sortOption === "amount") {
      comparison = a.amount - b.amount;
    } else if (sortOption === "category") {
      comparison = a.category.localeCompare(b.category);
    }
    return sortOrder === "asc" ? comparison : -comparison;
  });

  return (
    <div className="App">
      <h1>📊 Smart Expense Tracker</h1>

      <ExpenseForm
        onAddExpense={handleAddExpense}
        onUpdateExpense={handleUpdateExpense}
        editingExpense={editingExpense}
      />

      <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <label>Sort by: </label>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value as "date" | "title" | "amount" | "category")}>
          <option value="date">Date</option>
          <option value="title">Title</option>
          <option value="amount">Amount</option>
          <option value="category">Category</option>
        </select>

        <label> Order: </label>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>

      {loading ? (
        <p>Loading expenses...</p>
      ) : (
        <ExpenseList
          expenses={sortedExpenses}
          onDelete={handleDeleteExpense}
          onEdit={handleEditExpense}
        />
      )}
    </div>
  );
};

export default App;
