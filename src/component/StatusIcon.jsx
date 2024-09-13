import React from 'react';
import { FaExclamationCircle, FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { RxHalf2 } from "react-icons/rx";
import { MdCancel } from "react-icons/md";


const StatusIcon = ({val}) => {
  let content;
  if (val.includes("anc")) {
    content = <MdCancel color='#93A1B2'/>
  } else if (val.includes("ack")) {
    content = <FaExclamationCircle color='#FC7840'/>
  } else if (val.includes("odo")) {
    content = <FaRegCircle color='#93A1B2'/>
  } else if (val.includes("rog")) {
    content = <RxHalf2 color='#f1c841'/>
  } else {
    content = <FaCheckCircle color='#5E6AD2'/>
  }

  return (
    <div>
      {content}
    </div>
  );
};

export default StatusIcon;
