import { useState } from "react";
import classes from "./AddUser.module.css";
import Button from "./Layouts/Button";
import ErrorModal from "./ErrorModal";
import Card from "./Layouts/Card";

const AddUser = ({ submitHandler, inputValue, setInputValue }) => {
  const [openModal, setOpenModal] = useState(false);

  const inputChangeHandler = (e) => {
    console.log(e.target.value);
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const closeModal = (state) => {
    setOpenModal(state);
  };

  return (
    <form onSubmit={(e) => submitHandler(e, setOpenModal)} className={classes.input}>
      <label>Username</label>
      <input
        type="text"
        value={inputValue.userName}
        onChange={inputChangeHandler}
        name="userName"
      ></input>
      <label>App(years)</label>
      <input type="number" value={inputValue.age} onChange={inputChangeHandler} name="age"></input>
      <Button>Add User</Button>
      {openModal && (
        <Card>
          <ErrorModal closeModalHandler={closeModal} />
        </Card>
      )}
    </form>
  );
};

export default AddUser;
