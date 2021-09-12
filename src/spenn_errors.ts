// Interface for all exceptions thrown by the spenn package.
declare class SpennException implements Error {
    constructor(message: string);
     name: string;
     message: string;
     stack?: string | undefined;
};

// Thrown if an exception occurs while making an `http` request.
declare class SpennHttpException implements SpennException {
    constructor(message: string);
     name: string;
     message: string;
     stack?: string | undefined;
};

// {@template http_request_failure}
// Thrown if an `http request returns a non-200` status code.
// {@endtemplate}
declare class SpennHttpRequestFailure implements SpennException {
     // {@template http_request_failure}
     name: string;
     message: string;
     stack?: string | undefined;
     statusCode: number;
     body: string;

     constructor(statusCode: number, body: string);
     
     toString(): string;
     // {@endtemplate}

};

/// Thrown when the request is successfull but the body of an unexpected type.
///
/// If the response body expected is a [Map] but instead.
/// we get a [List] for example. Also  thrown when the response body is `null`.
declare class SpennTypeError implements SpennException {
     constructor(message: string);
     name: string;
     message: string;
     stack?: string | undefined;
}

/// Thrown when an error occurs while deserializing the response body.
declare class SpennJsonDeserializationException implements SpennException {
     constructor(message: string);
     name: string;
     message: string;
     stack?: string | undefined;
}

export { SpennException, SpennHttpException, SpennHttpRequestFailure, SpennTypeError, SpennJsonDeserializationException };