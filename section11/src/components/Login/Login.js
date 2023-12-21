import React, { useEffect, useRef, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "./Input";

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  useEffect(() => {
    console.log("EFFECT RUNNING");
    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, [enteredPassword]);

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(enteredEmail.includes("@") && enteredPassword.trim().length > 6);
    }, 500);

    //clean up 함수
    return () => {
      console.log("CLEAN UP");
      clearTimeout(identifier);
    };
  }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      props.onLogin(enteredEmail, enteredPassword);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else if (!passwordIsValid) {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          inputRef={emailInputRef}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={enteredPassword}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          inputRef={passwordInputRef}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
