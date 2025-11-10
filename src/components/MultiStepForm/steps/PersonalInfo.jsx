import React, { useState } from 'react';

export default function PersonalInfo({ onNext, data }) {
  const [name, setName] = useState(data.personal?.name || '');
  const [dob, setDob] = useState(data.personal?.dob || '');
  const [phone, setPhone] = useState(data.personal?.phone || '');
  const [amount, setAmount] = useState(data.personal?.amount || ''); // 💰 New field

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) return alert('Name is required');
    if (!amount || Number(amount) <= 0) return alert('Please enter a valid loan amount');

    onNext({
      personal: { name, dob, phone, amount },
    });
  }

  return (
    <form onSubmit={handleSubmit} className="form-step">
      <h3>Personal Information</h3>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full name"
        required
      />

      <input
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        placeholder="Date of birth"
      />

      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone number"
        maxLength={10}
      />

      {/* 💰 New Field: Loan Amount */}
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Money required (₹)"
        min="1000"
        required
      />

      <button type="submit">Next</button>
    </form>
  );
}
