// noinspection SpellCheckingInspection

import {Socket} from "net";
import {jsonifyHyperdeck} from "./utils/jsonUtils.js";
import { errorDelegation } from "./hyperdeckErrors.js";

class Hyperdeck {
    #client;
    #name;
    #hostAddress;
    #clipListString;
    #clipList;
    #buffer;

    getClient() {
        return this.#client;
}

    /**
     * Instantiates a new Hyperdeck object.
     * @constructor
     * @param {string} hostAddress - The IP address of the Hyperdeck unit.
     * @param {string} name - The desired name of the Hyperdeck unit.
     */
    constructor(hostAddress = "10.61.57.141", name = "Hyperdeck") {
        this.#client = new Socket();
        this.#client.setEncoding("utf8");
        this.#hostAddress = hostAddress;
        this.#name = name;
        this.#clipListString = "";
        this.#clipList = [];
    }

    /**
     * Cleans all data active listeners on the client.
     * @function cleanListeners
     */
    cleanListeners() {
        this.#client.removeAllListeners("data");
    }

    /**
     * Connects to a Hyperdeck and confirms communication, status, and protocol version.
     * @function startConnection
     * @returns {Promise<Object>} An object contianing response information confirming communication, status, and protocol version.
     */
    async startConnection() {
        return new Promise(resolve => {
            try {
                this.#client.connect({port: 9993, host: this.#hostAddress});
                this.#client.on("data", data => {
                    const response = jsonifyHyperdeck(data);
                    if (response.code >= 100 || response.code < 200) {
                        throw errorDelegation(response.code);
                    }
                    resolve(response);
                })
            } catch (err) {
                return Promise.reject(err);
            }
        })
    }

    /**
     * Queries the trasnsport status of the Hyperdeck.
     * @function getStatus
     * @returns {Promise<Object>} An object contianing response information confirming the transport status of the Hyperdeck.
     */
    async getStatus() {
        this.#buffer = "";
        return new Promise(resolve => {
            try {
                this.#client.write("transport info\n");
                this.#client.on("data", data => {
                    const response = jsonifyHyperdeck(this.#buffer);
                    if (response.code >= 100 || response.code < 200) {
                        throw errorDelegation(response.code);
                    }
                    resolve(response);
                })
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
        let buffer;
        return new Promise(resolve => {
            this.#client.write("clips get\n");
            this.#client.on("data", data => {
                buffer += data.toString("utf-8");
                // TODO: Test this
                if (buffer.includes("\r\n\r\n")) {
                    console.warn(buffer);
                    const response = jsonifyHyperdeck(buffer);
                    resolve(response);
                }
            });
            // Old implementation relied on a two-second timeout:
            // this.#client.setTimeout(2000, () => {
            //     console.warn(buffer);
            //     const response = jsonifyHyperdeck(buffer);
            //     resolve(response);
        });
    };


    async closeConnection() {
        return new Promise(resolve => {
            this.#client.write("quit\n");
            this.#client.on("data", data => {
                const response = jsonifyHyperdeck(data);
                resolve(response);
            });
        })

    }

    async playClip() {
        return new Promise(resolve => {
            this.#client.write("play\n");
            this.#client.on("data", data => {
                const response = jsonifyHyperdeck(data);
                resolve(response);
            });
        })
    }

    async stopClip() {
        return new Promise(resolve => {
            this.#client.write("stop\n");
            this.#client.on("data", data => {
                const response = jsonifyHyperdeck(data);
                resolve(response);
            });
        })
    }

    async nextClip() {
        return new Promise(resolve => {
            this.#client.write("goto: clip id: +1\n");
            this.#client.on("data", data => {
                const response = jsonifyHyperdeck(data);
                resolve(response);
            });
        })

    }

    async prevClip() {
        return new Promise(resolve => {
            this.#client.write("goto: clip id: -1\n");
            this.#client.on("data", data => {
                const response = jsonifyHyperdeck(data);
                resolve(response);
            });
        })
    }

    async loopPlay() {
        return new Promise(resolve => {
            this.#client.write("play: loop: true single clip: true\n");
            this.#client.on("data", data => {
                const response = jsonifyHyperdeck(data);
                resolve(response);
            });
        });
    }

    async cueClip(clipId) {
        return new Promise(resolve => {
            this.#client.write(`goto: clip id: ${clipId}\n`);
            this.#client.on("data", data => {
                const response = jsonifyHyperdeck(data);
                resolve(response);
            });
        });
    }

    async liveInput() {
        return new Promise(resolve => {
            this.#client.write("preview: enable: true\n");
            this.#client.on("data", data => {
                const response = jsonifyHyperdeck(data);
                resolve(response);
            });
        });
    }
}

export default Hyperdeck;
