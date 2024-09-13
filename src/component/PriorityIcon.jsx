import React from 'react';

import {BsThreeDots, BsFillExclamationSquareFill} from 'react-icons/bs'
import {MdOutlineSignalCellular4Bar, MdSignalCellular3Bar, MdSignalCellular1Bar} from 'react-icons/md'
const PriorityIcon = ({val}) => {
  let content;
  if (val === 0) {
    content = <BsThreeDots color='#93A1B2'/>
  } else if (val === 4) {
    content = <BsFillExclamationSquareFill />
  } else if (val === 1) {
    content = <MdSignalCellular1Bar/>
  } else if (val === 2) {
    content = <MdSignalCellular3Bar/>
  } else {
    content = <MdOutlineSignalCellular4Bar/>
  }

  return (
    <div>
      {content}
    </div>
  );
};

export default PriorityIcon;
