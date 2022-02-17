import React from "react";
import "./Ticker.scss";

export const Ticker = ({ data, comparison }) => {
  const arrowDown = (
    <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path>
  );

  const arrowUp = (
    <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path>
  );

  let arrowIcon = (
    <path d="M16.79 7.79l-1.41 1.42L17.17 11H3v2h14.17l-1.79 1.79 1.41 1.42L21 12z"></path>
  );

  let color = "color_default";
  let sign;

  if (comparison !== undefined) {
    color = comparison ? "color_fall" : "color_grow";
    sign = comparison ? "-" : "+";
    arrowIcon = comparison ? arrowDown : arrowUp;
  }

  return (
    <div className={`ticker_item ${color}`}>
      <span className="ticker_item_heading">{data.exchange}</span>
      <div className="ticker_item_wrapper">
        <span>
          <div>
            <div className={`ticker_item_icon ${color}`}>
              <span className="ticker_item_icon-container" aria-hidden="true">
                <svg
                  focusable="false"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  className="ticker_item_icon-container arrow"
                >
                  {arrowIcon}
                </svg>
              </span>
            </div>
          </div>
        </span>
        <div className="ticker_item_main">
          <div className="ticker_item_main_name">{data.ticker}</div>
          <div className="ticker_item_main_price">{data.price}</div>
        </div>
        <div className="ticker_item_changes">
          <span>
            {sign}
            {data.change_percent}%
          </span>
          <span>
            {sign}
            {data.change}
          </span>
        </div>
      </div>
    </div>
  );
};
