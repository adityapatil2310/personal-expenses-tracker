import React, { useEffect, useRef,useState} from "react";
import "../style/analytics.css";
import Sidebar from "./Sidebar";

export default function Analytics() {
   const [id,setId]=useState(null)
  const graph1Ref = useRef(null);
  const pieChartRef = useRef(null);
  const[house,setHouse]=useState(0)
  const[salon,setSalon]=useState(0)
  const[payment,setPayment]=useState(0)
  const[other,setOther]=useState(0)

  useEffect(() => {
    if (window.Chart) {
     
      const lineCtx = graph1Ref.current.getContext("2d");
  
     
      if (graph1Ref.current.chartInstance) {
        graph1Ref.current.chartInstance.destroy();
      }
  
      graph1Ref.current.chartInstance = new window.Chart(lineCtx, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Monthly Income",
              data: [1200, 1400, 1800, 1600, 2000, 2200, 2500, 2400, 2600, 2800, 3000, 3200],
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 2,
              tension: 0.4,
              pointRadius: 5,
              pointBackgroundColor: "rgba(75, 192, 192, 1)",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: "Months",
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Income ($)",
              },
            },
          },
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
        },
      });
  
     
      const pieCtx = pieChartRef.current.getContext("2d");
  
     
      if (pieChartRef.current.chartInstance) {
        pieChartRef.current.chartInstance.destroy();
      }
  
      pieChartRef.current.chartInstance = new window.Chart(pieCtx, {
        type: "pie",
        data: {
          datasets: [
            {
              data: [house, salon, payment, other], 
              backgroundColor: ["#E82838", "#5AAAC7", "#237B23", "#F6A312"],
              borderColor: ["#ffffff", "#ffffff", "#ffffff", "#ffffff"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
        },
      });
    }
  }, [house, salon, payment, other]); 
  

  useEffect(() => {
    const fetchTransactions = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found!");
                return;
            }

            
            const userResponse = await fetch("http://127.0.0.1:8000/authy/getId/", {
                method: "GET",
                headers: { "Authorization": `Token ${token}` },
            });

            if (!userResponse.ok) throw new Error(`HTTP error! Status: ${userResponse.status}`);

            const userData = await userResponse.json();
            

            const transactionsResponse = await fetch(`http://127.0.0.1:8000/transaction/user/${userData.userId}/`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!transactionsResponse.ok) throw new Error(`HTTP error! Status: ${transactionsResponse.status}`);
            console.log(userData.userId)
            setId(userData.userId);}

            catch(err){
              console.group(err);
            }
          }
          fetchTransactions();
        }, []);

        const fetchCategoryTransactions = async (userId, category) => {
          if(userId){
              try {
                  const token = localStorage.getItem("token");
                  const res7 = await fetch(`http://127.0.0.1:8000/transaction/seecat/${userId}/${category}/`, {
                      method: "GET",
                      headers: {
                          "Authorization": `Bearer ${token}`,
                          "Content-Type": "application/json"
                      }
                  });
          
                  if (!res7.ok) {
                      throw new Error(`HTTP error! Status: ${res7.status}`);
                  }
          
                  const data7 = await res7.json();
                  // console.log("Category Transactions:", data7);
                  return data7;
              } catch (error) {
                  console.error("Error fetching category transactions:", error);
              }
          }
      };

  let HouseKeeping;
    let SalonServices;
    let EMIPayment;
    let Others;
   

  useEffect(()=>{
    let dam=async ()=>{
        if(id){
            console.log(id);
     
            let HouseKeeping1= await fetchCategoryTransactions(id,"HouseKeeping")
             HouseKeeping=HouseKeeping1.reduce((sum, cat) => sum + parseFloat(cat.amount), 0);
             setHouse(HouseKeeping);
            let SalonServices1= await fetchCategoryTransactions(id,"SalonServices")
            SalonServices=SalonServices1.reduce((sum, cat) => sum + parseFloat(cat.amount), 0);
            setSalon(SalonServices)
             let EMIPayment1= await fetchCategoryTransactions(id,"EMIPayment");
             EMIPayment=EMIPayment1.reduce((sum, cat) => sum + parseFloat(cat.amount), 0);
             setPayment(EMIPayment)
            let Others1=  await fetchCategoryTransactions(id,"Other");
            Others=Others1.reduce((sum, cat) => sum + parseFloat(cat.amount), 0);
  setOther(Others);
        }

    }
dam();
},
[id])

  return (
    <div className="analytics-page">
      <Sidebar className="sidebar" />
      <div className="main-page">
        <div className="header2">Budget Analytics & Goals</div>

        <div className="yearly-detail">
          <div className="left">
            <div className="yearly-header">
              <div style={{ fontSize: "1.7rem", fontWeight: "700" }}>Yearly Details</div>
              <div>
                <button className="btn2">Income</button>
                <button className="btn2">Expenses</button>
              </div>
            </div>
            <div className="graph1">
              <canvas ref={graph1Ref} style={{ width: "100%", height: "300px" }} />
            </div>
          </div>
          <div className="right">
            <div className="my-goals">My Goals</div>
            <div className="money-spent">
              <p style={{ fontWeight: "700", color: "#C4FAFF" }}>money spent</p>
              <p>this year:$10000</p>
              <p>this month:$2000</p>
            </div>
            <div className="saving">
              <p style={{ fontWeight: "700" }}>savings goal</p>
              <p>this month:$1200</p>
              <p>this year:$5000</p>
            </div>
            <div className="progress">
              <p style={{ fontWeight: "700" }}>progress</p>
              <p>this month:$600</p>
              <p>this year:$3000</p>
            </div>
          </div>
        </div>
        <div className="expense-summary">
          <div className="piechart">
            <div className="piechart-header" style={{ textAlign: "center", fontWeight: "700", fontSize: "2rem" }}>
              Expense Breakdown
            </div>
            <div className="graph2">
              <canvas ref={pieChartRef} style={{ width: "100%", height: "300px", marginTop: "0rem" }} />
            </div>
          </div>
          <div className="divisions">
            <div className="dropdown">
              <select className="options2">
                <option>January' 2025</option>
                <option>February' 2025</option>
                <option>March' 2025</option>
                <option>April' 2025</option>
                <option>May' 2025</option>
                <option>June' 2025</option>
                <option>July' 2025</option>
                <option>August' 2025</option>
                <option>September' 2025</option>
                <option>October' 2025</option>
                <option>November' 2025</option>
                <option>December' 2025</option>
              </select>
            </div>
            <div className="colors">
              <div className="red1">
                <div className="redblock"  style={{backgroundColor:"#E82838"}}></div>
                <div style={{ width: "85%", paddingLeft: "1rem", fontSize: "1.5rem" }}>House Keeping</div>
              </div>
              <div className="blue1">
                <div className="blueblock"  style={{backgroundColor:"#5AAAC7"}}></div>
                <div style={{ width: "85%", paddingLeft: "1rem", fontSize: "1.5rem" }}>Salon Services</div>
              </div>
              <div className="green1">
                <div className="greenblock"  style={{backgroundColor:"#237B23"}}></div>
                <div style={{ width: "85%", paddingLeft: "1rem", fontSize: "1.5rem" }}>EMI Payment</div>
              </div>
              <div className="yellow1">
                <div className="yellowblock"  style={{backgroundColor:"#F6A312"}}></div>
                <div style={{ width: "85%", paddingLeft: "1rem", fontSize: "1.5rem" }}>Others</div>
              </div>
            </div>
          </div>
          <div className="Summary">
            <div className="summarytext">Summary</div>
            <div className="total-spent">
              <p>Total Spent</p>
              <p>$4789.00</p>
            </div>
            <div className="monthly">
              <p>Monthly Expenses</p>
              <p>$2150.00</p>
            </div>
            <div className="total">
              <p>Total</p>
              <p>$6939.00</p>
            </div>
            <div className="amount-left">
              <p>Amount Left</p>
              <p>$3061.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
