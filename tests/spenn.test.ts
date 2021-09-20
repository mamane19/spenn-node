import fecthMock from "fetch-mock";
import { expect } from "chai";
import { Spenn } from "../src/spenn";
import {
  SpennHttpException,
  SpennHttpRequestFailure,
  SpennTypeError,
  SpennJsonDeserializationException,
} from "../src/spenn_errors";

describe("Spenn", () => {
  let spenn: Spenn;
  it("should be able to create a new instance", () => {
    spenn = new Spenn();
    expect(spenn).to.be.instanceOf(Spenn);
  });

  describe("authenticate", () => {
    const grantType = "client_credentials";
    const apiKey = "api-key-test";
    const clientId = "1234";
    const clientSecret = "secret";
    const audience = "audience-test";
    const path = "/token";
    const url = `${spenn.baseUrl}${path}`;
    const options = {
      path: path,
      baseUrl: spenn.baseUrl,
    };
    const response = {
      grantType: grantType,
      access_token: "token",
      token_type: "bearer",
      expires_in: 12000,
      type: "User",
      clientId: clientId,
      audience: audience,
      refresh_token: "refresh-token",
      ".issued": "2021-08-31",
      ".expires": "2021-09-01",
    };

    beforeEach(() => {
      fecthMock.post(url, async () => {
        const Response = {
          status: 200,
          data: response,
          requestOptions: options,
        };
        return Response;
      });
    });

    it("calls fetchMock.mock", async () => {
      await spenn.authenticate(
        grantType,
        apiKey,
        clientId,
        clientSecret,
        audience
      );
      expect(fecthMock.called).to.be.true;
    });

    it("throws a SpennHttpException when http request fails", () => {
      fecthMock.post(url, () => {
        const Response = {
          status: 500,
          data: {},
          requestOptions: options,
        };
        return Response;
      });
      expect(
        spenn.authenticate(grantType, apiKey, clientId, clientSecret, audience)
      ).to.throws(SpennHttpException);
    });

    it("throws a SpennHttpRequestFailure when the status code is not 200", async () => {
      fecthMock.post(url, () => {
        const Response = {
          status: 400,
          data: {},
          requestOptions: options,
          statusText: "Bad Request",
        };
        return Response;
      });
      expect(
        spenn.authenticate(grantType, apiKey, clientId, clientSecret, audience)
      ).to.throws(SpennHttpRequestFailure);
    });

    it("throws a SpennTypeError when the response body is null", async () => {
      fecthMock.post(url, () => {
        const Response = {
          status: 200,
          data: null,
          requestOptions: options,
          statusText: "Failed",
        };
        return Response;
      });
      expect(
        spenn.authenticate(grantType, apiKey, clientId, clientSecret, audience)
      ).to.throws(SpennTypeError);
    });

    it("throws a SpennJsonDeserializationException when the response body has a non-supported pattern and fails to deserialize", async () => {
      fecthMock.post(url, () => {
        const Response = {
          status: 200,
          data: {
            grantType: grantType,
            access_token: "token",
            token_type: "bearer",
            expires_in: 12000,
            type: "User",
            clientId: clientId,
            audience: audience,
            refresh_token: "refresh-token",
            ".issued": "2021-08-31",
            ".expires": "2021-09-01",
          },
          requestOptions: options,
          statusText: "Failed",
        };
        return Response;
      });
      expect(
        spenn.authenticate(grantType, apiKey, clientId, clientSecret, audience)
      ).to.throws(SpennJsonDeserializationException);
    });
  });

  describe("createRequest", () => {
    const phoneNumber = "0700000000";
    const amount = 125.99;
    const message = "just for testing";
    const externalReference = "reference";
    const token = "test-token";
    const path = "/api/Partner/transaction/request";
    const url = `${spenn.baseUrl}${path}`;
    const options = {
      path: path,
      baseUrl: spenn.baseUrl,
    };
    const response = {
      $id: "testing-ID",
      requestId: "testing-request-ID",
      status: "Pending",
      externalReference: externalReference,
    };

    beforeEach(() => {
      fecthMock.post(url, async () => {
        const Response = {
          status: 200,
          data: response,
          requestOptions: options,
        };
        return Response;
      });
    });

    it("calls fetchMock.mock", async () => {
      await spenn.createRequest(
        phoneNumber,
        amount,
        message,
        externalReference,
        token
      );
      expect(fecthMock.called).to.be.true;
    });

    it("throws a SpennHttpException when http request fails", () => {
      fecthMock.post(url, () => {
        const Response = {
          status: 500,
          data: {},
          requestOptions: options,
        };
        return Response;
      });
      expect(
        spenn.createRequest(
          phoneNumber,
          amount,
          message,
          externalReference,
          token
        )
      ).to.throws(SpennHttpException);
    });

    it("throws a SpennHttpRequestFailure when the status code is not 200", async () => {
      fecthMock.post(url, () => {
        const Response = {
          status: 400,
          data: {},
          requestOptions: options,
          statusText: "Bad Request",
        };
        return Response;
      });
      expect(
        spenn.createRequest(
          phoneNumber,
          amount,
          message,
          externalReference,
          token
        )
      ).to.throws(SpennHttpRequestFailure);
    });

    it("throws a SpennTypeError when the response body is null", async () => {
      fecthMock.post(url, () => {
        const Response = {
          status: 200,
          data: null,
          requestOptions: options,
          statusText: "Failed",
        };
        return Response;
      });
      expect(
        spenn.createRequest(
          phoneNumber,
          amount,
          message,
          externalReference,
          token
        )
      ).to.throws(SpennTypeError);
    });

    it("throws a SpennJsonDeserializationException when the response body has a non-supported pattern and fails to deserialize", async () => {
      fecthMock.post(url, () => {
        const Response = {
          status: 200,
          data: {
            $id: "testing-ID",
            requestId: "testing-request-ID",
            status: "Pending",
            externalReference: externalReference,
          },
          requestOptions: options,
          statusText: "Failed",
        };
        return Response;
      });
      expect(
        spenn.createRequest(
          phoneNumber,
          amount,
          message,
          externalReference,
          token
        )
      ).to.throws(SpennJsonDeserializationException);
    });
  });

  describe("cancelRequest", () => {
    const requestGuid = "tesing-request-guid";
    const token = "testing-token";
    const path = "/api/Partner/transaction/request/cancel";
    const url = `${spenn.baseUrl}${path}`;
    const options = {
      path: path,
      baseUrl: spenn.baseUrl,
    };
    const response = {
      $id: "testing-ID",
      requestId: "testing-request-ID",
      status: "Cancelled",
    };

    beforeEach(() => {
      fecthMock.post(url, async () => {
        const Response = {
          status: 200,
          data: response,
          requestOptions: options,
        };
        return Response;
      });
    });

    it("calls fetchMock.mock", async () => {
      await spenn.cancelRequest(requestGuid, token);
      expect(fecthMock.called).to.be.true;
    });

    it("throws a SpennHttpException when http request fails", () => {
      fecthMock.post(url, () => {
        const Response = {
          status: 500,
          data: {},
          requestOptions: options,
        };
        return Response;
      });
      expect(spenn.cancelRequest(requestGuid, token)).to.throws(
        SpennHttpException
      );
    });

    it("throws a SpennHttpRequestFailure when the status code is not 200", async () => {
      fecthMock.post(url, () => {
        const Response = {
          status: 400,
          data: {},
          requestOptions: options,
          statusText: "Bad Request",
        };
        return Response;
      });
      expect(spenn.cancelRequest(requestGuid, token)).to.throws(
        SpennHttpRequestFailure
      );
    });

    it("throws a SpennTypeError when the response body is null", async () => {
      fecthMock.post(url, () => {
        const Response = {
          status: 200,
          data: null,
          requestOptions: options,
          statusText: "Failed",
        };
        return Response;
      });
      expect(spenn.cancelRequest(requestGuid, token)).to.throws(SpennTypeError);
    });

    it("throws a SpennJsonDeserializationException when the response body has a non-supported pattern and fails to deserialize", async () => {
      fecthMock.post(url, () => {
        const Response = {
          status: 200,
          data: {
            $id: "testing-ID",
            requestId: "testing-request-ID",
            status: "Cancelled",
          },
          requestOptions: options,
          statusText: "Failed",
        };
        return Response;
      });
      expect(spenn.cancelRequest(requestGuid, token)).to.throws(
        SpennJsonDeserializationException
      );
    });
  });

  describe("checkRequestStatus", () => {
    const requestGuid = "request-guid";
    const token = "test-token-i-guess";
    const path = "/api/Partner/transaction/request/$requestGuid";
    const url = `${spenn.baseUrl}${path}`;
    const options = {
      path: path,
      baseUrl: spenn.baseUrl,
    };
    const response = {
      $id: "id",
      requestGuid: requestGuid,
      requestStatus: "request-status",
      timestampCreated: "2021-08-31",
      phoneNumber: "0780000000",
      message: "just for testing",
      amount: 1299.99,
      externalReference: "external-reference",
      transactionStatus: "TransactionApproved",
    };

    beforeEach(() => {
      fecthMock.get(url, async () => {
        const Response = {
          status: 200,
          data: response,
          requestOptions: options,
        };
        return Response;
      });
    });

    it("calls fetchMock.mock", async () => {
      await spenn.checkRequestStatus(requestGuid, token);
      expect(fecthMock.called).to.be.true;
    });

    it("throws a SpennHttpException when http request fails", () => {
      fecthMock.get(url, () => {
        const Response = {
          status: 500,
          data: {},
          requestOptions: options,
        };
        return Response;
      });
      expect(spenn.checkRequestStatus(requestGuid, token)).to.throws(
        SpennHttpException
      );
    });

    it("throws a SpennHttpRequestFailure when the status code is not 200", async () => {
      fecthMock.get(url, () => {
        const Response = {
          status: 400,
          data: {},
          requestOptions: options,
          statusText: "Bad Request",
        };
        return Response;
      });
      expect(spenn.checkRequestStatus(requestGuid, token)).to.throws(
        SpennHttpRequestFailure
      );
    });

    it("throws a SpennTypeError when the response body is null", async () => {
      fecthMock.get(url, () => {
        const Response = {
          status: 200,
          data: null,
          requestOptions: options,
          statusText: "Failed",
        };
        return Response;
      });
      expect(spenn.checkRequestStatus(requestGuid, token)).to.throws(
        SpennTypeError
      );
    });

    it("throws a SpennJsonDeserializationException when the response body has a non-supported pattern and fails to deserialize", async () => {
      fecthMock.get(url, () => {
        const Response = {
          status: 200,
          data: {
            $id: "testing-ID",
            requestId: "testing-request-ID",
          },
          requestOptions: options,
          statusText: "Failed",
        };
        return Response;
      });
      expect(spenn.checkRequestStatus(requestGuid, token)).to.throws(
        SpennJsonDeserializationException
      );
    });
  });
});
