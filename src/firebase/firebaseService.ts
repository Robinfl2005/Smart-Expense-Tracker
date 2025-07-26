import { db } from "./firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore"; 
import { Expense } from "../types/ExpenseTypes";

const expensesCollection = collection(db, "expenses");

// Fetch expenses
export const fetchExpenses = async (): Promise<Expense[]> => {
  const snapshot = await getDocs(expensesCollection);
  return snapshot.docs.map((doc) => {
    const data = doc.data() as Omit<Expense, "id">;
    return {
      id: doc.id,
      title: data.title ?? "Untitled",
      amount: Number(data.amount ?? 0),
      date: data.date ?? new Date().toISOString().split("T")[0],
      category: data.category ?? "Other",
    };
  });
};

// Add expense or update existing one if title and category match
export const addExpense = async (expense: Omit<Expense, "id">): Promise<string> => {
  // Check if an expense with the same title and category already exists
  const existingExpenseQuery = query(
    expensesCollection,
    where("title", "==", expense.title),
    where("category", "==", expense.category)
  );

  const snapshot = await getDocs(existingExpenseQuery);

  if (!snapshot.empty) {
    // If an existing expense is found, update the amount
    const docRef = snapshot.docs[0]; // Get the first matching expense
    const existingExpense = docRef.data();
    const updatedAmount = existingExpense.amount + expense.amount; // Add the new amount

    console.log(`Existing Expense ID: ${docRef.id}`);
    console.log(`Old Amount: ${existingExpense.amount}`);
    console.log(`New Amount: ${updatedAmount}`);

    await updateDoc(docRef.ref, { amount: updatedAmount });
    console.log("Expense updated with new amount, ID:", docRef.id);
    return docRef.id; // Return the existing ID
  } else {
    // If no existing expense is found, create a new one
    const docRef = await addDoc(expensesCollection, expense);
    console.log("Expense added with ID:", docRef.id);
    return docRef.id; // Return the new ID
  }
};

// Delete expense
export const deleteExpense = async (id: string): Promise<void> => {
  const docRef = doc(db, "expenses", id);
  await deleteDoc(docRef);
  console.log("Expense deleted with ID:", id);
};

// Update expense
export const updateExpense = async (updatedExpense: Expense): Promise<void> => {
  const docRef = doc(db, "expenses", updatedExpense.id);
  await updateDoc(docRef, {
    title: updatedExpense.title,
    amount: updatedExpense.amount,
    date: updatedExpense.date,
    category: updatedExpense.category,
  });
  console.log("Expense updated with ID:", updatedExpense.id);
};
