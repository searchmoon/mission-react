import { useState } from "react";
import AddUser from "./components/AddUser";
import Card from "./components/Layouts/Card";
import UserList from "./components/UserList";

function App() {
  const [userInfo, setUserInfo] = useState([]);

  const submitHandler = (inputValue) => {
    setUserInfo((prev) => [
      ...prev,
      { username: inputValue.username, age: inputValue.age, id: Math.random().toString() },
    ]);
  };

  return (
    <div>
      <AddUser submitHandler={submitHandler} />
      {userInfo.length > 0 && <UserList userInfo={userInfo} />}
    </div>
  );
}

export default App;
