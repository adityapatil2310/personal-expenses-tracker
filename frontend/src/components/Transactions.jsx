import '../style/Transactions.css';
import Sidebar from './Sidebar';
import { useState } from 'react';

export default function Transaction() {
  let [id, setId] = useState(null);

  function onhandlechange(id) {
    setId(id);
  }

  return (
    <div className='transactionpage'>
      <Sidebar className='sidebar' />
      <div className='transactionparts'>
        <div className='searchbar'>
          <input
            placeholder='Search transaction name, keyword etc.'
            className='search'
            type='text'
          />
        </div>
        <div className='filters-component'>
          <div className='filters'>Filters</div>
          <hr className='hr' />
          <div className='allbtns'>
            <button className='btns'>Date</button>
            <button className='btns'>In/Out</button>
            <button className='btns'>Methods</button>
            <button className='btns-long'>Add a Transaction</button>
          </div>
          <hr className='hr' />
        </div>
        <div className='twocomponents'>
          <div className='transactiondetails1'>
            <table className='table'>
              <tr className='TH'>
                <th className='date'>Date</th>
                <th className='from1'>From</th>
                <th className='amount'>Amount</th>
              </tr>
              <tr
                onClick={() => onhandlechange(1)}
                className={`${id == 1 ? 'clicked' : ''} tr`}
              >
                <td className='td'>Jan 15</td>
                <td className='td'>
                  <div className='data'>
                    <div className='pink'></div>
                    <div>Devcom</div>
                  </div>
                </td>
                <td className='value1'>$5999</td>
              </tr>
              <tr
                onClick={() => onhandlechange(2)}
                className={`${id == 2 ? 'clicked' : ''} tr`}
              >
                <td className='td'>Jan 15</td>
                <td>
                  <div className='data'>
                    <div className='yellow'></div>
                    <div>SeekOut</div>
                  </div>
                </td>
                <td className='value2'>$600</td>
              </tr>
              <tr
                onClick={() => onhandlechange(3)}
                className={`${id == 3 ? 'clicked' : ''} tr`}
              >
                <td>Jan 16</td>
                <td>
                  <div className='green'></div>
                </td>
                <td></td>
              </tr>
              <tr
                onClick={() => onhandlechange(4)}
                className={`${id == 4 ? 'clicked' : ''} tr`}
              >
                <td>Jan 17</td>
                <td>
                  <div className='lightpink'></div>
                </td>
                <td></td>
              </tr>
              <tr
                onClick={() => onhandlechange(5)}
                className={`${id == 5 ? 'clicked' : ''} tr`}
              >
                <td>Jan 17</td>
                <td>
                  <div className='pink'></div>
                </td>
                <td></td>
              </tr>
              <tr
                onClick={() => onhandlechange(6)}
                className={`${id == 6 ? 'clicked' : ''} tr`}
              >
                <td>Jan 18</td>
                <td>
                  <div className='darkblue'></div>
                </td>
                <td></td>
              </tr>
              <tr
                onClick={() => onhandlechange(7)}
                className={`${id == 7 ? 'clicked' : ''} tr`}
              >
                <td>Jan 19</td>
                <td>
                  <div className='darkgreen'></div>
                </td>
                <td></td>
              </tr>
            </table>
          </div>
          <div className='transactiondetails2'>
            <div className='p' style={{ border: 'none' }}>Transaction Detail</div>
            <div className='price'>$5999.0</div>
            <div className='detail'>
              <div className='from'>
                <div
                  className='pink'
                  style={{ margin: '0.65rem', height: '2.5rem', width: '2.5rem' }}
                ></div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div>FROM</div>
                  <div style={{ fontWeight: '700' }}>DevCom</div>
                </div>
              </div>
              <div className='arrow'>
                <i className="fa-solid fa-arrow-down fa-3x"></i>
              </div>
              <div className='to'>
                <div
                  style={{
                    margin: '0.65rem',
                    height: '2.5rem',
                    width: '2.5rem',
                    backgroundColor: '#784F72',
                    borderRadius: '50%',
                  }}
                ></div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div>TO</div>
                  <div style={{ fontWeight: '700' }}>You</div>
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
