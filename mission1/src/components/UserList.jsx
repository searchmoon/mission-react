import Card from "./Layouts/Card";
import classes from "./UserList.module.css";

const UserList = ({ userInfo }) => {
  return (
    <Card className={classes.users}>
      <ul>
        {userInfo.map((item) => (
          <li key={item.id}>
            {item.username}({item.age} years old)
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default UserList;
