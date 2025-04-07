"use clinet";

import React from "react";
import "@/common/styles/page-header.scss";

interface Prop {
  title: string;
  subTitle?: string;
}

const PageHeader = ({ title, subTitle }: Prop) => {
  return (
    <div className="relative">
      <div className="block-header-page">
        <div className="container content">
          <h1 className="text-white">{title}</h1>
          {subTitle && <p className="text-white">{subTitle}</p>}
        </div>
      </div>
      <div className="bottom-arrow"></div>
    </div>
  );
};

export default PageHeader;
