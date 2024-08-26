class HyperdeckError extends Error {
    constructor(message, options) {
        super(message, options);
        this.name = "HyperdeckError";
        this.code = 199;
        this.date = new Date();
        this.stringDate = this.date.toISOString();
        this.logPoint = this.stringDate + ": " + this.message;
        this.outputErrorLog();
    }
    /**
     * Logs an error to the console in the format YYYY-MM-DDtHH:MM:SS:MMMz: ERROR_CODE - ERROR MESSAGE
     * @function outputErrorLog
     */
    outputErrorLog() {
        console.error(this.logPoint);
    }
}

/**
 *
 */
export class HyperdeckSyntaxError extends HyperdeckError {
    constructor(message = "Error 100 - Invalid syntax.", options) {
        super(message, options);
        this.name = "HyperdeckSyntaxError";
        this.code = 100;
    }
}

export class HyperdeckUnsupportedParameterError extends HyperdeckError {
    constructor(message = "Error 101 - Unsupported parameter.", options) {
        super(message, options);
        this.name = "HyperdeckUnsupportedParameterError";
        this.code = 101;
    }
}

export class HyperdeckInvalidValueError extends HyperdeckError {
    constructor(message = "Error 102 - Invalid value.", options) {
        super(message, options);
        this.name = "HyperdeckInvalidValueError";
        this.code = 102;
    }
}

export class HyperdeckUnsupportedError extends HyperdeckError {
    constructor(message = "Error 103 - Unsupported.", options) {
        super(message, options);
        this.name = "HyperdeckUnsupportedError";
        this.code = 103;
    }
}

export class HyperdeckDiskFullError extends HyperdeckError {
    constructor(message = "Error 104 - Disk Full.", options) {
        super(message, options);
        this.name = "HyperdeckDiskFullError";
        this.code = 104;
    }
}

export class HyperdeckNoDiskError extends HyperdeckError {
    constructor(message = "Error 105 - No disk detected.", options) {
        super(message, options);
        this.name = "HyperdeckNoDiskError";
        this.code = 105;
    }
}

export class HyperdeckDiskError extends HyperdeckError {
    constructor(message = "Error 106 - Disk error detected.", options) {
        super(message, options);
        this.name = "HyperdeckDiskError";
        this.code = 106;
    }
}

export class HyperdeckTimelineEmptyError extends HyperdeckError {
    constructor(message = "Error 107 - Timeline empty.", options) {
        super(message, options);
        this.name = "HyperdeckTimelineEmptyError";
        this.code = 107;
    }
}

export class HyperdeckInternalError extends HyperdeckError {
    constructor(message = "Error 108 - Internal error.", options) {
        super(message, options);
        this.name = "HyperdeckInternalError";
        this.code = 108;
    }
}

export class HyperdeckOutOfRangeError extends HyperdeckError {
    constructor(message = "Error 109 - Out of range.", options) {
        super(message, options);
        this.name = "HyperdeckOutOfRangeError";
        this.code = 109;
    }
}

export class HyperdeckNoInputError extends HyperdeckError {
    constructor(message = "Error 110 - No input detected.", options) {
        super(message, options);
        this.name = "HyperdeckNoInputError";
        this.code = 110;
    }
}

export class HyperdeckRemoteControlDisabledError extends HyperdeckError {
    constructor(message = "Error 111 - Remote control disabled.", options) {
        super(message, options);
        this.name = "HyperdeckRemoteControlDisabledError";
        this.code = 111;
    }
}

export class HyperdeckClipNotFoundError extends HyperdeckError {
    constructor(message = "Error 112 - clip could not be found.", options) {
        super(message, options);
        this.name = "HyperdeckClipNotFoundError";
        this.code = 112;
    }
}

export class HyperdeckConnectionFailedError extends HyperdeckError {
    constructor(message = "Error 120 - Connection Failed.", options) {
        super(message, options);
        this.name = "HyperdeckConnectionFailedError";
        this.code = 120;
    }
}

export class HyperdeckAuthenticationFailedError extends HyperdeckError {
    constructor(message = "Error 121 - Authentication Failed.", options) {
        super(message, options);
        this.name = "HyperdeckAuthenticationFailedError";
        this.code = 121;
    }
}

export class HyperdeckAuthenticationRequiredError extends HyperdeckError {
    constructor(message = "Error 122 - Authentication Required.", options) {
        super(message, options);
        this.name = "HyperdeckAuthenticationRequiredError";
        this.code = 122;
    }
}

export class HyperdeckInvalidStateError extends HyperdeckError {
    constructor(message = "Error 150 - Invalid State.", options) {
        super(message, options);
        this.name = "HyperdeckInvalidStateError";
        this.code = 150;
    }
}

export class HyperdeckInvalidCodecError extends HyperdeckError {
    constructor(message = "Error 151 - Invalid Codec.", options) {
        super(message, options);
        this.name = "HyperdeckInvalidCodecError";
        this.code = 151;
    }
}

export class HyperdeckInvalidFormatError extends HyperdeckError {
    constructor(message = "Error 160 - Invalid Format.", options) {
        super(message, options);
        this.name = "HyperdeckInvalidFormatError";
        this.code = 160;
    }
}

export class HyperdeckInvalidTokenError extends HyperdeckError {
    constructor(message = "Error 161 - Invalid Token.", options) {
        super(message, options);
        this.name = "HyperdeckInvalidTokenError";
        this.code = 161;
    }
}

export class HyperdeckFormatNotPreparedError extends HyperdeckError {
    constructor(message = "Error 162 - Format not prepared.", options) {
        super(message, options);
        this.name = "HyperdeckFormatNotPreparedError";
        this.code = 162;
    }
}

export class HyperdeckParameterisedSingleLineCommandError extends HyperdeckError {
    constructor(
        message = "Error 163 - Parameterised single line command not supported.",
        options
    ) {
        super(message, options);
        this.name = "HyperdeckParameterisedSingleLineCommandError";
        this.code = 163;
    }
}

export const errorDelegation = (code) => {
    switch (code) {
        case 100:
            return new HyperdeckSyntaxError();
        case 101:
            return new HyperdeckUnsupportedParameterError();
        case 102:
            return new HyperdeckInvalidValueError();
        case 103:
            return new HyperdeckUnsupportedError();
        case 104:
            return new HyperdeckDiskFullError();
        case 105:
            return new HyperdeckNoDiskError();
        case 106:
            return new HyperdeckDiskError();
        case 107:
            return new HyperdeckTimelineEmptyError();
        case 108:
            return new HyperdeckInternalError();
        case 109:
            return new HyperdeckOutOfRangeError();
        case 110:
            return new HyperdeckNoInputError();
        case 111:
            return new HyperdeckRemoteControlDisabledError();
        case 112:
            return new HyperdeckClipNotFoundError();
        case 120:
            return new HyperdeckConnectionFailedError();
        case 121:
            return new HyperdeckAuthenticationFailedError();
        case 122:
            return new HyperdeckAuthenticationRequiredError();
        case 150:
            return new HyperdeckInvalidStateError();
        case 151:
            return new HyperdeckInvalidCodecError();
        case 160:
            return new HyperdeckInvalidFormatError();
        case 161:
            return new HyperdeckInvalidTokenError();
        case 162:
            return new HyperdeckFormatNotPreparedError();
        case 163:
            return new HyperdeckParameterisedSingleLineCommandError();
    }
}