import { useTodoStore } from "../store/store";

const Form = () => {
  const { todoList, addTodo, setTodo, todo } = useTodoStore();

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    addTodo(todo);
    setTodo({ title: "", description: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  console.log(todoList);
  return (
    <form>
      <label htmlFor="title">title</label>
      <input type="text" id="title" name="title" value={todo.title} onChange={handleChange} />
      <label htmlFor="desc">description</label>
      <input
        type="text"
        id="desc"
        name="description"
        value={todo.description}
        onChange={handleChange}
      />
      <button type="submit" onClick={handleClick}>
        create
      </button>
    </form>
  );
};

export default Form;
