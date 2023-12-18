import classes from "./ErrorModal.module.css";
import Button from "./Layouts/Button";
import Card from "./Layouts/Card";
const ErrorModal = ({ closeModalHandler }) => {
  return (
    <Card>
      <div onClick={() => closeModalHandler(false)} className={classes.backdrop}>
        <div className={classes.modal}>
          <div className={classes.header}>
            <h2>Invalid input</h2>
          </div>
          <div className={classes.content}>
            <div className={classes.actions}>
              Please enter a valid name and age(non-empty values.)
            </div>
            <Button onClick={() => closeModalHandler(false)}>Okay</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ErrorModal;
