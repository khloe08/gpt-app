import React, { useState } from 'react';
import DailyModal from './DailyModal';
import '../css/daily.css'; // 실제 CSS 파일 경로로 교체하세요

const DailySchedule = ({ startDate }) => {
  const [modalInfo, setModalInfo] = useState({ show: false, time: '', date: '' });
 
  
  const handleCellClick = (time) => {
    setModalInfo({ show: true, time, date:dates() });
  };

  const handleClose = () => {
    setModalInfo({ ...modalInfo, show: false });
  };
 
  // 주어진 시작 날짜로부터 일주일 날짜를 생성
  const dates=()=>{
    const date = new Date(startDate);
    date.setDate(date.getDate());
    return date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' });

  }
 ;

  // 하루를 시간대별로 나누기
  const times = Array.from({ length: 24 }, (_, i) => {
   const hours = Math.floor(i / 2);
   // const minutes = i % 2 === 0 ? '00' : '30';
    return `${i < 12 ? '오전' : '오후'} ${i % 12 || 12}:00`;
  });

  return (
    <div className="daily-schedule">
      <table>
        <thead>
          <tr>
            <th>시간</th>
           
              <th>{dates()}</th>
          
          </tr>
        </thead>
        <tbody>
          {times.map((time, timeIndex) => (
            <tr key={timeIndex}>
              <td>{time}</td>
                <td 
                onClick={() => handleCellClick(time)}>
                </td>    
            </tr>
          ))}
        </tbody>
      </table>
      <DailyModal
       show={modalInfo.show}
        onHide={handleClose}
        time={modalInfo.time}
        date={modalInfo.date}
      />
    </div>
  );
};

export default DailySchedule;
