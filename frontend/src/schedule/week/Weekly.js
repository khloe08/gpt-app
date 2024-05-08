import React, { useState } from 'react';
import '../css/weekly.css';
import DailyModal from '../daily/DailyModal';
import WeeklyModal from './WeeklyModal.js';
import '../css/daily.css'; 

const Weekly = ({ startDate }) => {
  const [modalInfo, setModalInfo] = useState({ show: false, time: '', date: '' });

  const initialRowCount = 5; // 초기 행 수
  const initialColumnCount = 1; // 초기 열 수를 1로 설정
  const [tasks, setTasks] = useState(
    new Array(initialColumnCount).fill(null).map(() => new Array(initialRowCount).fill({ text: '', color: 'white' }))
  );
  const [modalShow, setModalShow] = useState(false);
  const [modalDetail, setModalDetail] = useState({ date: '', time: '', content: '', color: '' });

  const addRow = (dayIndex) => {
    const newTasks = [...tasks];
    newTasks[dayIndex] = [...newTasks[dayIndex], { text: '', color: 'white' }];
    setTasks(newTasks);
  };

  const removeRow = (dayIndex) => {
    const newTasks = [...tasks];
    if (newTasks[dayIndex].length > 1) {
      newTasks[dayIndex].pop();
      setTasks(newTasks);
    }
  };

  const weekCellClick = (dayIndex, taskIndex) => {
    const task = tasks[dayIndex][taskIndex];
    setModalDetail({
      date: days[dayIndex],
      time: `${8 + taskIndex}:00`,
      content: task.text,
      color: task.color
    });
    setModalShow(true);
  };

  // 날짜를 기준으로 요일 배열을 생성합니다.
  const days = Array.from({ length: tasks.length }, (_, i) => {
    const day = new Date(startDate);
    day.setDate(day.getDate() + i);
    return day.toISOString().split('T')[0]; // YYYY-MM-DD 형식
  });

////////////Daily/////////
  const dailyCellClick = (time) => {
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
    <>
      <div className="weekly-schedule">
        <table>
          <thead>
            <tr>
              <th>{days[0]}</th>
            </tr>
          </thead>
          <tbody>
            {tasks[0].map((_, taskIndex) => (
              <tr key={taskIndex}>
                <td className="text-cell">
                  <input
                    type="text"
                    value={tasks[0][taskIndex].text}
                    onChange={e => {
                      const newText = e.target.value;
                      const newTasks = [...tasks];
                      newTasks[0][taskIndex] = { text: newText, color: 'white' };
                      setTasks(newTasks);
                    }}
                    onClick={() => weekCellClick(0, taskIndex)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <button onClick={() => addRow(0)}>Add Row</button>
                {tasks[0].length > initialRowCount && (
                  <button onClick={() => removeRow(0)}>-</button>
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <WeeklyModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={modalDetail}
      />
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
                onClick={() => dailyCellClick(time)}>
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
  </>
    
  );
};

export default Weekly;
