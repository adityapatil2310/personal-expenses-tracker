import { createContext, useContext, useState, useEffect } from "react";

const TrueContext = createContext();

export function TruecntextProvider({ children }) {
    const [spent, setSpent] = useState(0);
    const [financeData, setFinanceData] = useState({
      
        savingsGoal: { year:null, month: null},
       
      });
    const [userid, setUserid] = useState(null);
    const getCurrentDateTime = () => {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, "0");
        const month = String(now.getMonth() + 1).padStart(2, "0"); 
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
    
        return `${day}-${month}-${year} ${hours}:${minutes}`;
    };
    
    const [formData, setFormData] = useState({
       text: "",
       amount: "",
        datetime:getCurrentDateTime(),
       transType: "out",
        category: "",
       recipient: ""
    });

    const [istrue, setIstrue] = useState(false);

    useEffect(() => {
        const fetchdata = async () => {
            
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
            const id = userData.userId;
            setUserid(id);
        };
        
        fetchdata();
    }, []);

    useEffect(() => {
        if (userid) {
            setFormData((prevData) => ({
                ...prevData,
                userId: userid,
            }));
        }
    }, [userid]);
    

    return (
        <TrueContext.Provider value={{ istrue, setIstrue, formData, setFormData,userid,financeData,setFinanceData ,spent,setSpent}}>
            {children}
        </TrueContext.Provider>
    );
}

export default TrueContext;
