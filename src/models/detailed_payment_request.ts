// {@template payment_request_info}
// A more detailed [PaymentRequest] model with more information
// {@endtemplate payment_request}
export class DetailedPaymentRequest {
  // {@macro payment_request_info}
  // Creates a new instance of [DetailedPaymentRequest]
  constructor(
    public id: string,
    public requestGuid: string,
    public requestStatus: string,
    public birthdatetime: string,
    public phoneNumber: string,
    public message: string,
    public amount: number,
    public externalRef: string,
    public transactionStatus: string
  ) {
    this.id = id;
    this.requestGuid = requestGuid;
    this.requestStatus = requestStatus;
    this.birthdatetime = birthdatetime;
    this.phoneNumber = phoneNumber;
    this.message = message;
    this.amount = amount;
    this.externalRef = externalRef;
    this.transactionStatus = transactionStatus;
  }

  // Generates a new instance of [DetailedPaymentRequest] from a given map of data
  static fromMap(data: Map<string, any>) {
    return new DetailedPaymentRequest(
      data.get("$id") as string,
      data.get("requestGuid") as string,
      data.get("requestStatus") as string,
      data.get("timestampCreated") as string,
      data.get("phoneNumber") as string,
      data.get("message") as string,
      data.get("amount") as number,
      data.get("externalReference") as string,
      data.get("transactionStatus") as string
    );
  }

  // Parses this instance of [DetailedPaymentRequest] into a [Map]
  toMap(): Map<string, any> {
    return new Map<string, any>([
      ["$id", this.id],
      ["requestGuid", this.requestGuid],
      ["requestStatus", this.requestStatus],
      ["timestampCreated", this.birthdatetime],
      ["phoneNumber", this.phoneNumber],
      ["message", this.message],
      ["amount", this.amount],
      ["externalReference", this.externalRef],
      ["transactionStatus", this.transactionStatus],
    ]);
  }

  // Copies the current [DetailedPaymentRequest] while changing the specified fields.
  copyWith(
    id?: string,
    requestGuid?: string,
    requestStatus?: string,
    birthdatetime?: string,
    phoneNumber?: string,
    message?: string,
    amount?: number,
    externalRef?: string,
    transactionStatus?: string
  ) {
    return new DetailedPaymentRequest(
      id ?? this.id,
      requestGuid ?? this.requestGuid,
      requestStatus ?? this.requestStatus,
      birthdatetime ?? this.birthdatetime,
      phoneNumber ?? this.phoneNumber,
      message ?? this.message,
      amount ?? this.amount,
      externalRef ?? this.externalRef,
      transactionStatus ?? this.transactionStatus
    );
  }

  // Returns an [Equatable] implementation of this instance of [DetailedPaymentRequest]
  toEquatable(): DetailedPaymentRequest {
    return new DetailedPaymentRequest(
      this.id,
      this.requestGuid,
      this.requestStatus,
      this.birthdatetime,
      this.phoneNumber,
      this.message,
      this.amount,
      this.externalRef,
      this.transactionStatus
    );
  }
}
