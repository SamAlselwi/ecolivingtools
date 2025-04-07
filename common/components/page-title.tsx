'use clinet';
import '@/common/styles/page-title.scss';
import React from 'react';

interface Prop {
  header?: string;
  eleKey: string;
}

const PageTitle = ({ header = '', eleKey }: Prop) => {

  return (
    <div className="page-header" key={`page-header-${eleKey}`}>
      <div className="page-header__container container" key={`page-header-${eleKey}-container`}>
        {header && (
          <div className="page-header__title" key={`page-header-${eleKey}-page-title`}>
            <h1 className='text-4xl font-bold'>{header}</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageTitle;
