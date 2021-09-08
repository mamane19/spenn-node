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
    public requestedId: string,
    public id: string,
    public status: string,
    public externalRef: string
  ) {
    this.requestedId = requestedId;
    this.id = id;
    this.status = status;
    this.externalRef = externalRef;
  }

  // Generates a new instance of PaymentRequest from a given map of data.
  static fromMap(data: Map<string, any>): PaymentRequest {
    const requestedId = data.get("requestedId");
    const id = data.get("$id");
    const status = data.get("status");
    const externalRef = data.get("externalReference");
    return new PaymentRequest(
      requestedId as string,
      id as string,
      status as string,
      externalRef as string
    );
  }

  // Parses the current instance of [PaymentRequest] into a map.
  toMap(): Map<string, any> {
    return new Map<string, any>([
      ["requestedId", this.requestedId],
      ["$id", this.id],
      ["status", this.status],
      ["externalReference", this.externalRef],
    ]);
  }

  // Copies the current [PaymentRequest] while changing the specified fields.
  copyWith(
    requestedId?: string,
    id?: string,
    status?: string,
    externalRef?: string
  ): PaymentRequest {
    return new PaymentRequest(
      requestedId ?? this.requestedId,
      id ?? this.id,
      status ?? this.status,
      externalRef ?? this.externalRef
    );
  }

  // Returns a string representation of the current instance of [PaymentRequest].
  toString(): string {
    return `PaymentRequest {
               requestedId: ${this.requestedId},
               id: ${this.id},
               status: ${this.status},
               externalRef: ${this.externalRef},
          }`;
  }
}
