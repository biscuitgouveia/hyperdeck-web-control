import React, { useState, useEffect } from "react";
import styles from './TransportControl.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop, faBackwardStep, faForwardStep, faRepeat } from '@fortawesome/free-solid-svg-icons'

export function TransportControl({ isLooping, onLoopToggle, onPrev, onStop, onPlay, onNext, onLoopPlay }) {

    const [loopButtonStyle, setLoopButtonStyle] = useState(styles.loopButtonTrue);

    useEffect(() => {
        if (isLooping === false) {
            setLoopButtonStyle(styles.loopButtonFalse);
        } else if (isLooping === true) {
            setLoopButtonStyle(styles.loopButtonTrue);
        }
    }, [isLooping]);

    return (
        <>
            <div>
                <button className={styles.transportButton} onClick={onPrev}><FontAwesomeIcon icon={faBackwardStep} /></button>
                <button className={styles.transportButton} onClick={onStop}><FontAwesomeIcon icon={faStop} /></button>
                <button className={styles.transportButton} onClick={onPlay}><FontAwesomeIcon icon={faPlay} className={styles.icon} /></button>
                <button className={styles.transportButton} onClick={onNext}><FontAwesomeIcon icon={faForwardStep} /></button>
                <button className={loopButtonStyle} onClick={onLoopToggle}><FontAwesomeIcon icon={faRepeat} /></button>
            </div>
        </>
    );
};