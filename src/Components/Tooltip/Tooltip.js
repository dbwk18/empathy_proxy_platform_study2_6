import React from "react";
import "./tooltip.css";

export const Tooltip = ({label, hover, xpos, ypos, content}) => {

  return (
    <React.Fragment>
      {label === hover && content && content[label] &&
        <div className="tooltip" style={{left: `${xpos}px`, top: `${ypos}px`}}>
            <div className="tooltip-arrow"/>
            <div className="tooltip-label">{content[label]}</div>
        </div>
      }
    </React.Fragment>
  );
};
