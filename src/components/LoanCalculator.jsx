import React, { useState, useEffect } from "react";
import "./LoanCalculator.css";

export default function LoanCalculator() {
  const [loanType, setLoanType] = useState("personal");
  const [amount, setAmount] = useState(10000);
  const [months, setMonths] = useState(12);
  const [income, setIncome] = useState(30000);
  const [processingFee, setProcessingFee] = useState(1);
  const [includeInsurance, setIncludeInsurance] = useState(false);
  const [emiDetails, setEmiDetails] = useState(null);

  const loanTypes = {
    personal: 15,
    home: 8,
    education: 10,
    business: 12,
  };

  useEffect(() => {
    calculateEMI();
  }, [loanType, amount, months, processingFee, includeInsurance]);

  const calculateEMI = () => {
    const rate = loanTypes[loanType] / 12 / 100;
    const emi = (amount * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    const totalPayment = emi * months;
    const totalInterest = totalPayment - amount;
    const processingCharge = (amount * processingFee) / 100;
    const insuranceCharge = includeInsurance ? 500 : 0;

    setEmiDetails({
      emi: emi.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      processingFee: processingCharge.toFixed(2),
      insurance: insuranceCharge.toFixed(2),
      totalWithFees: (parseFloat(totalPayment) + processingCharge + insuranceCharge).toFixed(2),
    });
  };

  const copyEstimate = () => {
    if (!emiDetails) return;
    const text = `
Loan Type: ${loanType.toUpperCase()}
Loan Amount: ₹${amount}
Term: ${months} months
Monthly EMI: ₹${emiDetails.emi}
Total Payment: ₹${emiDetails.totalPayment}
Total Interest: ₹${emiDetails.totalInterest}
Total with Fees: ₹${emiDetails.totalWithFees}
    `;
    navigator.clipboard.writeText(text);
    alert("Estimate copied to clipboard!");
  };

  return (
    <div className="loan-calculator">
      <h2>📘 Loan Calculator</h2>

      <label>Loan Type</label>
      <select value={loanType} onChange={(e) => setLoanType(e.target.value)}>
        <option value="personal">Personal Loan ({loanTypes.personal}%)</option>
        <option value="home">Home Loan ({loanTypes.home}%)</option>
        <option value="education">Education Loan ({loanTypes.education}%)</option>
        <option value="business">Business Loan ({loanTypes.business}%)</option>
      </select>

      <label>Loan Amount (₹)</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      <label>Term (Months)</label>
      <input
        type="number"
        value={months}
        onChange={(e) => setMonths(Number(e.target.value))}
      />

      <label>Monthly Income (₹)</label>
      <input
        type="number"
        value={income}
        onChange={(e) => setIncome(Number(e.target.value))}
      />

      <label>Processing Fee (%)</label>
      <input
        type="number"
        value={processingFee}
        onChange={(e) => setProcessingFee(Number(e.target.value))}
      />

      <div className="checkbox">
        <input
          type="checkbox"
          checked={includeInsurance}
          onChange={() => setIncludeInsurance(!includeInsurance)}
        />
        <span>Include Insurance (₹500)</span>
      </div>

      {emiDetails && (
        <div className="emi-box">
          <p>💰 <strong>Monthly EMI:</strong> ₹{emiDetails.emi}</p>
          <p>💸 <strong>Total Interest:</strong> ₹{emiDetails.totalInterest}</p>
          <p>📅 <strong>Total Payment:</strong> ₹{emiDetails.totalPayment}</p>
          <p>⚙️ <strong>Processing Fee:</strong> ₹{emiDetails.processingFee}</p>
          {includeInsurance && <p>🛡️ <strong>Insurance:</strong> ₹{emiDetails.insurance}</p>}
          <hr />
          <p className="total">🧾 Total with Fees: <strong>₹{emiDetails.totalWithFees}</strong></p>
        </div>
      )}

      <button className="copy-btn" onClick={copyEstimate}>
        Copy Estimate
      </button>
    </div>
  );
}
