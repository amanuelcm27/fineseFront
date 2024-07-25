import "../css/homebox.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import BoxHeading from "./BoxHeading";
import { useEffect, useRef, useState } from "react";
import api from "../api";
import ErrorCard from "./ErrorCard";
import { SuccessBox } from "./successBox";
import { currentFullDate } from "../utils/formattime";

const HomeBox = ({ showExpenseBox ,refresher }) => {
  const [categoryMode, setCategoryMode] = useState(true);
  const [category, setCategory] = useState("");
  const [showError, setShowError] = useState(false);
  const [category_list, setCategoryList] = useState([]);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({});
  const [showDropDown, setShowDropDown] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [formData, setformData] = useState({
    category_id: selectedCategory,
    name: "",
    amount: "",
    description: "",
  });
  const dropdownRef = useRef(null);
  const createCategory = async () => {
    try {
      if (category) {
        const response = await api.post("api/create_category/", {
          name: category,
        });
        if (response.status === 201) {
          setCategory("");
          setError("");
          setShowError(false);
          setSuccessPopup(!successPopup);
          return true;
        }
      } else {
        setError("category must be filled");
        setShowError(true);
      }
    } catch (e) {
      setError("An unexpected error occurred while creating the category");
      setShowError(true);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await api.get("api/list_category/");
      setCategoryList(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleSaveCategory = async () => {
    const success = await createCategory();
    if (success) {
      setCategoryMode(!categoryMode);
    }
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropDown(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
  const validateForm = () => {
    const isEmpty = (obj) => Object.keys(obj).length === 0;
    if (
      formData.name.trim() === "" ||
      formData.amount.trim() === "" ||
      isEmpty(formData.category_id)
    ) {
      setError("All fields except description must be filled ! ");
      setShowError(true);
      return false;
    }
    return true;
  };
  const createExpense = async (e) => {
    e.preventDefault();

    try {
      if (validateForm()) {
        const response = await api.post("api/create_expense/", {
          category_id: formData.category_id.id,
          name: formData.name,
          amount: Number(formData.amount),
          description: formData.description
        });
        if (response.status === 201) {
          setformData({
            category_id: selectedCategory,
            name: "",
            amount: "",
            description: "",
          });
          setError("");
          setShowError(false);
          setSuccessPopup(!successPopup);
          return true;
        }
      }
    } catch (e) {
      setError("An unexpected error occurred while creating the category");
      console.log(e);
      setShowError(true);
    }
  };
  useEffect(() => {
    fetchCategories();
    setformData((prev) => ({
      ...prev,
      category_id: selectedCategory,
    }));
    if (successPopup) {
      setTimeout(() => {
        setSuccessPopup(false);
      }, 3000);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedCategory, successPopup]);
  return (
    <>
      <div className="box-container">
        {successPopup && (
            <SuccessBox></SuccessBox>
        )}
        <div className="card-container">
          <div onClick={()=> {refresher () , showExpenseBox()}} className="close-box">
            <i className="fa-solid fa-circle-xmark"></i>
          </div>
          <BoxHeading text="Add an expense"></BoxHeading>
          {showError && <ErrorCard forExpense={true} error={error}></ErrorCard>}
          <form onSubmit={createExpense} className="expense-form-container">
            <label>Expense for {currentFullDate()}</label>
            <input
              type="text"
              className="expense-name"
              placeholder="expense name"
              name="name"
              onChange={handleChange}
              value={formData.name}
            />
            <label>Amount</label>
            <input
              type="number"
              className="expense-amount"
              placeholder="amount"
              name="amount"
              onChange={handleChange}
              value={formData.amount}
            />
            <label>Category</label>
            <div ref={dropdownRef}>
              {categoryMode ? (
                <>
                  <div className="category-card">
                    {selectedCategory?.name
                      ? selectedCategory?.name
                      : "Choose a Category"}
                    {showDropDown ? (
                      <i
                        onClick={() => setShowDropDown(!showDropDown)}
                        className="fa-solid fa-caret-up"
                      ></i>
                    ) : (
                      <i
                        onClick={() => setShowDropDown(!showDropDown)}
                        className="fa-solid fa-caret-down"
                      ></i>
                    )}
                  </div>
                  <button
                    onClick={() => setCategoryMode(!categoryMode)}
                    type="button"
                    className="category-btn"
                  >
                    New
                  </button>
                  {showDropDown && (
                    <div className="category-list">
                      <ul>
                        {category_list &&
                          category_list.map((category) => (
                            <li
                              key={category.id}
                              onClick={() => setSelectedCategory(category)}
                            >
                              {category.name}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <input
                    type="text"
                    className="expense-category"
                    placeholder="Eg. House, Food & Drink , Insurance etc..."
                    name="name"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <button
                    onClick={handleSaveCategory}
                    type="button"
                    className="category-btn"
                  >
                    Save
                  </button>
                  <button
                    onClick={()=> setCategoryMode(!categoryMode)}
                    type="button"
                    className="category-btn"
                  >
                    Back
                  </button>
                </>
              )}
            </div>
            <label>Description (optional)</label>
            <textarea
              type="number"
              className="expense-desc"
              placeholder="a detail about your expense like why you spent it or on what "
              name="description"
              onChange={handleChange}
              value={formData.description}
            />
            <button type="submit" className="add-btn">
              Add
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default HomeBox;
