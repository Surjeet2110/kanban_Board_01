import React from 'react'
import './Card.css'
import Avatar from './Avatar'
import { GoDotFill } from 'react-icons/go'
import { BsThreeDots } from 'react-icons/bs'
import { capitalizeWords } from '../utility/util'
import PriorityIcon from './PriorityIcon'
import { processString } from '../utility/util'

const Card = (props) => {
    const { id, title, tag, priority } = props.data
    return (
        <div className='card__wrapper'>
            <div className='card__wrapper__id'>
                <div className='card__wrapper__id__left'>{id}</div>
                <div className='card__wrapper__id__pfp'>
                    <Avatar data={processString(props.data?.name)} available={props.data?.available}/>
                </div>
            </div>
            <div className='card__wrapper__title' title={title}>{title.length > 84 ? title.substring(0, 84) + "..." : title}</div>
            <div className='card__wrapper__bottom'>
                <div className='card__wrapper__bottom__icon'>
                    <PriorityIcon val={priority} />
                </div>
                {tag?.map((val, idx) => (
                    <div key={idx} className='card__wrapper__bottom__tag'>
                        <div className='card__wrapper__bottom__tag__icon'><GoDotFill /></div>
                        <div>{val}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Card