import React, { useEffect } from 'react';
import Header from '../components/Header';
import MultiStepForm from '../components/MultiStepForm/MultiStepForm';
import LoanCalculator from '../components/LoanCalculator';
import LoanTracker from '../components/LoanTracker';
import RepaymentCalendar from '../components/RepaymentCalendar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserLoans } from '../slices/loansSlice';
import './UserDashboard.css';

export default function UserDashboard() {
  const user = useSelector((state) => state.auth.user);
  const loans = useSelector((state) => state.loans.applications || []);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchUserLoans({ uid: user.uid }));
    }
  }, [user, dispatch]);

  return (
    <div className="dashboard dark-theme">
      <Header />
      <main className="dashboard-container">
        <div className="dashboard-3grid">

          {/* LEFT: Loan Calculator */}
          <section className="dashboard-section">
            <h2 className="section-title">Loan Calculator</h2>
            <div className="section-card">
              <LoanCalculator />
            </div>
          </section>

          {/* MIDDLE: User’s Loan Info */}
          <section className="dashboard-section center-block">
            <h2 className="section-title">
              Hello, {user?.displayName || 'User'} 👋
            </h2>

            <div className="section-card">
              <h3 className="sub-heading">Apply for a New Loan</h3>
              <MultiStepForm />
            </div>

            <div className="section-card">
              <h3 className="sub-heading">Your Loan Applications</h3>
              {loans.length === 0 ? (
                <p className="empty-text">No active applications yet.</p>
              ) : (
                <div className="loans-grid">
                  {loans.map((loan) => (
                    <div key={loan.id} className="loan-card">
                      <h3>Loan #{loan.id}</h3>
                      <LoanTracker application={loan} />
                      <p>Status: <strong>{loan.status}</strong></p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* RIGHT: Repayment Calendar */}
          <section className="dashboard-section">
            <h2 className="section-title">Repayment Calendar</h2>
            <div className="section-card">
              <RepaymentCalendar repayments={[]} />
            </div>
          </section>

        </div>
      </main>

      {/* 🌐 FOOTER */}
      <footer className="dashboard-footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} Quick Fund. All rights reserved.</p>
        
        </div>
      </footer>
    </div>
  );
}
