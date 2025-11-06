export interface Category {
  _id?: string;
  name: string;
  color: string;
  description?: string;
}

export interface Expense {
  _id?: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  category: Category;
  date: Date;
}