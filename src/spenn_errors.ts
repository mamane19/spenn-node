// Interface for all exceptions thrown by the spenn package.
declare class SpennException extends Error {
  message: string;
}

// Thrown if an exception occurs while making an `http` request.
declare class SpennHttpException extends SpennException {
  message: string;
}

// {@template http_request_failure}
// Thrown if an `http request returns a non-200` status code.
// {@endtemplate}
declare class SpennHttpRequestFailure extends SpennException {
  constructor(statusCode: number, body: string);
}

/// Thrown when the request is successfull but the body of an unexpected type.
///
/// If the response body expected is a [Map] but instead.
/// we get a [List] for example. Also  thrown when the response body is `null`.
declare class SpennTypeError extends SpennException {
  message: string;
}

/// Thrown when an error occurs while deserializing the response body.
declare class SpennJsonDeserializationException extends SpennException {
  message: string;
}

export {
  SpennException,
  SpennHttpException,
  SpennHttpRequestFailure,
  SpennTypeError,
  SpennJsonDeserializationException,
};
