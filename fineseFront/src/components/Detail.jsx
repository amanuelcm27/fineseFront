import { useEffect, useState } from "react";
import "../css/detail.css";
import "../css/homebox.css";
import { formatNumber } from "../utils/formatNumber";
import { formatDate } from "../utils/formattime";
import api from "../api";
const Detail = ({ showDetailBox, expense, refresher }) => {
  const [editMode, seteditMode] = useState(false);
  const [deleteMode, setdeleteMode] = useState(false);
  const [formData, setformData] = useState({
    name: expense.name,
    amount: expense.amount,
    description: expense.description,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
  const changeMode = (mode) => {
    if (mode === "edit") {
      seteditMode(!editMode);
      setdeleteMode(false);
    } else if (mode === "delete") {
      setdeleteMode(!deleteMode);
      seteditMode(false);
    }
  };
  const deleteExpense  = async () => {
    try {
        const response = await api.delete(`api/delete_expense/${expense.id}/`)
        refresher();
        showDetailBox();
        console.log(response)
    }
    catch (e) {
      console.log(e)
    }
  }
  const updateExpense = async () => {
    try {
      const response = await api.patch(
        `api/update_expense/${expense.id}/`,
        formData
      );
      setformData(response.data);
      changeMode("edit");
      refresher();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="detail-container">
        <div className="detail-card-container">
          <div className="detail-heading">
            {!deleteMode && (
              <i
                onClick={() => changeMode("delete")}
                className="fa-solid fa-trash"
              ></i>
            )}
            {editMode ? (
              <i
                onClick={updateExpense}
                className="fa-solid fa-circle-check"
              ></i>
            ) : (
              <i
                onClick={() => changeMode("edit")}
                className="fa-solid fa-pen"
              ></i>
            )}
            <i
              onClick={() => {
                showDetailBox(), refresher();
              }}
              className="fa-solid fa-circle-xmark"
            ></i>
          </div>
          {deleteMode && (
            <div className="delete-box">
              Are you sure you want to delete this expense ?
              <button  onClick={deleteExpense} className="delete-btn">Yes</button>
              <button onClick={()=>changeMode("delete")} className="delete-btn">No</button>{" "}
            </div>
          )}
          {editMode ? (
            <div className="detail-card">
              <div className="detail-item">
                <i className="fa-regular fa-calendar"></i>
                <span>{formatDate(expense.date_created)}</span>
              </div>
              <div className="detail-item">
                <i className="fa-solid fa-list"></i>
                <span>
                  <input
                    value={formData.name}
                    onChange={handleChange}
                    name="name"
                    type="text"
                    placeholder="expense name"
                  />
                </span>
              </div>
              <div className="detail-item">
                <i className="fa-solid fa-dollar-sign"></i>
                <span>
                  <input
                    value={formData.amount}
                    onChange={handleChange}
                    name="amount"
                    type="number"
                    placeholder="amount"
                  />
                </span>
              </div>
              <div className="detail-item">
                <i className="fa-solid fa-tag"></i>
                <span>{expense.category?.name}</span>
              </div>
              <div className="detail-item-desc">
                <i className="fa-regular fa-comment"></i>
                <textarea
                  value={formData.description}
                  onChange={handleChange}
                  name="description"
                  type="text"
                  placeholder="a detail about your expense like why you spent it or on what "
                />
              </div>
            </div>
          ) : (
            <div className="detail-card">
              <div className="detail-item">
                <i className="fa-regular fa-calendar"></i>
                <span>{formatDate(expense.date_created)}</span>
              </div>
              <div className="detail-item">
                <i className="fa-solid fa-list"></i>
                <span>{formData.name}</span>
              </div>
              <div className="detail-item">
                <i className="fa-solid fa-dollar-sign"></i>
                <span>{formData.amount}</span>
              </div>
              <div className="detail-item">
                <i className="fa-solid fa-tag"></i>
                <span>{expense.category?.name}</span>
              </div>
              <div className="detail-item-desc">
                <i className="fa-regular fa-comment"></i>
                <span>
                  {formData.description
                    ? formData.description
                    : "No Description Added"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Detail;
