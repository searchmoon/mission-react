import classes from "./ErrorModal.module.css";
import Button from "./Layouts/Button";
import Card from "./Layouts/Card";
const ErrorModal = ({ closeModalHandler, ...props }) => {
  return (
    <>
      <div onClick={closeModalHandler} className={classes.backdrop}></div>
      <Card className={classes.modal}>
        <div className={classes.header}>
          <h2>{props.title}</h2>
        </div>
        <div className={classes.content}>{props.message}</div>
        <div className={classes.actions}>
          <Button onClick={closeModalHandler}>Okay</Button>
        </div>
      </Card>
    </>
  );
};

export default ErrorModal;
