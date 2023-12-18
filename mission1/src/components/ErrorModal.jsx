import classes from "./ErrorModal.module.css";
import Button from "./Layouts/Button";
const ErrorModal = ({ closeModalHandler }) => {
  // const closeModalHandler = () => {};
  return (
    <div onClick={() => closeModalHandler(false)} className={classes.backdrop}>
      <div className={classes.modal}>
        <div className={classes.header}>
          <h2></h2>
        </div>
        <div className={classes.content}>
          <div className={classes.actions}></div>
          <Button onClick={() => closeModalHandler(false)}>Okay</Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
