import React, { useEffect, useRef } from "react";

import "./Options_Board.css";

function Options_Board(props) {

    const optionRef = useRef()
  const handleClick = (event) => {
    if (optionRef && event && event.target && !optionRef.current.contains(event.target)) {
      if (props.onClose) {
        props.onClose();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return (
    <div
      ref={optionRef}
      className={`option custom-scroll ${props.class ? props.class : ""}`}
    >
      {props.children}
    </div>
  );
}

export default Options_Board;
