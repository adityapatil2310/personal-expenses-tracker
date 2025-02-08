import '../style/login.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        localStorage.removeItem('token'); 

        try {
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

            if (!response.ok) {
                alert("Check Email and Password Again");
                return;
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);

            const userIdResponse = await fetch('http://127.0.0.1:8000/authy/getId/', {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${data.token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (userIdResponse.ok) {
                const userData = await userIdResponse.json();
                console.log("Logged-in User ID:", userData.userId);
            }

            navigate('/dashboard');
        } catch (error) {
            console.error('Error:', error);
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
                    <input className='input1' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input className='input1' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className="btn" onClick={handleLogin}>Login</button>
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
