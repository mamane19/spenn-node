import fetch from "node-fetch";
import { SpennSession } from "./models/spenn_session";
import { DetailedPaymentRequest } from "./models/detailed_payment_request";
import { PaymentRequest } from "./models/payment_request";
import {
  SpennHttpException,
  SpennHttpRequestFailure,
  SpennJsonDeserializationException,
  SpennTypeError,
} from "./spenn_errors";

// An object to communicate with the SPENN Business Partner API.
export class Spenn {
  /// API url authority.
  /// exposed for testing purposes.
  /// TODO: uat- should be removed when used in production. maybe this should be
  /// configurable like a variable to be toggled on and off.

  baseUrl = "https://uat-idsrv.spenn.com";

  /// Autenticate a Business Partner account.
  /// Returns an instance of [SpennSession]
  async authenticate(
    grantType: string = "api_key",
    apiKey: string,
    clientId: string,
    clientSecret: string,
    audience: string
  ): Promise<SpennSession> {
    const url = `${this.baseUrl}/token`;
    const body: object = {
      grant_type: grantType,
      api_key: apiKey,
      client_id: clientId,
      client_secret: clientSecret,
      audience: audience,
    };

    let response;
    try {
      response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "x-www-form-urlencoded",
          Accept: "application/json",
        },
      });
    } catch (_) {
      throw new SpennHttpException("Failed");
    }

    if (response.status !== 200) {
      throw new SpennHttpRequestFailure(response.status, response.statusText);
    }
    if (response.body === null || response.body === undefined) {
      throw new SpennTypeError("Sorry man");
    }

    try {
      return SpennSession.fromMap(response.body);
    } catch (_) {
      throw new SpennJsonDeserializationException("Retry again");
    }
  }

  // Check the status of the payment request at the specified [requestGuid]
  // Returns a new [DetailedPaymentRequest] object.
  async createRequest(
    phoneNumber: string,
    amount: number,
    message: string,
    externalReference: string,
    token: string
  ): Promise<PaymentRequest> {
    const url = `${this.baseUrl}/api/Partner/transaction/request`;
    const payload: object = {
      phoneNumber: phoneNumber,
      amount: amount,
      message: message,
      externalReference: externalReference,
    };
    let response;
    try {
      response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (_) {
      throw new SpennHttpException("Failed");
    }

    if (response.status !== 200) {
      throw new SpennHttpRequestFailure(response.status, response.statusText);
    }
    if (response.body === null || response.body === undefined) {
      throw new SpennTypeError("Sorry man");
    }

    try {
      return PaymentRequest.fromMap(response.body!);
    } catch (_) {
      throw new SpennJsonDeserializationException("Retry again");
    }
  }

  // Cancel a payment request
  async cancelRequest(
    requestGuid: string,
    token: string
  ): Promise<PaymentRequest> {
    const url = `${this.baseUrl}/api/Partner/transaction/request/cancel`;
    const payload: object = {
      requestMoneyGuid: requestGuid,
    };
    let response;
    try {
      response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (_) {
      throw new SpennHttpException("Failed");
    }
    if (response.status !== 200) {
      throw new SpennHttpRequestFailure(response.status, response.statusText);
    }
    if (response.body === null || response.body === undefined) {
      throw new SpennTypeError("Sorry man");
    }
    try {
      return PaymentRequest.fromMap(response.body!);
    } catch (_) {
      throw new SpennJsonDeserializationException("Try again");
    }
  }

  // Check the status of the payment request at the specified [requestGuid]
  // Returns a new [DetailedPaymentRequest] object.
  async checkRequestStatus(
    requestGuid: string,
    token: string
  ): Promise<DetailedPaymentRequest> {
    const url = `${this.baseUrl}/api/Partner/transaction/${requestGuid}`;
    let response;
    try {
      response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (_) {
      throw new SpennHttpException("Failed");
    }
    if (response.status !== 200) {
      throw new SpennHttpRequestFailure(response.status, response.statusText);
    }
    if (response.body === null || response.body! === undefined) {
      throw new SpennTypeError("Sorry man");
    }
    try {
      return DetailedPaymentRequest.fromMap(response.body!);
    } catch (_) {
      throw new SpennJsonDeserializationException("Try again");
    }
  }
}
