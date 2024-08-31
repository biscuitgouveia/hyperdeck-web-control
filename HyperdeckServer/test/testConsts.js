export const mockStatus = "208 transport info:\r\nstatus: play\r\nspeed: 100\r\nslot id: 1\r\nclip id: 12\r\nsingle clip: true\r\ndisplay timecode: 10:00:00:00\r\ntimecode: 10:00:00:00\r\nvideo format: 1080i50\r\nloop: true\r\n\r\n"
export const mockStatusObject = {
    "code": 208,
    "transport info:": {
        "status": "play",
        "speed": "100",
        "slot id": "1",
        "clip id": "12",
        "single clip": "true",
        "display timecode": "10:00:00:00",
        "timecode": "10:00:00:00",
        "video format": "1080i50",
        "loop": "true"
    }
};

export const mockClipList = "205 clips info:\r\n1: 00 7NEWS LOGO LOOP.mov\r\n2: 01 THE LATEST LOGO LOOP.mov\r\n3: 02 SUNRISE SET MCU.mov\r\n\r\n";

export const mockCLipListOutput = {
    "code": 205,
    "clips info:": {
        "1": "00 7NEWS LOGO LOOP",
        "2": "01 THE LATEST LOGO LOOP",
        "3": "02 SUNRISE SET MCU"
    }
}