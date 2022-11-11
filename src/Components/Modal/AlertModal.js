import * as _ from 'lodash-es';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import HorizontalLine from '../HorizontalLine';
import './AlertModal.scss';
import Modal from './Modal';

function AlertModal({
  onOk = () => {},
  text = '',
  solidBackdrop = false,
  shown = false,
  onCancel = false,
}) {
  return (
    <Modal shown={shown} solidBackdrop={solidBackdrop}>
      <div className="ui-modal-alert">
        <div className="ui-modal-alert__text">{text}</div>
        <HorizontalLine />
        {!onCancel ? (
          <div className="ui-modal-alert__button" onClick={onOk}>
            确认
          </div>
        ) : (
          <div className="ui-modal-button-box">
            <div className="ui-modal-alert__button" onClick={onCancel}>
              取消
            </div>
            <div className="ui-modal-alert__button" onClick={onOk}>
              确认
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

export function alert(text, callbacks) {
  const root = ReactDOM.createRoot(document.createDocumentFragment());
  return new Promise((res) => {
    // console.log(_.get(callbacks, 'cancel'));
    const handleOk = () => {
      _.get(callbacks, 'confirm') && callbacks.confirm();
      res(true);
      root.unmount();
    };
    const handleCancel = () => {
      _.get(callbacks, 'cancel') && callbacks.cancel();
      res(false);
      root.unmount();
    };
    root.render(
      <AlertModal
        onOk={handleOk}
        text={text}
        shown={true}
        onCancel={_.get(callbacks, 'cancel') && handleCancel}
      />
    );
  });
}

export default AlertModal;
