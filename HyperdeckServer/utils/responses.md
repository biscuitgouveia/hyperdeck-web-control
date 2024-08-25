/getstatus route
``` json
{
    "status": 200,
    "data": {
        "code": 208,
        "transport info:": {
            "status": "play",
            "speed": "100",
            "slot id": "1",
            "clip id": "12",
            "single clip": "true",
            "display timecode": "00:00:02:13",
            "timecode": "00:00:02:13",
            "video format": "1080i50",
            "loop": "true"
        }
    }
}
```

/cliplist route
``` json
{
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
```

/play route
``` json
{
    "status": 200,
    "data": {
        "code": 208,
        "transport info:": {
            "status": "play",
            "speed": "100",
            "slot id": "1",
            "clip id": "43",
            "single clip": "false",
            "display timecode": "10:00:03:17",
            "timecode": "10:00:03:17",
            "video format": "1080i50",
            "loop": "false"
        }
    }
}
```

/stop route
``` json
{
    "status": 200,
    "data": {
        "code": 208,
        "transport info:": {
            "status": "stopped",
            "speed": "0",
            "slot id": "1",
            "clip id": "49",
            "single clip": "false",
            "display timecode": "00:00:05:24",
            "timecode": "00:00:05:24",
            "video format": "1080i50",
            "loop": "false"
        }
    }
}
```