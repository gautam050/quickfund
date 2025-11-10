import React, { useState } from 'react';

export default function UploadDocs({ onPrev, onSubmit, data }){
  const [idUrl, setIdUrl] = useState('');
  const [incomeUrl, setIncomeUrl] = useState('');

  function handleSubmit(e){
    e.preventDefault();
    onSubmit({ documents: { idProof: idUrl, incomeProof: incomeUrl } });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Upload Documents</h3>
      <p>(File upload is mocked in this scaffold.)</p>
      <input placeholder="ID proof URL (mock)" value={idUrl} onChange={e=>setIdUrl(e.target.value)} />
      <input placeholder="Income proof URL (mock)" value={incomeUrl} onChange={e=>setIncomeUrl(e.target.value)} />
      <div>
        <button type="button" onClick={onPrev}>Back</button>
        <button type="submit">Submit Application</button>
      </div>
    </form>
  );
}
