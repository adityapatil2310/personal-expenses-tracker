import { useState,useContext } from "react";
import '../style/addtransaction.css';
import TrueContext from './context';
import { useNavigate } from "react-router-dom";

const AddTransaction = () => {
    const {setFormData,formData,userid}=useContext(TrueContext);
    const redirect4=useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userid);
    console.log(formData)

    try{
        const response10=await fetch(`http://127.0.0.1:8000/transaction/user/${userid}/`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization":` Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(formData),
        })
       redirect4("/dashboard")
    }

    catch(error){
        console.error("Error fetching transaction:", error);}

};

async function gettransaction() {
    let data;

    try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://127.0.0.1:8000/authy/getId/", {
            method: "GET",
            headers: {
                "Authorization": `Token ${token}`,
            },
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        data = await response.json();
        console.log("User ID:", data.userId);
        if (!data.userId) throw new Error("User ID not found in response.");
    } catch (error) {
        console.error("Error fetching user ID:", error);
        return;
    }

    try {
        const transactionData = {
            userId: data.userId,
            text: "test transaction",
            amount: 500,
            datetime: new Date().toLocaleString('en-GB', { hour12: false }).replace(",", ""),
            transType: "out",
            category: "other",
            recipient: "other"
        };

        console.log("Sending Data:", transactionData); 

        const response1 = await fetch(`http://127.0.0.1:8000/transaction/user/${data.userId}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(transactionData),
        });

        const responseText = await response1.text(); 
        console.log("Raw Response:", responseText);

        if (response1.ok && responseText) {
            const transactions = JSON.parse(responseText);
            console.log("Transaction List:", transactions);
        } else {
            console.warn("Transaction API returned an empty response.");
        }
    } catch (error) {
        console.error("Error fetching transaction:", error);
    }
}





  return (
    <div className="page">
         <div className="add-transaction-container">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit} className="transaction-form">
        <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required />
        <input type="text" name="text" placeholder="Description" value={formData.text} onChange={handleChange} required />
        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="HouseKeeping">HouseKeeping</option>
          <option value="SalonServices">Salon Services</option>
          <option value="EMIPayment">EMI Payment</option>
          <option value="Other">Other</option>
        </select>
        <input type="text" name="recipient" placeholder="Recipient Name" value={formData.recipient} onChange={handleChange} required />
        <button type="submit">Add Transaction</button>
      </form>
    </div>
    </div>
  );
};

export default AddTransaction;
