import { expect } from "chai";
import { PaymentRequest } from "../../src/models/payment_request";

describe("PaymentRequest", () => {
  const requestId = "requested_id";
  const id = "test_id";
  const status = "pendig";
  const externalRef = "external_ref";

  const subject = new PaymentRequest(requestId, id, status, externalRef);

  const testSubjectData: Map<string, any> = new Map();
  testSubjectData.set("requestId", requestId);
  testSubjectData.set("$id", id);
  testSubjectData.set("status", status);
  testSubjectData.set("externalReference", externalRef);

  it("Should return constructor normally", () => {
    expect(() => new PaymentRequest(requestId, id, status, externalRef));
  });

  it("has value comparison", () => {
    expect(new PaymentRequest(requestId, id, status, externalRef)).to.eql(
      subject
    );
  });

  describe(".fromMap", () => {
    it("creates a new PaymentRequest object from given map of data", () => {
      expect(PaymentRequest.fromMap(testSubjectData)).to.eql(subject);
    });
  });

  describe(".toMap", () => {
    it("returns a map of data", () => {
      expect(subject.toMap()).to.eql(testSubjectData);
    });
  });

  describe(".copyWith", () => {
    it("copies a PaymentRequest object and updates the specified fields", () => {
      const newSubject = subject.copyWith(requestId, id, "done", externalRef);
      expect(newSubject.requestId).to.equal(requestId);
      expect(newSubject.id).to.equal(id);
      expect(newSubject.status).to.equal("done");
      expect(newSubject.externalRef).to.equal(externalRef);
    });
  });
  
  describe('.toEquatable', () => {
    it('returns an equatable object', () => {
      expect(subject.toEquatable()).to.eql({
        requestId: requestId,
        id: id,
        status: status,
        externalRef: externalRef,
      });
    });
  })
});
