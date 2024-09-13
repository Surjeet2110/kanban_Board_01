import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import './Main.css';
import TopBarModal from '../component/TopBarModal';
import Card from '../component/Card';
import axios from 'axios';
import TopBarBtn from "../component/TopBarBtn";
import { BsPlusLg, BsThreeDots } from "react-icons/bs";
import { AiFillCheckCircle } from "react-icons/ai";
import { capitalizeWords, priorityToName } from '../utility/util';
import PriorityIcon from "../component/PriorityIcon";
import StatusIcon from "../component/StatusIcon";
import { processString } from '../utility/util';
import Avatar from "../component/Avatar";
import Footer from "../component/Footer";

const Main = () => {
    const reduxState = useSelector((state) => state.changeTheState);

    const [localdata, setLocalData] = useState(reduxState.selectedOption);
    const [localdata2, setLocalData2] = useState(reduxState.selectedOption2);

    const sendLocalData = (localdata) => {
        setLocalData(localdata);
    };

    const sendLocalData2 = (localdata) => {
        setLocalData2(localdata);
    };

    const apiUrl = 'https://api.quicksell.co/v1/internal/frontend-assignment';

    const [post, setPost] = useState(null);
    const [groupedData, setGroupedData] = useState(null);

    useEffect(() => {
        let isMounted = true;

        axios.get(apiUrl).then((response) => {
            if (isMounted) {
                setPost(response.data);
            }
        });

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (post) {
            const groupedArrays = {
                status: post.tickets.reduce((acc, obj) => {
                    const userInfo = post.users.find(user => user.id === obj.userId);
                    obj.name = userInfo.name;
                    obj.available = userInfo.available;
                    const status = obj.status;
                    if (!acc[status]) {
                        acc[status] = [];
                    }
                    acc[status].push(obj);
                    return acc;
                }, {}),
                priority: post.tickets.reduce((acc, obj) => {
                    const userInfo = post.users.find(user => user.id === obj.userId);
                    obj.name = userInfo.name;
                    obj.available = userInfo.available;
                    const priority = obj.priority;
                    if (!acc[priority]) {
                        acc[priority] = [];
                    }
                    acc[priority].push(obj);
                    return acc;
                }, {}),
                user: post.tickets.reduce((acc, obj) => {
                    const userId = obj.userId;
                    if (!acc[userId]) {
                        acc[userId] = [];
                    }
                    acc[userId].push(obj);
                    return acc;
                }, {}),
            };
            const updatedGroupedArraysUser = Object.keys(groupedArrays.user).reduce((acc, key) => {
                const userId = key;
                const userPost = post.users.find(user => user.id === userId);

                if (userPost) {
                    acc[userPost.name] = groupedArrays.user[key].map(ticket => ({
                        ...ticket,
                        available: userPost.available,
                        name: userPost.name
                    }));
                }

                return acc;
            }, {});

            groupedArrays.user = updatedGroupedArraysUser;
            setGroupedData(groupedArrays);
        }
    }, [post]);

    const selectedOption = localdata;
    const selectedOptionArr = groupedData?.[selectedOption];

    if (localdata2 === 'order-priority') {
        const data = selectedOptionArr;
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                data[key] = data[key].sort((a, b) => b.priority - a.priority);
            }
        }
    } else if (localdata2 === 'title') {
        const data = selectedOptionArr;
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                data[key] = data[key].sort((a, b) => a.title.localeCompare(b.title));
            }
        }
    }

    const [displayBox, setDisplayBox] = useState(false);
    const sendDisplayBox = (temp) => {
        setDisplayBox(temp);
    };

    const topBarBtnRef = React.useRef();

    return (
        <div className="main-wrapper">
            <div className="main-wrapper__top">
                <TopBarBtn sendDisplayBox={sendDisplayBox} displayBox={displayBox} reff={topBarBtnRef} />
                {displayBox ? (
                    <TopBarModal displayBox={displayBox} reff={topBarBtnRef} sendDisplayBox={sendDisplayBox} sendLocalData={sendLocalData} sendLocalData2={sendLocalData2} />
                ) : null}
            </div>
            <div className="main-wrapper__bottom">
                {selectedOptionArr && Object.entries(selectedOptionArr).map(([key, value], index) => (
                    <div key={index} className="main-wrapper__bottom__column">
                        <div className="main-wrapper__bottom__column__heading">
                            <div className="main-wrapper__bottom__column__heading__front">
                                <div className="main-wrapper__bottom__column__heading__front__icon">{
                                    localdata === "status" ? <StatusIcon val={key} /> : localdata === "priority" ? <PriorityIcon val={parseInt(key)} /> : <Avatar data={processString(key)} available={selectedOptionArr[key]?.[0].available} />
                                }</div>
                                <div className="main-wrapper__bottom__column__heading__front__key">
                                    {
                                        localdata === "status" ? capitalizeWords(key) : localdata === "priority" ? priorityToName(key) : capitalizeWords(key)
                                    }
                                </div>
                                <div className="main-wrapper__bottom__column__heading__front__val">{value.length}</div>
                            </div>
                            <div className="main-wrapper__bottom__column__heading__back" style={{ color: "grey" }}>
                                <div className="main-wrapper__bottom__column__heading__back__plus"><BsPlusLg /></div>
                                <div><BsThreeDots /></div>
                            </div>
                        </div>
                        {value.map((elem, index) => (
                            <Card key={index} data={elem} />
                        ))}
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default Main;
