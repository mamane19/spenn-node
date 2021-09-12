// {@template spenn_session}
// Instance of session that holds the data returned after authentication.
// {@endtemplate spenn_session}
export class SpennSession {
  // {@macro spenn_session}
  constructor(
    public token: string,
    public tokenType: "bearer",
    public lifespan: number,
    public audience: string,
    public birth: number,
    public death: number,
    public accountType: string,
    public clientId: string,
    public refreshToken: string
  ) {
    this.token = token;
    this.tokenType = tokenType;
    this.lifespan = lifespan;
    this.audience = audience;
    this.birth = birth;
    this.death = death;
    this.accountType = accountType;
    this.clientId = clientId;
    this.refreshToken = refreshToken;
  }

  // Generates a new instance of [SpennSession] from a given map of data.
  static fromMap(data: any) {
    data = {
      token: data["access_token"],
      tokenType: data["token_type"],
      lifespan: data["expires_in"],
      audience: data["audience"],
      birth: data[".issued"],
      death: data[".expires"],
      accountType: data["type"],
      clientId: data["clientId"],
      refreshToken: data["refresh_token"],
    };
    return new SpennSession(
      data.token,
      data.tokenType,
      data.lifespan,
      data.audience,
      data.birth,
      data.death,
      data.accountType,
      data.clientId,
      data.refreshToken
    );
  }

  // Parses the current instance of [SpennSession] into a Map<String,any>
  toMap(): object {
    return {
      access_token: this.token,
      token_type: this.tokenType,
      expires_in: this.lifespan,
      audience: this.audience,
      ".issued": this.birth,
      ".expires": this.death,
      type: this.accountType,
      clientId: this.clientId,
      refresh_token: this.refreshToken,
    };
  }

  // Copies the current [SpennSession] while changing the specified fields
  copyWith(
    token?: string,
    tokenType?: "bearer",
    lifespan?: number,
    audience?: string,
    birth?: number,
    death?: number,
    accountType?: string,
    clientId?: string,
    refreshToken?: string
  ): SpennSession {
    return new SpennSession(
      token ?? this.token,
      tokenType ?? this.tokenType,
      lifespan ?? this.lifespan,
      audience ?? this.audience,
      birth ?? this.birth,
      death ?? this.death,
      accountType ?? this.accountType,
      clientId ?? this.clientId,
      refreshToken ?? this.refreshToken
    );
  }
}
