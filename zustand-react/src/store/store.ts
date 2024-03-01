import create from "zustand";

export const useTodoStore = create((set) => ({
  todoList: [],
  addTodo: (newTodo) => set((state) => ({ todoList: [...state.todoList, newTodo] })),
  setTodo: (changedTodo) => set((state) => ({ ...state, todo: changedTodo })),
  todo: {
    title: "",
    description: "",
  },
}));
