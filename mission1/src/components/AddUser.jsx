import { useState } from "react";
import classes from "./AddUser.module.css";
import Button from "./Layouts/Button";
import ErrorModal from "./ErrorModal";

const AddUser = () => {
  const initUserInfo = {
    userName: "",
    age: "",
  };

  const [userInfo, setUserInfo] = useState(initUserInfo);
  const [openModal, setOpenModal] = useState(false);

  const inputChangeHandler = (e) => {
    console.log(e.target.value);
    setUserInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setUserInfo(initUserInfo);
    console.log(userInfo.userName, userInfo.age);
    if (!userInfo.userName || !userInfo.age) {
      setOpenModal((prev) => !prev);
    }
  };

  const closeModal = (state) => {
    setOpenModal(state);
  };

  return (
    <form onSubmit={submitHandler} className={classes.input}>
      <label>Username</label>
      <input value={userInfo.userName} onChange={inputChangeHandler} name="userName"></input>
      <label>App(years)</label>
      <input value={userInfo.age} onChange={inputChangeHandler} name="age"></input>
      <Button>Add User</Button>
      {openModal && <ErrorModal closeModalHandler={closeModal} />}
    </form>
  );
};

export default AddUser;
