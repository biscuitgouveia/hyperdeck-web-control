import { errorDelegation } from "./hyperdeckErrors.js";

export const hyperdeckApi = {
    API_ROOT: "http://localhost:4000",
    /**
     * Sends a command to the Hyperdeck to cue a clip with by ID.
     * @function selectClip
     * @param {number} clipId - ID of the clip to be cued.
     * @returns {Promise<Response>} Response from Hyperdeck if the request resolves correctly.
     * @throws {HyperdeckClipNotFoundError} When a nonexistent clip number is entered.
     */
    async selectClip(clipId) {
        try {
            const response = await fetch(`${this.API_ROOT}/cue?id=${clipId}`);
            const responseData = await response.json();
            if (responseData.data.code > 99 && responseData.data.code < 200) {
                throw errorDelegation(responseData.data.code);
            } else {
                return responseData;
            }
        } catch (err) {
            return Promise.reject(err);
        }
    },
    /**
     * Retrieves a list of clips loaded on the Hyperdeck.
     * @function getClipList
     * @returns {Promise<Array>} Returns an array of clip objects where the key is an integer and the value is the clip title.
     */
    async getClipList() {
       // try {
            const response = await fetch(`${this.API_ROOT}/cliplist`);
            if (response) {
                const json = await response.json();
                const data = Object.entries(json["data"]["clips info:"]).map(([key, value]) => ([Number(key), value]));
                return data;
            }
        // } catch (err) {
        //     const error = new Error("Unable to connect to Hyperdeck", {
        //         name: "cannotConnectToHyperdeck",
        //         cause: err
        //     });
        //     console.error(
        //         "Caught error:",
        //         error.name,
        //         error.message,
        //         error.cause
        //     );
        //     return error;
        // }
    },
    /**
     * Plays the currently cued clip on a loop or plays all clips starting from the currently cued clip.
     * @function playDeck
     * @param {Boolean} loopStatus - Current state of the Hyperdeck loop setting.
     * @returns {Promise<Response>} Response from Hyperdeck if the request resolves correctly.
     */
    async playDeck(loopStatus) {
        try {
            if (loopStatus) {
                const response = await fetch(`${this.API_ROOT}/loopplay`);
                return response;
            } else {
                const response = await fetch(`${this.API_ROOT}/play`);
                return response;
            }
        } catch (err) {
            return err;
        }
    },
    /**
     * Stops the currently playing clip.
     * @returns {Promise<Response>} Response from Hyperdeck if the request resolves correctly.
     */
    async stopDeck() {
        try {
            const response = await fetch(`${this.API_ROOT}/stop`);
            return response;
        } catch (err) {
            return err;
        }
    },
    /**
     * Skips to the next clip on the Hyperdeck. The current play state applies to the clip.
     * @returns {Promise<Response>} Response from Hyperdeck if the request resolves correctly.
     */
    async nextClip() {
        try {
            const response = await fetch(`${this.API_ROOT}/nextclip`);
            return response;
        } catch (err) {
            return err;
        }
    },
    /**
     * Skips to the previous clip on the Hyperdeck or to the start of the current clip. The current play state applies to the clip.
     * @returns {Promise<Response>} Response from Hyperdeck if the request resolves correctly.
     */
    async prevClip() {
        try {
            const response = await fetch(`${this.API_ROOT}/prevclip`);
            return response;
        } catch (err) {
            return err;
        }
    },
    /**
     * Future plan. Passes through the current SDI input to the output.
     * @returns {Promise<Response>} Response from Hyperdeck if the request resolves correctly.
     */
    async liveInput() {
        try {
            const response = await fetch(`${this.API_ROOT}/liveInput`);
            return response;
        } catch (err) {
            return err;
        }
    }
};
