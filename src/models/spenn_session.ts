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
    public birth: Date,
    public death: Date,
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
  static fromMap(data: Map<string, any>): SpennSession {
    const token = data.get("access_token");
    const tokenType = data.get("token_type");
    const lifespan = data.get("expires_in");
    const audience = data.get("audience");
    const birth = data.get(".issued");
    const death = data.get(".expires");
    const accountType = data.get("type");
    const clientId = data.get("clientId");
    const refreshToken = data.get("refresh_token");
    return new SpennSession(
      token as string,
      tokenType as "bearer",
      lifespan as number,
      audience as string,
      birth as Date,
      death as Date,
      accountType as string,
      clientId as string,
      refreshToken as string
    );
  }

  // Parses the current instance of [SpennSession] into a Map<String,any>
  toMap(): Map<string, any> {
    return new Map<string, any>([
      ["access_token", this.token],
      ["token_type", this.tokenType],
      ["expires_in", this.lifespan],
      ["audience", this.audience],
      [".issued", this.birth],
      [".expires", this.death],
      ["type", this.accountType],
      ["clientId", this.clientId],
      ["refresh_token", this.refreshToken],
    ]);
  }

  // Copies the current [SpennSession] while changing the specified fields
  copyWith(
    token?: string,
    tokenType?: "bearer",
    lifespan?: number,
    audience?: string,
    birth?: Date,
    death?: Date,
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

  // Returns a new instance of [SpennSession] with the specified fields changed.
  copyWithChanges(
    token?: string,
    tokenType?: "bearer",
    lifespan?: number,
    audience?: string,
    birth?: Date,
    death?: Date,
    accountType?: string,
    clientId?: string,
    refreshToken?: string
  ): SpennSession {
    return this.copyWith(
      token,
      tokenType,
      lifespan,
      audience,
      birth,
      death,
      accountType,
      clientId,
      refreshToken
    );
  }
}
