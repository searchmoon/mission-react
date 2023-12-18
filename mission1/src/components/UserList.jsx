import classes from "./UserList.module.css";

const UserList = ({ userInfo }) => {
  return (
    <div className={classes.users}>
      <ul>
        {userInfo.map((item) => (
          <li>
            {item.userName}({item.age} years old)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
