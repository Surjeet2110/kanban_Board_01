import React from "react";
import './Avatar.css'
const Avatar=(props)=>{

    function stringToHslColor(str, s, l) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  var h = hash % 360;
  return 'hsl('+h+', '+s+'%, '+l+'%)';
}
    return(
        <div className="avatar__circle" style={{ backgroundColor: stringToHslColor(props.data.toLowerCase(), 75, 45) }}>
            <span className="avatar__circle__initials">{props.data}</span>
            {props.available ? (<span className="avatar__circle__status__active"></span>):(<span className="avatar__circle__status__inactive"></span>)}
        </div>
    )
}
export default Avatar