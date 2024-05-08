import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

// 모달을 별도의 컴포넌트로 구현
const DailyModal = ({ show, onHide, time, date }) => (
  <Modal show={show} onHide={onHide} centered>
    <Modal.Header closeButton>
      <Modal.Title>실행 완료</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>날짜: {date}</p>
      <p>시간: {time}</p>
      <p>목표 내용: {time}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary">메시지 보내기</Button>
    </Modal.Footer>
  </Modal>
);

export default DailyModal;
