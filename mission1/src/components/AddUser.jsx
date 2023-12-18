import { useState } from "react";
import classes from "./AddUser.module.css";
import Button from "./Layouts/Button";
import ErrorModal from "./ErrorModal";
import Card from "./Layouts/Card";

const AddUser = ({ submitHandler }) => {
  const initInputValue = {
    username: "",
    age: "",
    id: "",
  };
  const [error, setError] = useState({ title: "", message: "" });

  const [inputValue, setInputValue] = useState(initInputValue);

  const inputChangeHandler = (e) => {
    console.log(e.target.value);
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const addUserHandler = (e) => {
    e.preventDefault();

    if (inputValue.username.trim() === 0 || !inputValue.age.trim() === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age(non-empty values.)",
      });
      return;
    }

    if (+inputValue.age < 1) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid age(> 0)",
      });
      return;
    }

    setInputValue(initInputValue);
    submitHandler(inputValue);
  };

  const closeModal = () => {
    setError(null);
  };

  return (
    <>
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label>Username</label>
          <input
            type="text"
            value={inputValue.username}
            onChange={inputChangeHandler}
            name="username"
          ></input>
          <label>App(years)</label>
          <input
            type="number"
            value={inputValue.age}
            onChange={inputChangeHandler}
            name="age"
          ></input>
          <Button>Add User</Button>
        </form>
      </Card>
      {error && (
        <ErrorModal
          closeModalHandler={closeModal}
          title={"Invalid input"}
          message={"Please enter a valid name and age(non-empty values.)"}
        />
      )}
    </>
  );
};

export default AddUser;
