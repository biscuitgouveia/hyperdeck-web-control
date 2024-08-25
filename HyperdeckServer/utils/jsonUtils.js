export function jsonifyHyperdeck(input) {
    let response;
    if (input.substring(0, 3) === "und") {
        response = input.slice(9);
    } else {
        response = input;
    }

    const code = Number(response.slice(0, 3));

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
        code: code
    };

    output[topicObject] = data;

    return output;
}

const testClipData = {
    "status": 200,
    "data": {
        "code": 205,
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
            "10": "10 WINTER SPORT SET OTS",
            "11": "11 THE LATEST SET MCU",
            "12": "13 SUNRISE PERTH OTS BACKGROUND",
            "13": "15 NETWORK SET MCU",
            "14": "16 NETWORK SPORT SET MCU",
            "15": "20 SUNRISE EAST PERTH BRIGHT",
            "16": "21 SUNRISE EAST PERTH DIM",
            "17": "22 SUNRISE EAST PERTH WIDE",
            "18": "23 SUNRISE ELIZABETH QUAY",
            "19": "24 SUNRISE SOUTH PERTH BRIGHT",
            "20": "25 SUNRISE SOUTH PERTH OVERCAST",
            "21": "26 SUNRISE SOUTH PERTH SUMMER",
            "22": "27 SUNRISE SOUTH PERTH WINTER",
            "23": "30 CAM 6 DAYTIME FAIR",
            "24": "31 CAM 6 DAYTIME OVERCAST",
            "25": "32 CAM 6 DAYTIME RAINING",
            "26": "33 CAM 6 NIGHT",
            "27": "40 GENERIC MULTIVIEW SET",
            "28": "41 GENERIC CONTROL ROOM SET",
            "29": "50 PLAIN WHITE",
            "30": "51 CHROMA KEY GREEN",
            "31": "52 GENERIC WHITE GFX",
            "32": "53 GENERIC BLACK GFX",
            "33": "54 GENERIC BLACK WHITE GFX",
            "34": "55 GENERIC BLACK AND RED GFX",
            "35": "60 JAMTV HORSE RACING",
            "36": "61 SPORT GENERIC AFL BLACK",
            "37": "62 SPORT GENERIC AFL WHITE",
            "38": "63 SPORT GENERIC AFL",
            "39": "64 SPORT OPTUS STADIUM DAY",
            "40": "65 SPORT OPTUS STADIUM EVENING",
            "41": "66 SPORT OPTUS STADIUM NIGHT",
            "42": "67 SPORT WAFL",
            "43": "70 SPOTLIGHT 1",
            "44": "71 SPOTLIGHT 2",
            "45": "72 SPOTLIGHT 3",
            "46": "90 TEST CHECKERBOARD LINES",
            "47": "91 TEST CHECKERBOARD NO LINES",
            "48": "Capture0000",
            "49": "Capture0001",
            "clip count": "49"
        }
    }
}

var data = Object.entries(testClipData["data"]["clips info:"]).map(([key, value]) => ([Number(key), value]));
console.log(data);