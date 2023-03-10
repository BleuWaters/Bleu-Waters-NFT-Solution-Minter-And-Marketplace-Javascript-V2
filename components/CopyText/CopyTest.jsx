import React, { useState, useRef } from "react";
import classes from "./CopyText.module.css";
import CopyIcon from "../../assets/icon-copy.svg";

const CopyText = ({ message, children }) => {
  const [copied, setCopy] = useState(false);

  const copyRef = useRef(null);

  const handleCopy = (props) => {
    const { navigator, copy } = props;
    copy.select();
    copy.setSelectionRange(0, 99999); /* For mobile devices */
    navigator.clipboard.writeText(copy.value);
  };

  return (
    <div
      className={classes.container}
      onMouseDown={() => setCopy(true)}
      onMouseUp={() => setCopy(false)}
      onClick={() => handleCopy({ navigator, copy: copyRef.current })}
    >
      {children}
      <CopyIcon className={`${classes.copyIcon} ${copied && classes.active}`} />
      <input
        style={{ display: "none" }}
        ref={copyRef}
        type="text"
        defaultValue={message}
      />
    </div>
  );
};

export default CopyText;
