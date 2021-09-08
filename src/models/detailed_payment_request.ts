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
  static fromMap(data: Map<string, any>): DetailedPaymentRequest {
    const id = data.get("$id");
    const requestGuid = data.get("requestGuid");
    const requestStatus = data.get("requestStatus");
    const birthdatetime = data.get("timestampCreated");
    const phoneNumber = data.get("phoneNumber");
    const message = data.get("message");
    const amount = data.get("amount");
    const externalRef = data.get("externalReference");
    const transactionStatus = data.get("transactionStatus");
    return new DetailedPaymentRequest(
      id as string,
      requestGuid as string,
      requestStatus as string,
      birthdatetime as string,
      phoneNumber as string,
      message as string,
      amount as number,
      externalRef as string,
      transactionStatus as string
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
  ): DetailedPaymentRequest {
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

  // Returns a string representation of this [DetailedPaymentRequest]
  toString(): string {
    return (
      "DetailedPaymentRequest{" +
      "id: " +
      this.id +
      ", " +
      "requestGuid: " +
      this.requestGuid +
      ", " +
      "requestStatus: " +
      this.requestStatus +
      ", " +
      "birthdatetime: " +
      this.birthdatetime +
      ", " +
      "phoneNumber: " +
      this.phoneNumber +
      ", " +
      "message: " +
      this.message +
      ", " +
      "amount: " +
      this.amount +
      ", " +
      "externalRef: " +
      this.externalRef +
      ", " +
      "transactionStatus: " +
      this.transactionStatus +
      "}"
    );
  }
}


