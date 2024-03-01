import { useState } from "react";

const Form = () => {
  
  const initValue = {
    title: "",
    description: "",
  };

  const [todo, setTodo] = useState(initValue);

  const [todoList, setTodoList] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    setTodoList([...todoList, todo]);
  };

  const handleChange = (e) => {
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
