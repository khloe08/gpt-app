import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/schedule.css'; // 가정한 CSS 파일명입니다.

import { ko } from "date-fns/locale";
const Header = ({ startDate, setStartDate }) => {
 

  return (
    <div className="weekly-schedule-header">
      <h1>Weekly Schedule</h1>
      <div>
        <label>Week</label>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}
         locale={ko}                   // 한글로 변경
         dateFormat="yyyy.MM.dd (eee)" // 시간 포맷 변경 
      />
      </div>
    </div>
  );
};


export default Header;