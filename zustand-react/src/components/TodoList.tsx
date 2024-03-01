import Todo from "./Todo";

const TodoList = () => {
  const todoItems = [
    {
      title: "할일 1",
      description: "상세 1",
    },
    {
      title: "할일 2",
      description: "상세 2",
    },
  ]; //form 에서 추가되는 배열 목록을 여기로 가져올거다. 지금은 임의데이터
  return (
    <>
      {todoItems.map((item) => (
        <Todo item={item} />
      ))}
    </>
  );
};

export default TodoList;
