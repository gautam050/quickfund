import React, { useEffect } from 'react';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllLoans, updateLoanStatus } from '../slices/loansSlice';

export default function AdminDashboard(){
  const dispatch = useDispatch();
  const loans = useSelector(s=>s.loans.applications || []);

  useEffect(()=>{
    dispatch(fetchAllLoans());
  },[]);

  async function setStatus(id, status){
    try{
      await dispatch(updateLoanStatus({ id, status })).unwrap();
      alert('Status updated');
    }catch(e){
      alert('Update failed: ' + e);
    }
  }

  return (
    <div>
      <Header />
      <main className="container">
        <h1>Admin Dashboard</h1>
        <p>List of loan applications:</p>
        {loans.length===0 ? <p>No applications available.</p> : (
          <table>
            <thead><tr><th>ID</th><th>Applicant</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {loans.map(l=>(
                <tr key={l.id}>
                  <td>{l.id}</td>
                  <td>{l.personal?.name || l.applicantUid}</td>
                  <td>{l.status}</td>
                  <td>
                    <button onClick={()=>setStatus(l.id, 'Under Review')}>Under Review</button>
                    <button onClick={()=>setStatus(l.id, 'Verified')}>Verify</button>
                    <button onClick={()=>setStatus(l.id, 'Approved')}>Approve</button>
                    <button onClick={()=>setStatus(l.id, 'Rejected')}>Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}
