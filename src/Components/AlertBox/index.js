import React from 'react';
import { useState } from 'react';
import Modal from '../Modal';
import Button from '../Button';
import HorizontalLine from '../HorizontalLine';
import './index.scss';

function AlertBox({ text = '成功了', shown, closeFn }) {
  return (
    <Modal shown={shown}>
      <div className="ui-alert-box">
        <div className="ui-alert-text">{text}</div>
        <HorizontalLine />
        <div className="ui-alert-button-bottom" onClick={closeFn}>
          确认
        </div>
      </div>
    </Modal>
  );
}
export default AlertBox;
