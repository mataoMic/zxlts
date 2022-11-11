import * as _ from 'lodash-es';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';

function Modal({
  children,
  onBackdropClick,
  solidBackdrop = false,
  shown = false,
}) {
  const [containerDom] = useState(document.createElement('div'));

  useEffect(() => {
    document.body.append(containerDom);
    return () => {
      document.body.removeChild(containerDom);
    };
  }, []);

  const handleClick = (event) => {
    const className = _.get(event, 'target.className');
    if (!onBackdropClick || !_.startsWith(className, 'ui-modal-backdrop')) {
      return;
    }
    onBackdropClick();
  };

  if (!shown) {
    return <></>;
  }

  return ReactDOM.createPortal(
    <div
      className={`ui-modal-backdrop ${solidBackdrop ? 'solid' : ''}`}
      onClick={handleClick}
    >
      <div className="ui-modal-container">{children}</div>
    </div>,
    containerDom
  );
}

export default Modal;
