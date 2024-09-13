import React, { useEffect, useState } from "react";
import './TopBarModal.css';
import { useDispatch, useSelector } from "react-redux";
import { setSelectedOption, setSelectedOption2 } from "../actions";

const TopBarModal = (props) => {
  const dispatch = useDispatch();
  const selectedOptionRedux = useSelector((state) => state.changeTheState.selectedOption);
  const selectedOption2Redux = useSelector((state) => state.changeTheState.selectedOption2);
  const [selectedOption, setSelectedOptionState] = useState(selectedOptionRedux);
  const [selectedOption2, setSelectedOptionState2] = useState(selectedOption2Redux);


  useEffect(() => {
    setSelectedOptionState(selectedOptionRedux);

    setSelectedOptionState2(selectedOption2Redux);
  }, [selectedOptionRedux, selectedOption2Redux]);

  const elementRef = React.useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        if (props.reff.current && !props.reff.current.contains(event.target)) {
          props.sendDisplayBox(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOptionState(selectedValue);
    props.sendLocalData(selectedValue);
    dispatch(setSelectedOption(selectedValue));
  };

  const handleSelectChange2 = (event) => {
    const selectedValue = event.target.value;
    setSelectedOptionState2(selectedValue);
    props.sendLocalData2(selectedValue);
    dispatch(setSelectedOption2(selectedValue));
  };

  return (
    <div className="top-bar-modal__wrapper" ref={elementRef}>
      <div className="top-bar-modal__container">
        <div className="top-bar-modal__label">Grouping</div>
        <select
          className="top-bar-modal__container__select"
          id="group"
          onChange={handleSelectChange}
          value={selectedOption}
        >
          <option className="top-bar-modal__container__option" value="status">Status</option>
          <option className="top-bar-modal__container__option" value="priority">Priority</option>
          <option className="top-bar-modal__container__option" value="user">User</option>
        </select>
      </div>
      <div className="top-bar-modal__container">
        <div className="top-bar-modal__label">Ordering</div>
        <select
          className="top-bar-modal__container__select"
          id="order"
          onChange={handleSelectChange2}
          value={selectedOption2}
        >
          <option className="top-bar-modal__container__option" value="order-priority">Priority</option>
          <option className="top-bar-modal__container__option" value="title">Title</option>
        </select>
      </div>
    </div>
  );
};

export default TopBarModal;
