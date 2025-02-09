import { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import "../style/dashboard.css";

export default function Dashboard() {
    const chartRef = useRef(null);
    const [spent, setSpent] = useState(0);
    const [receiver, setReceiver] = useState([]);
    const[house,setHouse]=useState(0)
    const[salon,setSalon]=useState(0)
    const[payment,setPayment]=useState(0)
    const[other,setOther]=useState(0)
    const [id,setId]=useState(null)

   
    useEffect(() => {
        if (window.Chart && chartRef.current) {
            const ctx = chartRef.current.getContext("2d");

            
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

   
    useEffect(() => {
        let transactions;
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
                setId(userData.userId);
console.log(userData.userId);
                transactions = await transactionsResponse.json();
                // console.log(transactions)

                if (!Array.isArray(transactions) || transactions.length === 0) {
                    console.warn("Transaction API returned an empty response.");
                    return;
                }

                
                const totalSpent = transactions
                    .filter(txn => txn.transType === "out")
                    .reduce((sum, txn) => sum + parseFloat(txn.amount), 0);

                setSpent(totalSpent);

                
                let receiver2 = [];
                for (let i = transactions.length - 1; i >= transactions.length - 4; i--) {
                    if (transactions[i]) {  
                        receiver2.push(transactions[i]);
                    }
                }
                setReceiver(receiver2);

            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

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
                // console.log( data7);
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
    
    
    fetchCategoryTransactions(3, "HouseKeeping");
    
    
    const style2 = (10000 - spent) > 0 ? { color: "green" } : { color: "red" };

    return (
        <div className="dashboardpage">
            <Sidebar className="Sidebar" />
            <div className="dashboard-components">
                <div className="header">Welcome<hr className="h" /></div>
                <div className="main">
                    <div className="balance">
                        <div className="balance-amount">
                            <div>Balance</div>
                            <div style={style2}>${10000 - spent}</div>
                        </div>
                        <div className="budget">
                            <div className="budget-limit">
                                <p>Monthly budget limit</p>
                                <p style={{ color: "green", marginLeft: "29%" }}>$10,000</p>
                            </div>
                            <hr style={{ width: "75%", marginTop: "6%", marginBottom: "5%" }} />
                            <div className="spent">
                                <p>Spent</p>
                                <p style={{ color: "red" }}>${spent}</p>
                            </div>
                        </div>
                        <div className="monthly-expenses">
                            <div className="expense1">Monthly Expenses<hr className="h3" /></div>
                            <div className="housekeeping"><div>Housekeeping</div><div>${house}</div></div>
                            <div className="salon-services"><div>Salon services</div><div>${salon}</div></div>
                            <div className="EMI-payments"><div>EMI Payment</div><div>${payment}</div></div>
                            <div className="savings"><div>Others</div><div>${other}</div></div>
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
                            {receiver.length > 0 && receiver[0] && (
                                <div className="devcom2">
                                    <div style={{ display: "flex", width: "100%" }}>
                                        {/* <div className="pink2"></div> */}
                                        <div>{receiver[0].recipient}</div>
                                    </div>
                                    <div style={{ color: "red" }}>${receiver[0].amount}</div>
                                </div>
                            )}
                            <hr className="h10" />
                            {receiver.length > 1 && receiver[1] && (
                                <div className="seekOut">
                                    <div style={{ display: "flex", width: "100%" }}>
                                        {/* <div className="yellow2"></div> */}
                                        <div>{receiver[1].recipient}</div>
                                    </div>
                                    <div style={{ color: "red" }}>${receiver[1].amount}</div>
                                </div>
                            )}
                            <hr className="h10" />
                            {receiver.length > 2 && receiver[2] && (
                                <div className="urban-grocers">
                                    <div style={{ display: "flex", width: "100%" }}>
                                        {/* <div className="blue2"></div> */}
                                        <div>{receiver[2].recipient}</div>
                                    </div>
                                    <div style={{ color: "red" }}>${receiver[2].amount}</div>
                                </div>
                            )}
                            <hr className="h10" />
                            {receiver.length > 3 && receiver[3] && (
                                <div className="matrix-salon">
                                    <div style={{ display: "flex", width: "100%" }}>
                                        {/* <div className="lightpink2"></div> */}
                                        <div>{receiver[3].recipient}</div>
                                    </div>
                                    <div style={{ color: "red" }}>${receiver[3].amount}</div>
                                </div>
                            )}
                            <hr className="h10" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
