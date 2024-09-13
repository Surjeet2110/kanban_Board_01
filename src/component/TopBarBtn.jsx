import React from "react"
import './TopBarBtn.css'
import { VscSettings } from "react-icons/vsc";
import {BsChevronDown, BsChevronUp} from "react-icons/bs"

const TopBarBtn = (props) => {
    const handleClick = () => {
        props.sendDisplayBox(!props.displayBox)
    }

    
    
    return (
        <div className="topBarBtn" onClick={handleClick} ref={props.reff}>
            <div className="topBarBtn__icon-container">
                <VscSettings className="topBarBtn__icon"/>
            </div>
            
            <button className="topBarBtn__btn">
                Display
            </button>
            <div className="topBarBtn__icon-container">
                {props.displayBox?(<BsChevronUp style={{marginLeft:"0.5rem", fontSize:"0.75rem", fontWeight: 'bold'}}/>):
                (<BsChevronDown style={{marginLeft:"0.5rem", fontSize:"0.75rem"}}/>)}
            </div>
        </div>
    )
}
export default TopBarBtn