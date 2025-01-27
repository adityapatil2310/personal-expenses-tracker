import React, { useEffect, useRef } from "react";
import "../style/analytics.css";
import Sidebar from "./Sidebar";

export default function Analytics() {
  const graph1Ref = useRef(null); 
  const pieChartRef = useRef(null); 

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
    }

  
    if (window.Chart) {
      const pieCtx = pieChartRef.current.getContext("2d");

    
      if (pieChartRef.current.chartInstance) {
        pieChartRef.current.chartInstance.destroy();
      }

      pieChartRef.current.chartInstance = new window.Chart(pieCtx, {
        type: "pie",
        data: {
         
          datasets: [
            {
              data: [25, 30, 20, 25], 
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
  }, []);

  return (
    <div className="analytics-page">
      <Sidebar className="sidebar" />
      <div className="main-page">
        <div className="header">Budget Analytics & Goals</div>

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
              <p style={{ fontWeight: "700" }}>money spent</p>
              <p>this year:</p>
              <p>this month:</p>
            </div>
            <div className="saving">
              <p style={{ fontWeight: "700" }}>savings goal</p>
              <p>this month:</p>
              <p>this year:</p>
            </div>
            <div className="progress">
              <p style={{ fontWeight: "700" }}>progress</p>
              <p>this month:</p>
              <p>this year:</p>
            </div>
          </div>
        </div>
        <div className="expense-summary">
          <div className="piechart">
            <div className="piechart-header" style={{ textAlign: "center", fontWeight: "700",fontSize:"2rem" }}>
              Expense Breakdown
            </div>
            <div className="graph2">
            
              <canvas ref={pieChartRef} style={{ width: "100%", height: "300px",marginTop:"0rem" }} />
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
                <div className="redblock"></div>
                <div style={{ width: "85%", paddingLeft: "1rem", fontSize: "1.5rem" }}>Impromptu Outing</div>
              </div>
              <div className="blue1">
                <div className="blueblock"></div>
                <div style={{ width: "85%", paddingLeft: "1rem", fontSize: "1.5rem" }}>Apparel Purchase</div>
              </div>
              <div className="green1">
                <div className="greenblock"></div>
                <div style={{ width: "85%", paddingLeft: "1rem", fontSize: "1.5rem" }}>Furniture Purchases</div>
              </div>
              <div className="yellow1">
                <div className="yellowblock"></div>
                <div style={{ width: "85%", paddingLeft: "1rem", fontSize: "1.5rem" }}>SIP & DE-MAT</div>
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
