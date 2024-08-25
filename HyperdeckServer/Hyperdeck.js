import { json, response } from "express";
import { Socket } from "net";
import { jsonifyHyperdeck } from "./utils/jsonUtils.js";

class Hyperdeck {
  #client;
  #hostAddress;
  #clipListString;
  #clipList;
  #response;
  #buffer;

  constructor(hostAddress = "10.61.57.141") {
    this.#client = new Socket();
    this.#client.setEncoding("utf8");
    this.#hostAddress = hostAddress;
    this.#response = "";
    this.#clipListString = "";
    this.#clipList = [];
  }

  cleanListeners() {
    this.#client.removeAllListeners("data");
  }

  fillBuffer(data) {
    this.#buffer += data;
  }
  /**
   * Connects to a Hyperdeck and confirms communication, status, and protocol version.
   * @function startConnection
   * @public
   * @returns {Promise<JSON>} A JSON formatted response confirming communication, status, and protocol version.
   */
  async startConnection() {
    return new Promise(resolve => {
      this.#client.connect({ port: 9993, host: this.#hostAddress });
      this.#client.on("data", data => {
      const response = jsonifyHyperdeck(data);
      resolve(response);
    })
    })
  }

  async getStatus() {
    this.#buffer = "";
    return new Promise(resolve => {
      this.#client.write("transport info\n");
      this.#client.on("data", data => {
        const response = jsonifyHyperdeck(this.#buffer);
        resolve(response);
      })
      })
    };

  async getClipList() {
    let buffer;
    return new Promise(resolve => {
      this.#client.write("clips get\n");
      this.#client.on("data", data => {
        buffer += data.toString("utf-8");
      });
      this.#client.setTimeout(2000, () => {
        console.warn(buffer);
        const response = jsonifyHyperdeck(buffer);
        resolve(response);
      });
    });
  };

  closeConnection() {
    this.#client.write("quit\n");
    this.#client.on("data", data => {
      const response = jsonifyHyperdeck(data);
      resolve(response);
    });
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

  stopClip() {
    return new Promise(resolve => {
      this.#client.write("stop\n");
      this.#client.on("data", data => {
        const response = jsonifyHyperdeck(data);
        resolve(response);
      });
    })
  }

  async nextClip() {
    return new Promise( resolve => {
      this.#client.write("goto: clip id: +1\n");
      this.#client.on("data", data => {
        const response = jsonifyHyperdeck(data);
        resolve(response);
      });
    })
    
  }

  prevClip() {
    return new Promise( resolve => {
      this.#client.write("goto: clip id: -1\n");
      this.#client.on("data", data => {
        const response = jsonifyHyperdeck(data);
        resolve(response);
      });
    }) 
  }

  loopPlay() {
    return new Promise( resolve => {
      this.#client.write("play: loop: true single clip: true\n");
      this.#client.on("data", data => {
        const response = jsonifyHyperdeck(data);
        resolve(response);
      });
    });
  }

  cueClip(clipId) {
    return new Promise( resolve => {
      this.#client.write(`goto: clip id: ${clipId}\n`);
      this.#client.on("data", data => {
        const response = jsonifyHyperdeck(data);
        resolve(response);
      });
    });
  }

  liveInput() {
      return new Promise( resolve => {
      this.#client.write("preview: enable: true\n");
      this.#client.on("data", data => {
        const response = jsonifyHyperdeck(data);
        resolve(response);
      });
    });
  }
}

export default Hyperdeck;
