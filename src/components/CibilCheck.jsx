import React, { useState } from 'react';

export default function CibilCheck(){
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

  async function check(){
    setLoading(true);
    try{
      await new Promise(r=>setTimeout(r,500));
      setScore(650 + Math.floor(Math.random()*150));
    }catch(e){ console.error(e); }
    finally{ setLoading(false); }
  }

  return (
    <div>
      <button onClick={check} disabled={loading}>Check CIBIL</button>
      {score && <div>Your mock CIBIL score: {score}</div>}
    </div>
  );
}
