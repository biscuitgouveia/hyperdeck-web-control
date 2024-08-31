/**
 * Processes text data from the Hyperdeck Ethernet Protocol into an object literal.
 * @function jsonifyHyperdeck
 * @param input {string} - Text response from the Hyperdeck Ethernet Protocol.
 * @returns {Object} Object literal containing response data ready to be sent in a JSON response.
 */
export function jsonifyHyperdeck(input) {
    let response;

    if (input.substring(0, 9) === "undefined") {
        response = input.slice(9);
    } else {
        response = input;
    }

    // Extract response code
    const code = Number(response.slice(0, 3));
    // TODO: Handle error responses from the Hyperdeck (Codes 100 - 199)
    const body = response
        .slice(4)
        .split("\r\n")
        .filter(item => item.length > 0);

    const topicObject = String(body[0]);
    const data = {};

    for (let i = 1; i < body.length; i++) {
        const itemSplit = body[i].split(": ");

        if (itemSplit[0] === "clip count") {
            continue;
        }
        try {
            data[itemSplit[0]] = itemSplit[1].split(".mov")[0];
        } catch (e) {
            data[itemSplit[0]] = itemSplit[1];
        }
    }

    const output = {
        code: code,
    };

    output[topicObject] = data;

    return output;
}