import '../style/Sidebar.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const navigate2=useNavigate();
  const navigate3=useNavigate();
  const navigate10=useNavigate();
  const [btnid, setBtnid] = useState(null);

  function handleclick(id) {
    setBtnid(id);
  }
  function transactionredirect(){
    navigate("/transaction");
  }
  function analyticsredirect(){
    navigate2("/analytics");
  }
  function dashboardredirect(){
    navigate3("/dashboard");
  }

    const handleLogout = async () => {
      const token = localStorage.getItem("token");
  
      if (!token) {
          alert("You are already logged out!");
          return;
      }
  
      const confirmLogout = window.confirm("Are you sure you want to log out?");
      if (!confirmLogout) return;
  
      try {
          const response = await fetch("http://127.0.0.1:8000/authy/logout/", {
              method: "POST",
              headers: {
                  "Authorization": `Token ${token}`,
              },
          });
  
          if (response.ok) {
              localStorage.removeItem("token"); 
              navigate10("/")
          } else {
              alert("Logout failed. Please try again.");
          }
      } catch (error) {
          console.error("Error logging out:", error);
          alert("An error occurred. Please try again.");
      }
  
  }

  return (
    <>
      <div className="dashboard">
        <div className="upper">
          <div className="userpic">
            <img
              className="userimg"
              src="https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg"
              alt="User"
            />
            <hr className="hrline" />
          </div>

          <div className="options">
            <button
              onClick={() => {handleclick(1);dashboardredirect()}}
              className={`${btnid === 1 ? 'clicked' : ''} option`}
            >
              Dashboard
            </button>
            <button
              onClick={() => {handleclick(2);transactionredirect()}}
              className={`${btnid === 2 ? 'clicked' : ''} option`}
            >
              Transactions
            </button>
            <button
              onClick={() => {handleclick(3);analyticsredirect()}}
              className={`${btnid === 3 ? 'clicked' : ''} option`}
            >
              Analytics
            </button>
          </div>
        </div>

        <div className="lower">
          <button className="logoutbtn" onClick={handleLogout}>Logout</button>
          <hr className="hrline" />
        </div>
      </div>
    </>
  );
}
