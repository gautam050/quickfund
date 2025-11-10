import React from 'react';
import './LoanTracker.css'; // 👈 Import this CSS file

export default function LoanTracker({ application }) {
  const stages = ['Submitted', 'Under Review', 'Approved', 'Rejected'];
  const idx = Math.max(0, stages.indexOf(application.status));

  return (
    <div className="tracker">
      {stages.map((s, i) => (
        <div key={s} className={`stage ${i <= idx ? 'done' : ''}`}>
          <div className="dot">{i + 1}</div>
          <div className="label">{s}</div>
        </div>
      ))}
    </div>
  );
}
