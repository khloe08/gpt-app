import React, { useState } from 'react';
import Weekly from "./week/Weekly.js";
import Header from "./head/Header.js";
import Dailys from "./daily/Dailys.js";

// 주간 스케줄 앱 전체를 포함하는 컴포넌트

const Schedules = () => {
    const [startDate, setStartDate] = useState(new Date());
   
    const days = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startDate);
      day.setDate(day.getDate() + i);
      return day.toISOString().split('T')[0]; // YYYY-MM-DD 형식
    });

    return (
      <div>
        <Header startDate={startDate} setStartDate={setStartDate} />
        <div className="weekly-container">
        <table>         
          <tr>
        {days.map(day => 
            <td><Weekly key={day} startDate={day}/>
            </td> )}
        </tr>
        </table>
      </div>
    
      </div>
    );
  };
  
  export default Schedules;