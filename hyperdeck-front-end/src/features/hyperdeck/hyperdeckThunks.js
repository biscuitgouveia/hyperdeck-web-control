import { createAsyncThunk } from "@reduxjs/toolkit";
import { hyperdeckApi } from "../../api/hyperdeckApi.js";
import { HyperdeckClipNotFoundError, HyperdeckDiskError, HyperdeckNoDiskError } from "../../api/hyperdeckErrors.js";

export const fetchClipList = createAsyncThunk(
    "hyperdeck/fetchClipList",
    async (arg, thunkAPI) => {
        const { currentRequestId, loading } = thunkAPI.getState().hyperdeck;
        if (loading !== "pending" || thunkAPI.requestId !== currentRequestId) {
            return;
        }
        try {
            const response = await hyperdeckApi.getClipList();
            return response;
        } catch (err) {
            return err;
        }
    }
);

export const selectClipById = createAsyncThunk(
    "hyperdeck/selectClipById",
    async (clipId, thunkAPI) => {
        const { currentRequestId, loading } = thunkAPI.getState().hyperdeck;
        if (loading !== "pending" || thunkAPI.requestId !== currentRequestId) {
            return;
        }
        try {
            const response = await hyperdeckApi.selectClip(clipId);
            switch (response.data.message) {
                case "112 clip not found":
                    throw new HyperdeckClipNotFoundError();
                case "105 no disk":
                    throw new HyperdeckNoDiskError();
                default: return response.data;
            }
        } catch (err) {
            switch (err) {
                case err instanceof HyperdeckClipNotFoundError:
                    err.outputErrorLog();
                    return err;
                    // TODO: Inform user of nonexistent clip
                case err instanceof HyperdeckNoDiskError:
                    err.outputErrorLog();
            }
        }
        
    }
);

export const playDeck = createAsyncThunk(
    "hyperdeck/playDeck",
    async (loopStatus, thunkAPI) => {
        const { currentRequestId, loading } = thunkAPI.getState().hyperdeck;
        if (loading !== "pending" || thunkAPI.requestId !== currentRequestId) {
            return;
        }
        const response = await hyperdeckApi.playDeck(loopStatus);
        return response.data;
    }
);

export const stopDeck = createAsyncThunk(
    "hyperdeck/stopDeck",
    async (arg, thunkAPI) => {
        const { currentRequestId, loading } = thunkAPI.getState().hyperdeck;
        if (loading !== "pending" || thunkAPI.requestId !== currentRequestId) {
            return;
        }
        const response = await hyperdeckApi.stopDeck();
        return response.data;
    }
);

export const nextClip = createAsyncThunk(
    "hyperdeck/nextClip",
    async (arg, thunkAPI) => {
        const { currentRequestId, loading } = thunkAPI.getState().hyperdeck;
        if (loading !== "pending" || thunkAPI.requestId !== currentRequestId) {
            return;
        }
        const response = await hyperdeckApi.nextClip();
        return response.data;
    }
);

export const prevClip = createAsyncThunk(
    "hyperdeck/prevClip",
    async (arg, thunkAPI) => {
        const { currentRequestId, loading } = thunkAPI.getState().hyperdeck;
        if (loading !== "pending" || thunkAPI.requestId !== currentRequestId) {
            return;
        }
        const response = await hyperdeckApi.prevClip();
        return response.data;
    }
);
