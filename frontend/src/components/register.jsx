import '../style/register.css';
import TrueContext from './context';
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate3 = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
    
        const userData = {
            username: email,
            password: password,
        };
    
        try {
            const response = await fetch("http://127.0.0.1:8000/authy/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
    
            if (response.ok) {
                navigate3('/dashboard');
            } else {
                alert("Registration Failed");
            }
        } catch (error) {
            alert('Error:', error);
        }
    };
    

    return (
        <div className="registerpage">
            <div className="maindiv">
                <div className="registerdiv">
                <div className="imgdiv">
                        <img 
                            className="userimg" 
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7qKgRvChw4p7QLmLJ_Vw2PyM11C6ThI6oA&s" 
                            alt="User"
                        />
                    </div>
                    <div style={{height:"80%",display:"flex",flexDirection:"column",alignItems:"center"}}>
                    <input
                    className='input2'
                        type="email"
                        placeholder="Email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                    className='input2'
                        type="password"
                        placeholder="Password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                    className='input2'
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button className="btn5" onClick={handleRegister}>Register</button>
                    </div>
                    
                </div>
                <div className="textdiv">
                    <div className="text">Get started</div>
                    <div className="text">on your money</div>
                    <div className="text">tracking journey</div>
                </div>
            </div>
        </div>
    );
}
