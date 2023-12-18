import { useState } from "react";
import AddUser from "./components/AddUser";
import Card from "./components/Layouts/Card";
import UserList from "./components/UserList";

function App() {
  const initInputValue = {
    userName: "",
    age: "",
  };
  const [userInfo, setUserInfo] = useState([]);
  const [inputValue, setInputValue] = useState(initInputValue);

  const submitHandler = (e, setOpenModal) => {
    e.preventDefault();
    if (!inputValue.userName || !inputValue.age) {
      setOpenModal((prev) => !prev);
      return;
    }
    setUserInfo([...userInfo, inputValue]);
    setInputValue(initInputValue);
  };

  return (
    <div>
      <Card>
        <AddUser
          submitHandler={submitHandler}
          setInputValue={setInputValue}
          inputValue={inputValue}
        />
      </Card>
      {userInfo.length > 0 && (
        <Card>
          <UserList userInfo={userInfo} />
        </Card>
      )}
    </div>
  );
}

export default App;
