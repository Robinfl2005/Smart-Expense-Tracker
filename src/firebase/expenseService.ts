// src/services/expenseService.ts
import { db } from "./firebase";
import { collection, addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import { Expense } from "../types/ExpenseTypes";

const expensesCollection = collection(db, "expenses");

export const fetchExpenses = async (): Promise<Expense[]> => {
  try {
    const querySnapshot = await getDocs(expensesCollection);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Expense[];
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return [];
  }
};

export const addExpense = async (expense: Omit<Expense, "id">): Promise<string | null> => {
  try {
    const docRef = await addDoc(expensesCollection, expense);
    return docRef.id;
  } catch (error) {
    console.error("Error adding expense:", error);
    return null;
  }
};

export const deleteExpense = async (id: string): Promise<void> => {
  try {
    const expenseDoc = doc(db, "expenses", id);
    await deleteDoc(expenseDoc);
  } catch (error) {
    console.error("Error deleting expense:", error);
  }
};
