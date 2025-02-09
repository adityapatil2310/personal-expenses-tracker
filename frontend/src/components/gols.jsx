import TrueContext from "./context";
import { useContext } from "react";
import { useState } from "react";
import "../style/goals.css";
import { useNavigate } from "react-router-dom";

export default function Goals() {
const navigatea=useNavigate();
const {financeData,setFinanceData}=useContext(TrueContext)
  const handleChange = (category, field, value) => {
    setFinanceData((prev) => ({
      ...prev,
      [category]: { ...prev[category], [field]: value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", financeData);
    navigatea("/analytics")
  };


  return (
    <div className="body2">
         <div className="container">
      <h2 className="title">Financial Form</h2>
      <form onSubmit={handleSubmit} className="form">

        
        <div className="section">
          <h3 className="subtitle">Savings Goal</h3>
          <input type="number" placeholder="This Year" value={financeData.savingsGoal.year} onChange={(e) => handleChange("savingsGoal", "year", e.target.value)} className="input" />
          <input type="number" placeholder="This Month" value={financeData.savingsGoal.month} onChange={(e) => handleChange("savingsGoal", "month", e.target.value)} className="input" />
        </div>
        
        <button type="submit" className="button">Submit</button>
      </form>
    </div>
    </div>
  );
}
