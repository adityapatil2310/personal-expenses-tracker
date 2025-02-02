import '../style/register.css';

export default function Login() {
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
                    <button className="btn4">User ID</button>
                    <button className="btn4">Create Password</button>
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
