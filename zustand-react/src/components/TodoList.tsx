import Todo from "./Todo";
import { useTodoStore } from "../store/store";

const TodoList = () => {
  const todoItems = useTodoStore((state) => state.todoList);

  return (
    <>
      {todoItems.map((item) => (
        <Todo item={item} key={item.description} />
      ))}
    </>
  );
};

export default TodoList;
