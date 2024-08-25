import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TransportControl } from "../../components/TransportControl/TransportControl.jsx";
import { ClipList } from "../../components/ClipList/ClipList.jsx";
import store from "../../app/store.js";

import {
    fetchClipList,
    selectClipById,
    playDeck,
    stopDeck,
    nextClip,
    prevClip,
} from "./hyperdeckThunks.js";
import { hyperdeckSlice } from "./hyperdeckSlice.js";

const { toggleLoopState, setClipNumber } = hyperdeckSlice.actions

export const Hyperdeck = () => {
    const dispatch = useDispatch();
    let { currentClip, clipList, loopStatus, loading, error } =
        useSelector((state) => state.hyperdeck);

    const dispatchFetchClipList = async () => {
        try {
            const response = await dispatch(fetchClipList());
            if (response) {
                return response;
            } else {
                return <h1>ERROR</h1>;
            }
        } catch (err) {
            console.log(err);
        }
    };

    const dispatchOnSelectClip = () => {
        dispatch(selectClipById(currentClip));
    };

    const dispatchToggleLoopState = () => {
        store.dispatch(toggleLoopState());
    }

    const dispatchPrevClip = async () => {
        try {
            const response = await dispatch(prevClip());
            return response;
        } catch (err) {
            console.log(err);
        }
    };

    const dispatchNextClip = async () => {
        try {
            const response = await dispatch(nextClip());
            return response;
        } catch (err) {
            console.log(err);
        }
    };

    const dispatchPlayDeck = async () => {
        try {
            const response = await dispatch(playDeck(loopStatus));
            return response;
        } catch (err) {
            console.log(err);
        }
    };

    const dispatchLoopPlayDeck = async () => {
        try {
            const response = await dispatch(loopPlayDeck());
            return response;
        } catch (err) {
            console.log(err);
        }
    };

    const dispatchStopDeck = async () => {
        try {
            const response = await dispatch(stopDeck());
            return response;
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const response = dispatchFetchClipList();
        if (!response) {
            return <h1>ERROR</h1>
        }
        if (loading === "pending") {
            return (
                <>
                    <h1>LOADING</h1>
                </>
            );
        }

        if (error) {
            return (
                <>
                    <h1>ERROR</h1>
                </>
            );
        }
    }, [dispatch]);

        return (
            <>
                <TransportControl
                    isLooping={loopStatus}
                    onLoopToggle={dispatchToggleLoopState}
                    onPlay={dispatchPlayDeck}
                    onLoopPlay={dispatchLoopPlayDeck}
                    onStop={dispatchStopDeck}
                    onNext={dispatchNextClip}
                    onPrev={dispatchPrevClip}
                ></TransportControl>

                <ClipList
                    setClipNumber={setClipNumber}
                    clipNumber={currentClip}
                    clipList={clipList}
                    onSelectClip={dispatchOnSelectClip}
                ></ClipList>
            </>
        );
    }
