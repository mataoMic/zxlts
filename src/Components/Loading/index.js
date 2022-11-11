import React from 'react';
import Modal from '../Modal';
import './index.scss';
import textLan from '../../asset/language/text';
function Loading(params) {
  return (
    <Modal shown={true} template="dark">
      <div className="ui-loading-content-box">
        <div>
          <span className="ui-loading-animation">
            <i className="iconfont icon-loading"></i>
          </span>
          <div className="ui-loading-text">{textLan.toast.load}</div>
        </div>
      </div>
    </Modal>
  );
}
export default Loading;
