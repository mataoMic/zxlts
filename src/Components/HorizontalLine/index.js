import React from 'react';
import './index.scss';

function HorizontalLine({ type = 'default', color = '#e9e9e9' }) {
  let style = {
    borderColor: color,
  };
  return (
    <div className={'ui-horizontal-' + type + '-line'} style={style}></div>
  );
}

export default HorizontalLine;
