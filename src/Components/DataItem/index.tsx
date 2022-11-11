import React, { useState } from 'react';
import './index.scss';

function DataItem({
  label,
  value,
  children,
  selectable,
  selected,
  onSelect,
  expand = true,
  dcimColor = false,
  date,
  style = {},
  noCrevice = false
}:any) {
  const hasContent = !!children && expand;
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="ui-data-item" style={style}>
      <div className="ui-data-item-topbox" >
        <div
          className={
            (selectable
              ? 'ui-data-item-topbox-labebox ui-data-item-topbox-label'
              : 'ui-data-item-topbox-label') +
            ' ' +
            (dcimColor ? 'dcimColor' : '')
          }
        >
          {label}
        </div>
        <div>
          {date ? (
            <div className={'ui-data-item-topbox-labebox'}>
              <span className={'ui-data-item-hasContent-value mms-date'}>
                {date}
              </span>
            </div>
          ) : null}

          <div className={hasContent ? 'ui-data-item-topbox-labebox' : ''}>
            <span className={hasContent ? 'ui-data-item-hasContent-value' : ''}>
              {value}
            </span>
            {hasContent && (
              <i
                className={
                  'iconfont ' + (expanded ? 'icon-arrowup' : 'icon-arrowdown')
                }
                onClick={() => setExpanded(!expanded)}
              ></i>
            )}
          </div>
        </div>
      </div>
      <div
        className={
          'ui-children-box ' + (selectable ? 'ui-selectable-children-box' : '')
        }
      >
        {(expanded || !expand) && children}
      </div>
    </div>
  );
}

export default DataItem;
