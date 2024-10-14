// noinspection SpellCheckingInspection

import {Socket} from "net";
import {jsonifyHyperdeck} from "./utils/jsonUtils.js";
import {errorDelegation} from "./hyperdeckErrors.js";

class Hyperdeck {
    #client;
    #name;
    #hostAddress;
    #clipListString;
    #clipList;
    #buffer;

    get client() {
        return this.#client;
    }

    get hostAddress() {
        return this.#hostAddress;
    }

    set hostAddress(hostAddress) {
        this.#hostAddress = hostAddress;
    }

    get name() {
        return this.#name;
    }

    set name(name) {
        this.#name = name;
    }

    get buffer() {
        return this.#buffer;
    }

    set buffer(buffer) {
        this.#buffer = buffer;
    }

    /**
     * Instantiates a new Hyperdeck object.
     * @constructor
     * @param {string} hostAddress - The IP address of the Hyperdeck unit.
     * @param {string} name - The desired name of the Hyperdeck unit.
     */
    constructor(hostAddress = "10.61.57.142", name = "Hyperdeck") {
        this.#client = new Socket();
        this.#client.setEncoding("utf8");
        this.#hostAddress = hostAddress;
        this.#name = name;
        this.#clipListString = "";
        this.#clipList = [];
    }

    /**
     * Removes all active data listeners on the client.
     * @function cleanListeners
     */
    cleanListeners() {
        this.#client.removeAllListeners("data");
    }

    /**
     * Sets this.#buffer to an empty. Called each time buffer data has been processed to prepare it for the next data stream.
     * @function flushBuffer
     */
    flushBuffer() {
        this.#buffer = "";
    }

    /**
     * After a command is written to a Hyperdeck, this method handles the received datastream and returns a formatted response.
     * @function processHyperdeckData
     * @param {String} data - Text data received from the Hyperdeck Ethernet Control Protocol.
     * @returns {Object} response - An object containing the response data from the Hyperdeck. The object is formatted to be included as part of a JSON response.
     */
    async processHyperdeckData(data) {
        return new Promise(resolve => {
            try {
                this.#buffer += data.toString();
                // TODO: Test this
                console.log("Buffer:", this.#buffer);
                if (this.#buffer.includes("\r\n\r\n") || this.#buffer.includes("200 ok")) {
                    const response = jsonifyHyperdeck(this.#buffer);
                    console.log("Response:", response);
                    if (response.code >= 100 && response.code < 200) {
                        throw errorDelegation(response.code);
                    }
                    resolve(response);
                }
                } catch (e) {
                    return e;
                }
        })
        
    }

    /**
     * Connects to a Hyperdeck and confirms communication, status, and protocol version.
     * @function startConnection
     * @returns {Promise<Object>} An object contianing response information confirming communication, status, and protocol version.
     */
    async startConnection() {
        console.log("one");
        return new Promise(resolve => {
            try {
                console.log("two");
                this.#client.connect({port: 9993, host: this.#hostAddress});
                this.#client.on("data", async data => resolve(await this.processHyperdeckData(data)));
            } catch (err) {
                return Promise.reject(err);
            }
        })
    }

    /**
     * Queries the transport status of the Hyperdeck.
     * @function getStatus
     * @returns {Promise<Object>} An object contianing response information confirming the transport status of the Hyperdeck.
     */
    async getStatus() {
        console.log("here")
        this.#buffer = "";
        return new Promise(resolve => {
            try {
                this.#client.write("transport info\n");
                this.#client.on("data", async data => {
                    resolve(await this.processHyperdeckData(data))});
            } catch (err) {
                return Promise.reject(err);
            }
        })
    };

    /**
     * Queries the Hyperdeck for a list of all clips on the active disk.
     * @function getClipList
     * @returns {Promise<Object>} An object contianing an array of keys and clip titles.
     */
    async getClipList() {
        this.#buffer = "";
        return new Promise(resolve => {
            try {
                this.#client.write("clips get\n");
                this.#client.on("data", async data => resolve(await this.processHyperdeckData(data)));   
            } catch (err) {
                return Promise.reject(err);
            }
        })
    };

    /**
     * Safely disconnects from the Hyperdeck.
     * @function closeConnection
     * @returns {Promise<Object>} An object contianing response information confirming disconnection.
     */
    async closeConnection() {
        this.#buffer = "";
        return new Promise(resolve => {
            this.#client.write("quit\n");
            this.#client.on("data", async data => resolve(await this.processHyperdeckData(data)));
        })
    }

    /**
     * Commands the Hyperdeck to play from the current clip, continuing on to each subsequent clip.
     * @function playClip
     * @returns {Promise<Object>} An object contianing response information confirming the transport status of the Hyperdeck.
     */
    async playClip() {
        this.#buffer = "";
        return new Promise(resolve => {
            try {
                this.#client.write("play\n");
                this.#client.on("data", async data => resolve(await this.processHyperdeckData(data)));   
            } catch (err) {
                return Promise.reject(err);
            }
        })
    }

    /**
     * Commands the Hyperdeck to stop playback and output the current frame.
     * @function stopClip
     * @returns {Promise<Object>} An object contianing response information confirming the transport status of the Hyperdeck.
     */
    async stopClip() {
        this.#buffer = "";
        return new Promise(resolve => {
            this.#client.write("stop\n");
            this.#client.on("data", async data => resolve(await this.processHyperdeckData(data)));
        })
    }

    /**
     * Commands the Hyperdeck to cue the next clip on the disk.
     * @function nextClip
     * @returns {Promise<Object>} An object contianing response information confirming the transport status of the Hyperdeck.
     */
    async nextClip() {
        this.#buffer = "";
        return new Promise(resolve => {
            this.#client.write("goto: clip id: +1\n");
            this.#client.on("data", async data => resolve(await this.processHyperdeckData(data)));
        })
    }

    /**
     * Commands the Hyperdeck to cue the previous clip on the disk.
     * @function prevClip
     * @returns {Promise<Object>} An object contianing response information confirming the transport status of the Hyperdeck.
     */
    async prevClip() {
        this.#buffer = "";
        return new Promise(resolve => {
            this.#client.write("goto: clip id: -1\n");
            this.#client.on("data", async data => resolve(await this.processHyperdeckData(data)));
        })
    }

    /**
     * Commands the Hyperdeck to play the currently cued clip and loop it indefinitely.
     * @function loopPlay
     * @returns {Promise<Object>} An object contianing response information confirming the transport status of the Hyperdeck.
     */
    async loopPlay() {
        this.#buffer = "";
        return new Promise(resolve => {
            this.#client.write("play: loop: true single clip: true\n");
            this.#client.on("data", async data => resolve(await this.processHyperdeckData(data)));
        });
    }

    /**
     * Commands the Hyperdeck to cue the clip corresponding to the clipId parameter.
     * @function cueCLip
     * @param {Number} clipId
     * @returns {Promise<Object>} An object contianing response information confirming the transport status of the Hyperdeck.
     */
    async cueClip(clipId) {
        this.#buffer = "";
        // TODO: Handle invalid clipId
        return new Promise(resolve => {
            this.#client.write(`goto: clip id: ${clipId}\n`);
            this.#client.on("data", async data => resolve(await this.processHyperdeckData(data)));
        });
    }

    /**
     * Commands the Hyperdeck to pass the SDI input to the SDI output.
     * @function liveInput
     * @returns {Promise<Object>} An object contianing response information confirming the transport status of the Hyperdeck.
     */
    async liveInput() {
        this.#buffer = "";
        return new Promise(resolve => {
            this.#client.write("preview: enable: true\n");
            this.#client.on("data", async data => resolve(await this.processHyperdeckData(data)));
        });
    }
}

export default Hyperdeck;
