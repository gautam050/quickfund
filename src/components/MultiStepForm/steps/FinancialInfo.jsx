import React, { useState } from 'react';

export default function FinancialInfo({ onNext, onPrev, data }){
  const [income, setIncome] = useState(data.financial?.income || '');
  const [employer, setEmployer] = useState(data.financial?.employer || '');

  function handle(e){
    e.preventDefault();
    if(!income) return alert('Income required');
    onNext({ financial: { income, employer } });
  }

  return (
    <form onSubmit={handle}>
      <h3>Financial Information</h3>
      <input value={income} onChange={e=>setIncome(e.target.value)} placeholder="Monthly income" />
      <input value={employer} onChange={e=>setEmployer(e.target.value)} placeholder="Employer" />
      <div>
        <button type="button" onClick={onPrev}>Back</button>
        <button type="submit">Next</button>
      </div>
    </form>
  );
}
