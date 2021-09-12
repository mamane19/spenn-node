import { expect } from "chai";
import { SpennSession } from "../../src/models/spenn_session";

describe("SpennSession", () => {
  const token = "random-token";
  const tokenType = "bearer";
  const lifespan = 120000;
  const audience = "";
  const birth = new Date().getTime();
  const death = birth + lifespan;
  const accountType = "client";
  const clientId = "client-id";
  const refreshToken = "refresh-token";

  const session = new SpennSession(
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

  const sessionData: object = {
    access_token: token,
    token_type: tokenType,
    expires_in: lifespan,
    audience: audience,
    ".issued": birth,
    ".expires": death,
    type: accountType,
    clientId: clientId,
    refresh_token: refreshToken,
  };

  it("returns constructor normally", () => {
    expect(() => {
      new SpennSession(
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
    });
  });

  it("has value comparison", () => {
    expect(
      new SpennSession(
        token,
        tokenType,
        lifespan,
        audience,
        birth,
        death,
        accountType,
        clientId,
        refreshToken
      )
    ).to.eql(session);
  });

  describe(".fromMap", () => {
    it("create a new SpennSession object from given map of data", () => {
      expect(SpennSession.fromMap(sessionData)).to.eql(session);
    });
  });

  describe(".toMap", () => {
    it("returns a map of data", () => {
      expect(session.toMap()).to.eql(sessionData);
    });
  });

  describe(".copyWith", () => {
    it("copies a SpennSession object and updates the specified fields", () => {
      const newSession = session.copyWith(
        token,
        tokenType,
        lifespan,
        audience,
        birth,
        death,
        accountType,
        "Another-ID",
        "refreshToken"
      );
      expect(newSession.token).to.eql(token);
      expect(newSession.tokenType).to.eql(tokenType);
      expect(newSession.lifespan).to.eql(lifespan);
      expect(newSession.audience).to.eql(audience);
      expect(newSession.birth).to.eql(birth);
      expect(newSession.death).to.eql(death);
      expect(newSession.accountType).to.eql(accountType);
      expect(newSession.clientId).to.eql("Another-ID");
      expect(newSession.refreshToken).to.eql("refreshToken");
    });
  });
});
