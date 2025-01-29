import '../style/Sidebar.css';
import { useState } from 'react';

export default function Sidebar() {
  const [btnid, setBtnid] = useState(null);

  function handleclick(id) {
    setBtnid(id);
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
              onClick={() => handleclick(1)}
              className={`${btnid === 1 ? 'clicked' : ''} option`}
            >
              Dashboard
            </button>
            <button
              onClick={() => handleclick(2)}
              className={`${btnid === 2 ? 'clicked' : ''} option`}
            >
              Transactions
            </button>
            <button
              onClick={() => handleclick(3)}
              className={`${btnid === 3 ? 'clicked' : ''} option`}
            >
              Analytics
            </button>
          </div>
        </div>

        <div className="lower">
          <button className="logoutbtn">Logout</button>
          <hr className="hrline" />
        </div>
      </div>
    </>
  );
}
