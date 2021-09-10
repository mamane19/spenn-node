import { expect } from "chai";
import {
  SpennException,
  SpennHttpException,
  SpennHttpRequestFailure,
  SpennTypeError,
  SpennJsonDeserializationException,
} from "../src/spenn_errors";

describe("SpennException", () => {
  it("should have a message", () => {
    const e = new SpennException("message");
    expect(e.message).to.equal("message");
  });
});

describe("SpennHttpException", () => {
  it("should have a message", () => {
    const e = new SpennHttpException("message");
    expect(e.message).to.equal("message");
  });
});

describe("SpennHttpRequestFailure", () => {
  it("should have a body as an object and a status code", () => {
    const e = new SpennHttpRequestFailure(200, { message: "message" });
    expect(e.body).to.deep.equal({ message: "message" });
    expect(e.statusCode).to.equal(200);
  });
});

describe("SpennTypeError", () => {
  it("should have a message", () => {
    const e = new SpennTypeError("message");
    expect(e.message).to.equal("message");
  });
});

describe("SpennJsonDeserializationException", () => {
  it("should have a message", () => {
    const e = new SpennJsonDeserializationException("message");
    expect(e.message).to.equal("message");
  });
});
