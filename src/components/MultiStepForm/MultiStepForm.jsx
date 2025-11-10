import React, { useState } from 'react';
import PersonalInfo from './steps/PersonalInfo';
import FinancialInfo from './steps/FinancialInfo';
import UploadDocs from './steps/UploadDocs';
import { useDispatch, useSelector } from 'react-redux';
import { createLoanApplication } from '../../slices/loansSlice';
import { toast } from 'react-toastify';

const steps = ['Personal', 'Financial', 'Upload'];

export default function MultiStepForm(){
  const [stepIdx, setStepIdx] = useState(0);
  const [form, setForm] = useState({});
  const user = useSelector(s=>s.auth.user);
  const dispatch = useDispatch();

  function next(data){
    setForm(prev => ({ ...prev, ...data }));
    setStepIdx(s => Math.min(s+1, steps.length-1));
  }
  function prev(){ setStepIdx(s => Math.max(s-1, 0)); }

  async function submit(finalData){
    const application = {
      ...form,
      ...finalData,
      applicantUid: user?.uid || 'anonymous',
      status: 'Submitted',
      createdAt: Date.now(),
    };
    try{
      await dispatch(createLoanApplication({ application })).unwrap();
      toast.success('Application submitted');
      setForm({});
      setStepIdx(0);
    }catch(e){ toast.error('Submit failed: ' + e); }
  }

  return (
    <div className="multi-step">
      <div className="progress">Step {stepIdx+1} / {steps.length}</div>
      <div className="step-container">
        {stepIdx===0 && <PersonalInfo onNext={next} data={form} />}
        {stepIdx===1 && <FinancialInfo onNext={next} onPrev={prev} data={form} />}
        {stepIdx===2 && <UploadDocs onPrev={prev} onSubmit={submit} data={form} />}
      </div>
    </div>
  );
}
