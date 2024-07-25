import "../css/userbox.css";

const UserBox = ({ children }) => {
  return (
    <>
        <div className="user-box">{children}</div>
    </>
  );
};

export default UserBox;
