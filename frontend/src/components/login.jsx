import '../style/login.css';
import { useContext, useState } from 'react';
import TrueContext from './context';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const response = await fetch('http://127.0.0.1:8000/authy/login/', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: email,
                password: password,
            }),
        });
    
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token); 
            navigate('/dashboard');
        } else {
           alert("Check Email and Password Again")
        }
    };
    

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
                    <input
                    className='input1'
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                    className='input1'
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="btn" onClick={handleLogin}>
                        Login
                    </button>
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
