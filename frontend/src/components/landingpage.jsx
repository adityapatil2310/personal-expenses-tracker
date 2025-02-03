import '../style/landingpage.css';
import { useContext } from 'react';
import TrueContext from './context';
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();
    const { istrue, setIstrue } = useContext(TrueContext);

    // Redirect based on login/signup choice
    function redirect() {
        setIstrue(true);  // Set flag to true for login view
        navigate("/login");
    }

    function redirect2() {
        setIstrue(false); // Set flag to false for sign-up view
        navigate("/register");
    }

    return (
        <div className="loginpage">
            <div className="maindiv">
                <div className="logindiv">
                    <div className="imgdiv">
                        <img 
                            className="userimg" 
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7qKgRvChw4p7QLmLJ_Vw2PyM11C6ThI6oA&s" 
                            alt="User"
                        />
                    </div>
                    <button className="btn" onClick={redirect}>Login</button>
                    <button className="btn" onClick={redirect2}>Sign up</button>
                </div>
                <div className="textdiv">
                    <div className="text">Expense</div>
                    <div className="text">Tracker: Know</div>
                    <div className="text">your wallet.</div>
                </div>
            </div>
        </div>
    );
}
