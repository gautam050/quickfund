import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function RepaymentCalendar({ repayments = [] }){
  function tileContent({date, view}){
    if (view !== 'month') return null;
    const d = +new Date(date.setHours(0,0,0,0));
    const ev = repayments.find(r => +new Date(r.date).setHours(0,0,0,0) === d);
    if (!ev) return null;
    return <div className="marker">{ev.amount}</div>;
  }

  return <Calendar tileContent={tileContent} />;
}
