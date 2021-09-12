// {@template payment_request}
// A request from a business to a user to pay money to your Spenn
// Business account. This can for example be to pay for
// an invoice or to pay for an orde placed in an online shopping system
// {@endtemplate payment_request}
export class PaymentRequest {
  // {@macro payment_request}
  // Creates a new instance of PaymentRequest
  constructor(
    // {@macro payment_request}
    public requestId: string,
    public id: string,
    public status: string,
    public externalRef: string
  ) {
    this.requestId = requestId;
    this.id = id;
    this.status = status;
    this.externalRef = externalRef;
  }

  // Generates a new instance of PaymentRequest from a given map of data.
  static fromMap(data: any) {
    return new PaymentRequest(
      data["requestId"] as string,
      data["$id"] as string,
      data["status"] as string,
      data["externalReference"] as string
    );
  }

  // Parses the current instance of [PaymentRequest] into a map.
  toMap(): object {
    return {
      requestId: this.requestId,
      $id: this.id,
      status: this.status,
      externalReference: this.externalRef,
    };
  }

  // Copies the current [PaymentRequest] while changing the specified fields.
  copyWith(
    requestId?: string,
    id?: string,
    status?: string,
    externalRef?: string
  ) {
    return new PaymentRequest(
      requestId ?? this.requestId,
      id ?? this.id,
      status ?? this.status,
      externalRef ?? this.externalRef
    );
  }

  // Returns an [Equatable] implementation of this instance of [DetailedPaymentRequest]
  toEquatable(): PaymentRequest {
    return new PaymentRequest(
      this.requestId,
      this.id,
      this.status,
      this.externalRef
    );
  }
}
