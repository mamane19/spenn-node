import { expect } from "chai";
import { DetailedPaymentRequest } from "../../src/models/detailed_payment_request";

describe("DetailedPaymentRequest", () => {
  const id = "id";
  const requestGuid = "request-guid";
  const requesStatus = "pending";
  const birthdatetime = "2021-09-02";
  const phoneNumber = "0789636856";
  const message = "message";
  const amount = 1000;
  const externalRef = "external-ref";
  const transactionStatus = "approved";

  const subject = new DetailedPaymentRequest(
    id,
    requestGuid,
    requesStatus,
    birthdatetime,
    phoneNumber,
    message,
    amount,
    externalRef,
    transactionStatus
  );

  const subjectData: object = {
    $id: id,
    requestGuid: requestGuid,
    requestStatus: requesStatus,
    timestampCreated: birthdatetime,
    phoneNumber: phoneNumber,
    message: message,
    amount: amount,
    externalReference: externalRef,
    transactionStatus: transactionStatus,
  };

  it("should return constructor normally", () => {
    expect(
      () =>
        new DetailedPaymentRequest(
          id,
          requestGuid,
          requesStatus,
          birthdatetime,
          phoneNumber,
          message,
          amount,
          externalRef,
          transactionStatus
        )
    );
  });

  it("has value comparison", () => {
    expect(
      new DetailedPaymentRequest(
        id,
        requestGuid,
        requesStatus,
        birthdatetime,
        phoneNumber,
        message,
        amount,
        externalRef,
        transactionStatus
      )
    ).to.deep.equal(subject);
  });

  describe(".fromMap", () => {
    it("creates a new DetailedPaymentRequest object from given map of data", () => {
      expect(DetailedPaymentRequest.fromMap(subjectData)).to.eql(subject);
    });
  });

  describe(".toMap", () => {
    it("returns a map of data", () => {
      expect(subject.toMap()).to.eql(subjectData);
    });
  });

  describe(".copyWith", () => {
    it("copies a PaymentRequest object and update the specified fields", () => {
      const newSubject = subject.copyWith(
        id,
        requestGuid,
        requesStatus,
        birthdatetime,
        phoneNumber,
        message,
        5000,
        externalRef,
        transactionStatus
      );
      expect(newSubject.id).to.equal(id);
      expect(newSubject.requestGuid).to.equal(requestGuid);
      expect(newSubject.requestStatus).to.equal(requesStatus);
      expect(newSubject.birthdatetime).to.equal(birthdatetime);
      expect(newSubject.phoneNumber).to.equal(phoneNumber);
      expect(newSubject.message).to.equal(message);
      expect(newSubject.amount).to.equal(5000);
      expect(newSubject.externalRef).to.equal(externalRef);
      expect(newSubject.transactionStatus).to.equal(transactionStatus);
    });
  });

  describe(".toEquatabla", () => {
    it("Returns an Equatable implementation of this instance of DetailedPaymentRequest", () => {
      expect(subject.toEquatable()).to.eql({
        id: id,
        requestGuid: requestGuid,
        requestStatus: requesStatus,
        birthdatetime: birthdatetime,
        phoneNumber: phoneNumber,
        message: message,
        amount: amount,
        externalRef: externalRef,
        transactionStatus: transactionStatus,
      });
    });
  });
});
