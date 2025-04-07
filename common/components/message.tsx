'use clinet';
import React from 'react';
import type * as CSS from 'csstype';

interface Style extends CSS.Properties, CSS.PropertiesHyphen {}

const contentStyke: Style = {
  'padding': '16px',
};

const style: Style = {
  'display': 'flex',
  'align-items': 'center',
  'justify-content': 'center',
  'flex-direction': 'column',
};

interface Prop {
  header?: string;
  message: string;
}

const Message = ({ header = '', message }: Prop) => {
  return (
    <div className="message-content" style={contentStyke}>
      <div style={style}>
        {message && <h4>{message}</h4>}
        {!message && <h4>{'Something went wrong!'}</h4>}
      </div>
    </div>
  );
};

export default Message;
