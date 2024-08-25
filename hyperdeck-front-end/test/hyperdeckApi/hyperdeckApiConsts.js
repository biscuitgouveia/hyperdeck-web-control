export const testClipData = {
    status: 200,
    data: {
        code: 205,
        "clips info:": {
            "1": "00 7NEWS LOGO LOOP",
            "2": "01 THE LATEST LOGO LOOP",
            "3": "02 SUNRISE SET MCU",
            "4": "03 NEWSROOM SET MCU",
            "5": "04 4PM SET MCU",
            "6": "05 SUMMER EVENING SET MCU",
            "7": "06 WINTER EVENING SET MCU",
            "8": "07 SUMMER SPORT SET MCU",
            "9": "09 WINTER SPORT SET MCU",
            "10": "10 WINTER SPORT SET OTS"
        }
    }
};

export const testClipOutput = [
    [1, "00 7NEWS LOGO LOOP"],
    [2, "01 THE LATEST LOGO LOOP"],
    [3, "02 SUNRISE SET MCU"],
    [4, "03 NEWSROOM SET MCU"],
    [5, "04 4PM SET MCU"],
    [6, "05 SUMMER EVENING SET MCU"],
    [7, "06 WINTER EVENING SET MCU"],
    [8, "07 SUMMER SPORT SET MCU"],
    [9, "09 WINTER SPORT SET MCU"],
    [10, "10 WINTER SPORT SET OTS"]
];

export const jsonOk = body => {
    const mockResponse = new Response(
        JSON.stringify({
            status: body.status,
            headers: {
                "Content-type": "application/json"
            },
            data: body.data
        })
    );

    return Promise.resolve(mockResponse);
};