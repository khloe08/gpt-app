// ScheduleModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const WeeklyModal = ({ show, onHide, data }) => {
  // data 객체에는 { date, time, content, color } 가 포함될 것입니다.
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>일정 상세</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>날짜: {data.date}</p>
        <p>시간: {data.time}</p>
        <p>내용: {data.content}</p>
        <p>색깔: {data.color}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WeeklyModal;
