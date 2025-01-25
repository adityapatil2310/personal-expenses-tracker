import '../style/login.css'
export default function Login(){
    const bodyStyle = {
        backgroundImage: "expense",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        margin: 0,
        height: "100vh", // Ensure the body takes up full height
      };
    return(
        <div className='loginpage'>
        <div className="maindiv">
            <div className='logindiv'>
                <div className='imgdiv'>
                <img className="userimg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7qKgRvChw4p7QLmLJ_Vw2PyM11C6ThI6oA&s"></img>
                </div>
            
            <button className="btn">Login</button>
            <button className="btn">Sign up</button>
            </div>
          <div className='textdiv'>
             <div className='text'>Expense</div>
             <div className='text'>Tracker:Know</div>
             <div className='text'>your wallet.</div>
          </div>
        </div>
        </div>
    )
}