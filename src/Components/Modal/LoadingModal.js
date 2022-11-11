import * as _ from 'lodash-es';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';
import { Loading } from '@arco-design/mobile-react'; 
import './LoadingModal.scss';

function LoadingModal(props) {
  return (
    <Modal {...props}>
      <div className="ui-modal-loading">
        <div>
            <Loading type="spin" />
          <div className="ui-modal-loading__text">{props.text}</div>
        </div>
      </div>
    </Modal>
  );
}

export function loading(text = '数据加载中', solidBackdrop = false) {
  const root = ReactDOM.createRoot(document.createDocumentFragment());

  root.render(
    <LoadingModal shown={true} solidBackdrop={solidBackdrop} text={text} />
  );

  return () => {
    root.unmount();
  };
}

export default LoadingModal;
