import React from "react";
import { Expense } from "../types/ExpenseTypes"; // Make sure this matches the Expense type from your app

interface ExpenseItemProps {
  expense: Expense; // Use the Expense type here to match the structure from the app
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void; // Correcting this to pass the whole expense object
}

const categoryEmojis: { [key: string]: string } = {
  Food: "🍔",
  Travel: "✈️",
  Shopping: "🛍️",
  Bills: "💡",
  Health: "💊",
  Entertainment: "🎬",
  Education: "📚",
  Other: "📝",
};

const ExpenseItem: React.FC<ExpenseItemProps> = ({
  expense,
  onDelete,
  onEdit,
}) => {
  const { id, title, amount, date, category } = expense; // Destructure the expense object
  const emoji = categoryEmojis[category] || "📝"; // Default emoji if no category match

  return (
    <li
      style={{
        background: "#fff",
        padding: "12px 20px",
        margin: "10px 0",
        borderRadius: "10px",
        listStyle: "none",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        color: "#222",
        fontFamily: "Segoe UI, sans-serif",
        width: "calc(100% - 40px)",
        maxWidth: "600px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <div style={{ textAlign: "left" }}>
        <div style={{ fontWeight: "bold", fontSize: "18px" }}>
          {emoji} {title}
        </div>
        <div style={{ fontSize: "15px", color: "#555" }}>
          ₹{amount.toFixed(2)} • {new Date(date).toLocaleDateString()}
        </div>
      </div>
      <div>
        <button
          onClick={() => onEdit(expense)} // Pass the entire expense object
          style={{
            backgroundColor: "#1890ff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "8px 12px",
            marginRight: "8px",
            cursor: "pointer",
          }}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(id)} // Correctly pass only the id for deletion
          style={{
            backgroundColor: "#ff4d4f",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "8px 12px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;
