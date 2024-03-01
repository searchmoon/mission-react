const Todo = ({ item }) => {
  return (
    <>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </>
  );
};

export default Todo;
