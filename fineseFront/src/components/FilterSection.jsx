import { useEffect, useState } from "react";
import api from "../api";
const currentDate = new Date();

const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();
const FilterSection = ({setExpenseList}) => {

  const [categories, setCategories] = useState({});
  const [filters, setFilters] = useState({
    category: null,
    day: currentDay,
    month: currentMonth,
    year: currentYear,
    order: "High-to-Low",
  });
  const [index, setIndex] = useState(0);
  const fetchCategories = async () => {
    try {
      const response = await api.get("api/list_category/");
      setCategories(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleChange = (filterType, value, backward) => {
    if (filterType === "category") {
      if (categories.length > 0) {
        const newIndex = backward
          ? (index - 1 + categories.length) % categories.length
          : (index + 1) % categories.length;
        setIndex(newIndex);
        value = categories[newIndex];
      } else {
        value = "Category";
      }
    }
    if (filterType === "day") {
      if (backward) {
        value = filters.day <= 1 ? 31 : filters.day - 1;
      } else {
        value = filters.day >= 31 ? 1 : filters.day + 1;
      }
    }
    if (filterType === "month") {
      if (backward) {
        value = filters.month <= 1 ? 12 : filters.month - 1;
      } else {
        value = filters.month >= 12 ? 1 : filters.month + 1;
      }
    }
    if (filterType === "year") {
      if (backward) {
        value = filters.year <= 2000 ? 2100 : filters.year - 1;
      } else {
        value = filters.year >= 2100 ? 2000 : filters.year + 1;
      }
    }
    if (filterType === "order") {
      value = filters.order === "High-to-Low" ? "Low-to-High" : "High-to-Low";
    }
    setFilters({ ...filters, [filterType]: value });
  };

  const fetchfilteredList = async () => {
    try {
        console.log(filters)
        const response = await api.post("api/filtered_list/",filters)
        setExpenseList(response.data)
        
    }
    catch(e) {
        console.log(e)
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="filter-container">
      <div className="filter-heading">
        <span>Filter Expense</span>
      </div>
      <div className="filter-item">
        {filters.category?.name ? filters.category.name : "Category" }
        <span>
          <i
            onClick={() => handleChange("category", filters.category, true)}
            className="fa-solid fa-caret-left"
          ></i>
          <i
            onClick={() => handleChange("category", "")}
            className="fa-solid fa-caret-right"
          ></i>
        </span>
      </div>
      <div className="filter-item">
        Day - {filters.day}
        <span>
          <i
            onClick={() => handleChange("day", filters.day, true)}
            className="fa-solid fa-caret-left"
          ></i>
          <i
            onClick={() => handleChange("day", filters.day)}
            className="fa-solid fa-caret-right"
          ></i>
        </span>
      </div>
      <div className="filter-item">
        Month - {filters.month}
        <span>
          <i
            onClick={() => handleChange("month", filters.month, true)}
            className="fa-solid fa-caret-left"
          ></i>
          <i
            onClick={() => handleChange("month", filters.month)}
            className="fa-solid fa-caret-right"
          ></i>
        </span>
      </div>
      <div className="filter-item">
        Year - {filters.year}
        <span>
          <i
            onClick={() => handleChange("year", filters.year, true)}
            className="fa-solid fa-caret-left"
          ></i>
          <i
            onClick={() => handleChange("year", filters.year)}
            className="fa-solid fa-caret-right"
          ></i>
        </span>
      </div>
      <div className="filter-item">
        {filters.order}
        <span>
          <i
            onClick={() => handleChange("order", filters.order)}
            className="fa-solid fa-caret-right"
          ></i>
        </span>
      </div>
      <div onClick={fetchfilteredList} className="apply-filter-item">Apply Filters</div>
    </div>
  );
};
export default FilterSection;
