import { createSlice } from '@reduxjs/toolkit'
import {
    fetchClipList,
    selectClipById,
    playDeck,
    stopDeck,
    nextClip,
    prevClip
} from './hyperdeckThunks.js'

export const hyperdeckSlice = createSlice({
  name: 'hyperdeck',
  initialState: {
    code: 0,
    transportStatus: 'stopped',
    speed: 0,
    slotId: 1,
    clipId: 0,
    clipTitle: null,
    singleClip: true,
    loopStatus: false,
    videoFormat: '1080i50',
    clipList: [],
    loading: 'idle',
    currentRequestId: undefined,
    error: null
  },
  reducers: {
    setClipNumber (state, action) {
      try {
        state.currentClip = action.payload
        console.log(state.currentClip)
      } catch (error) {
        console.log(error)
      }
    },
    toggleLoopState (state) {
      if (state.loopStatus == true) {
        state.loopStatus = false
      } else if (state.loopStatus == false) {
        state.loopStatus = true
      } else {
        throw new Error('Unexpected Error in toggleLoopState()')
      }
    }
  },
  extraReducers: builder => {
    builder
            // fetchClipList Cases
            .addCase(fetchClipList.pending, (state, action) => {
              if (state.loading === 'idle') {
                state.loading = 'pending'
                state.currentRequestId = action.meta.requestId
              }
            })
            .addCase(fetchClipList.fulfilled, (state, action) => {
              const { requestId } = action.meta
              if (action.payload instanceof Error) {
                state.error = true
                return
              }
              if (
                    state.loading === 'pending' &&
                    state.currentRequestId === requestId
                ) {
                state.loading = 'idle'
                state.clipList = action.payload
                state.currentRequestId = undefined
                console.log(state)
              }
            })
            .addCase(fetchClipList.rejected, (state, action) => {
              const { requestId } = action.meta
              if (
                    state.loading === 'pending' &&
                    state.currentRequestId === requestId
                ) {
                state.loading = 'idle'
                state.error = action.error
                state.currentRequestId = undefined
              }
            })
            // selectClipById Cases
            .addCase(selectClipById.pending, (state, action) => {
              if (state.loading === 'idle') {
                state.loading = 'pending'
                state.currentRequestId = action.meta.requestId
              }
            })
            .addCase(selectClipById.fulfilled, (state, action) => {
              const { requestId } = action.meta
              if (
                    state.loading === 'pending' &&
                    state.currentRequestId === requestId
                ) {
                state.loading = 'idle'
                    // state.currentClip = action.payload.data["transport info"]["clip id"];
                state.currentRequestId = undefined
              }
            })
            .addCase(selectClipById.rejected, (state, action) => {
              const { requestId } = action.meta
              if (
                    state.loading === 'pending' &&
                    state.currentRequestId === requestId
                ) {
                state.loading = 'idle'
                state.error = action.error
                state.currentRequestId = undefined
              }
            })
            // playDeck Cases
            .addCase(playDeck.pending, (state, action) => {
              if (state.loading === 'idle') {
                state.loading = 'pending'
                state.currentRequestId = action.meta.requestId
              }
            })
            .addCase(playDeck.fulfilled, (state, action) => {
              const { requestId } = action.meta
              if (
                    state.loading === 'pending' &&
                    state.currentRequestId === requestId
                ) {
                state.loading = 'idle'
                state.currentRequestId = undefined
              }
            })
            .addCase(playDeck.rejected, (state, action) => {
              const { requestId } = action.meta
              if (
                    state.loading === 'pending' &&
                    state.currentRequestId === requestId
                ) {
                state.loading = 'idle'
                state.error = action.error
                state.currentRequestId = undefined
              }
            })
            // stopDeck Cases
            .addCase(stopDeck.pending, (state, action) => {
              if (state.loading === 'idle') {
                state.loading = 'pending'
                state.currentRequestId = action.meta.requestId
              }
            })
            .addCase(stopDeck.fulfilled, (state, action) => {
              const { requestId } = action.meta
              if (
                    state.loading === 'pending' &&
                    state.currentRequestId === requestId
                ) {
                state.loading = 'idle'
                state.currentRequestId = undefined
              }
            })
            .addCase(stopDeck.rejected, (state, action) => {
              const { requestId } = action.meta
              if (
                    state.loading === 'pending' &&
                    state.currentRequestId === requestId
                ) {
                state.loading = 'idle'
                state.error = action.error
                state.currentRequestId = undefined
              }
            })
            // nextClip Cases
            .addCase(nextClip.pending, (state, action) => {
              if (state.loading === 'idle') {
                state.loading = 'pending'
                state.currentRequestId = action.meta.requestId
              }
            })
            .addCase(nextClip.fulfilled, (state, action) => {
              const { requestId } = action.meta
              if (
                    state.loading === 'pending' &&
                    state.currentRequestId === requestId
                ) {
                state.loading = 'idle'
                state.currentRequestId = undefined
              }
            })
            .addCase(nextClip.rejected, (state, action) => {
              const { requestId } = action.meta
              if (
                    state.loading === 'pending' &&
                    state.currentRequestId === requestId
                ) {
                state.loading = 'idle'
                state.error = action.error
                state.currentRequestId = undefined
              }
            })
            // prevClip Cases
            .addCase(prevClip.pending, (state, action) => {
              if (state.loading === 'idle') {
                state.loading = 'pending'
                state.currentRequestId = action.meta.requestId
              }
            })
            .addCase(prevClip.fulfilled, (state, action) => {
              const { requestId } = action.meta
              if (
                    state.loading === 'pending' &&
                    state.currentRequestId === requestId
                ) {
                state.loading = 'idle'
                state.currentRequestId = undefined
              }
            })
            .addCase(prevClip.rejected, (state, action) => {
              const { requestId } = action.meta
              if (
                    state.loading === 'pending' &&
                    state.currentRequestId === requestId
                ) {
                state.loading = 'idle'
                state.error = action.error
                state.currentRequestId = undefined
              }
            })
  }
})


export const { setClipNumber, toggleLoopState } = hyperdeckSlice.actions

export default hyperdeckSlice.reducer
