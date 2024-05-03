import React, { useState } from 'react';
import './css/schedule.css';
import WeeklyModal from './week/WeeklyModal.js';

const Weekly = ({ startDate }) => {
  const initialRowCount = 5; // 초기 행 수
  const initialColumnCount = 1; // 초기 열 수를 1로 변경
  const [columnCount, setColumnCount] = useState(initialColumnCount); // 동적 열 수 관리
  const [rowCount, setRowCount] = useState(initialRowCount); // 동적 행 수 관리
  const [tasks, setTasks] = useState(
    new Array(initialColumnCount).fill(new Array(initialRowCount).fill({ text: '', color: 'white' }))
  );
  const [modalShow, setModalShow] = useState(false);
  const [modalDetail, setModalDetail] = useState({ date: '', time: '', content: '', color: '' });

  const addRow = (dayIndex) => {
    // 특정 열(dayIndex)에 새 행 추가
    const updatedTasks = tasks.map((dayTasks, index) =>
      index === dayIndex ? [...dayTasks, { text: '', color: 'white' }] : dayTasks
    );
    setTasks(updatedTasks);
    // 모든 열의 행 수를 같게 유지
    if (dayIndex === 0) {
      setRowCount(rowCount + 1);
    }
  };

  const removeRow = (dayIndex) => {
    // 특정 열에서 마지막 행을 제거
    if (rowCount > initialRowCount) {
      const updatedTasks = tasks.map((dayTasks, index) =>
        index === dayIndex ? dayTasks.slice(0, -1) : dayTasks
      );
      setTasks(updatedTasks);
      // 모든 열의 행 수를 같게 유지
      if (dayIndex === 0) {
        setRowCount(rowCount - 1);
      }
    }
  };

  const addColumn = () => {
    setTasks([...tasks, new Array(rowCount).fill({ text: '', color: 'white' })]);
    setColumnCount(columnCount + 1);
  };

  const removeColumn = () => {
    if (columnCount > initialColumnCount) {
      setTasks(tasks.slice(0, -1));
      setColumnCount(columnCount - 1);
    }
  };

  const handleCellClick = (dayIndex, taskIndex) => {
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
  const days = Array.from({ length: columnCount }, (_, i) => {
    const day = new Date(startDate);
    day.setDate(day.getDate() + i);
    return day.toISOString().split('T')[0]; // YYYY-MM-DD 형식
  });

  return (
    <>
      <div className="weekly-schedule">
        <table>
          <thead>
            <tr>
              {days.map((day, index) => (
                <th key={index}>
                  {day}
                  <button onClick={() => removeColumn(index)}>-</button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rowCount }, (_, taskIndex) => (
              <tr key={taskIndex}>
                {tasks.map((dayTasks, dayIndex) => (
                  <td key={dayIndex} className="text-cell">
                    <input
                      type="text"
                      value={dayTasks[taskIndex]?.text || ''}
                      onChange={e => {
                        const newText = e.target.value;
                        setTasks(prev => prev.map((dayTasks, idx) =>
                          idx === dayIndex ? dayTasks.map((task, taskIdx) =>
                            taskIdx === taskIndex ? { ...task, text: newText } : task
                          ) : dayTasks
                        ));
                      }}
                      onClick={() => handleCellClick(dayIndex, taskIndex)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              {tasks.map((_, dayIndex) => (
                <td key={dayIndex}>
                  <button onClick={() => addRow(dayIndex)}>Add Row</button>
                  {dayIndex === 0 && rowCount > initialRowCount && (
                    <button onClick={() => removeRow(dayIndex)}>-</button>
                  )}
                </td>
              ))}
              <td>
                <button onClick={addColumn}>Add Column</button>
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
    </>
  );
};

export default Weekly;
