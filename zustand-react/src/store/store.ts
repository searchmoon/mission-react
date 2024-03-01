import { create } from "zustand";

interface Todo {
  title: string;
  description: string;
}

interface TodoStore {
  todoList: Todo[];
  addTodo: (newTodo: Todo) => void;
  setTodo: (changedTodo: Todo) => void;
  todo: Todo;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todoList: [],
  addTodo: (newTodo) => set((state) => ({ todoList: [...state.todoList, newTodo] })),
  setTodo: (changedTodo) => set((state) => ({ ...state, todo: changedTodo })),
  todo: {
    title: "",
    description: "",
  },
}));
