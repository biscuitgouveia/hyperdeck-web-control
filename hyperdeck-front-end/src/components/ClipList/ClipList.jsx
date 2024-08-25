import React from "react";
import { useDispatch } from "react-redux";
import styles from './ClipList.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export function ClipList({ setClipNumber, clipNumber, clipList, onSelectClip }) {

    const dispatch = useDispatch();
    
    const dispatchSetClipNumber = ({ target }) => {
        console.log(target.value);
        dispatch(setClipNumber(target.value));
    };

    const clipListOptions = clipList.map(item => <option value={item[0]} key={item[0]}>{item[1]}</option>);

    return (
        <>
            <div>
                <select value={clipNumber} className={styles.clipSelect} onChange={dispatchSetClipNumber}>
                    {clipListOptions}
                </select>
                <button className={styles.transportButton} onClick={onSelectClip} value={clipNumber}>
                    <FontAwesomeIcon icon={faCheck} />
                </button>
            </div>
        </>
    )
}