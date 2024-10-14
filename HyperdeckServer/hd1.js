import Hyperdeck from "./Hyperdeck.js";

export const initHyperdeck = async () => {
    const hd1 = new Hyperdeck("10.61.57.142");
    await hd1.startConnection();
    return hd1;
};