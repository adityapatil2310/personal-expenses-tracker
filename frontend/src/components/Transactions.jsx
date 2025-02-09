import '../style/Transactions.css';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Transaction() {
  let trans = useNavigate();
  let [transactions, setTransactions] = useState([]);
  let [currentPage, setCurrentPage] = useState(0);
  let [selectedTransaction, setSelectedTransaction] = useState(null);
  const transactionsPerPage = 7;

  function transaction() {
    trans("/transaction/addTransaction");
  }

  useEffect(() => {
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

        const transactionsData = await transactionsResponse.json();
        setTransactions(transactionsData || []);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const startIndex = currentPage * transactionsPerPage;
  const paginatedTransactions = transactions.slice(startIndex, startIndex + transactionsPerPage);

  const formatDate = (dateString) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [day, month, year] = dateString.split("-").map(Number);
    return `${months[month - 1]} ${day}`;
  };

  return (
    <div className='transactionpage'>
      <Sidebar className='sidebar' />
      <div className='transactionparts'>
        <div className='searchbar'>
          <input placeholder='Search transaction name, keyword etc.' className='search' type='text' />
        </div>
        <div className='filters-component'>
          <div className='filters'>Filters</div>
          <hr className='hr' />
          <div className='allbtns'>
            <button className='btns'>Date</button>
            <button className='btns'>In/Out</button>
            <button className='btns'>Methods</button>
            <button className='btns-long' onClick={transaction}>Add a Transaction</button>
          </div>
          <hr className='hr' />
        </div>
        <div className='twocomponents'>
          <div className='transactiondetails1'>
            <table className='table'>
              <thead>
                <tr className='TH'>
                  <th className='date'>Date</th>
                  <th className='from1'>From/To</th>
                  <th className='amount'>Amount</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTransactions.length > 0 ? (
                  paginatedTransactions.map((e, i) => (
                    <tr
                      key={i}
                      onClick={() => setSelectedTransaction(e)} 
                      className={`${selectedTransaction === e ? 'clicked' : ''} tr`}
                    >
                      <td className='td'>{formatDate(e.datetime.split(" ")[0]) || 'N/A'}</td>
                      <td className='td'>
                        <div className='data'>
                          {/* <div className='pink'></div> */}
                          <div>{e.recipient || 'Unknown'}</div>
                        </div>
                      </td>
                      <td className='value1'>${e.amount || '0.00'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan='3' className='td' style={{ textAlign: 'center' }}>No Transactions Found</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className='pagination-controls'>
              <button
                className='pagination-btn'
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 0}
              >
                Previous Page
              </button>
              <button
                className='pagination-btn'
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={startIndex + transactionsPerPage >= transactions.length}
              >
                Next Page
              </button>
            </div>
          </div>
          <div className='transactiondetails2'>
            <div className='p' style={{ border: 'none' }}>Transaction Detail</div>
            <div className='price'>
              ${selectedTransaction ?Number( selectedTransaction.amount).toFixed(2) : '0.00'}
            </div>
            <div className='detail'>
              <div className='from'>
                {/* <div className='pink' style={{ margin: '0.65rem', height: '2.5rem', width: '2.5rem' }}></div> */}
                <div style={{fontSize:"130%", marginLeft:"4%",display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div>FROM</div>
                  <div style={{ fontWeight: '700' }}>You</div>
                </div>
              </div>
              <div className='arrow'>
                <i className="fa-solid fa-arrow-down fa-3x"></i>
              </div>
              <div className='to'>
                {/* <div style={{ margin: '0.65rem', height: '2.5rem', width: '2.5rem', backgroundColor: '#784F72', borderRadius: '50%' }}></div> */}
                <div style={{ marginLeft:"4%",fontSize:"130%",display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div>TO</div>
                  <div style={{ fontWeight: '700' }}>{selectedTransaction ? selectedTransaction.recipient : 'You'}</div>
                </div>
              </div>
            </div>
            <div className='remarks'>
              <p className='remarkstext'>REMARKS</p>
              <div className='note'>
                <textarea placeholder='Monthly pay bill.' className='textarea'></textarea>
              </div>
              <div className='addattachment'>
                <button className='addattachmentbtn'>+ ADD ATTACHMENT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
