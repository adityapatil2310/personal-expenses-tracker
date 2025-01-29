import { useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import "../style/dashboard.css";

export default function Dashboard() {
    const chartRef = useRef(null);

    useEffect(() => {
        if (window.Chart && chartRef.current) {
            const ctx = chartRef.current.getContext("2d");

            // Destroy previous chart instance if it exists
            if (chartRef.current.chartInstance) {
                chartRef.current.chartInstance.destroy();
            }

            chartRef.current.chartInstance = new window.Chart(ctx, {
                type: "line",
                data: {
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                    datasets: [
                        {
                            label: "Monthly Expenses ($)",
                            data: [1000, 1200, 1100, 900, 1300, 1400, 1250],
                            borderColor: "rgba(75, 192, 192, 1)",
                            backgroundColor: "rgba(75, 192, 192, 0.2)",
                            tension: 0.4,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: "top" },
                        title: { display: true, text: "Monthly Expense Trends" },
                    },
                },
            });
        }
    }, []);

    return (
        <div className="dashboardpage">
            <Sidebar className="Sidebar" />
            <div className="dashboard-components">
                <div className="header">Welcome<hr className="h" /></div>
                <div className="main">
                    <div className="balance">
                        <div className="balance-amount">
                            <div>Balance</div>
                            <div>$XXXXX</div>
                        </div>
                        <div className="budget">
                            <div className="budget-limit">
                                <p>Monthly budget limit</p>
                                <p style={{ color: "green", marginLeft: "29%" }}>$10,000</p>
                            </div>
                            <hr style={{ width: "75%", marginTop: "6%", marginBottom: "5%" }} />
                            <div className="spent">
                                <p>Spent</p>
                                <p style={{ color: "red" }}>$4789.0</p>
                            </div>
                        </div>
                        <div className="monthly-expenses">
                            <div className="expense1">Monthly Expenses<hr className="h3" /></div>
                            <div className="housekeeping"><div>Housekeeping</div><div>$100</div></div>
                            <div className="salon-services"><div>Salon services</div><div>$50</div></div>
                            <div className="EMI-payments"><div>EMI Payment</div><div>$1000</div></div>
                            <div className="savings"><div>Savings</div><div>$1000</div></div>
                        </div>
                    </div>
                    <hr className="vertical-line" />
                    <div className="expense">
                        <div className="chart">
                            <div className="statistics">Expense Statistics<hr className="h4" /></div>
                            <div className="graph3">
                                <canvas ref={chartRef}></canvas>
                            </div>
                        </div>
                        <div className="recent-payments">
                            <div className="payments">Recent Payments</div>
                            <hr className="h11" />
                            <div className="devcom2"><div style={{ display: "flex", width: "100%" }}><div className="pink2"></div><div>Devcom</div></div><div style={{ color: "green" }}>$5999</div></div>
                            <hr className="h10" />
                            <div className="seekOut"><div style={{ display: "flex", width: "100%" }}><div className="yellow2"></div><div>SeekOut</div></div><div style={{ color: "red" }}>$600</div></div>
                            <hr className="h10" />
                            <div className="urban-grocers"><div style={{ display: "flex", width: "100%" }}><div className="blue2"></div><div>Urban Grocers</div></div><div style={{ color: "red" }}>$79</div></div>
                            <hr className="h10" />
                            <div className="matrix-salon"><div style={{ display: "flex", width: "100%" }}><div className="lightpink2"></div><div>Matrix Salon</div></div><div style={{ color: "red" }}>$50</div></div>
                            <hr className="h10" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
