import "../css/error.css";
const ErrorCard = ({ error, forExpense }) => {
  return (
    <>
      {forExpense ? (
        <div className="error-card-expense">
          <i className="fa-solid fa-circle-xmark"></i>
          <span>{error}</span>
        </div>
      ) : (
        <div className="error-card">
          <i className="fa-solid fa-circle-xmark"></i>
          <span>{error}</span>
        </div>
      )}
    </>
  );
};

export default ErrorCard;
