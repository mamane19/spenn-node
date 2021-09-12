import { expect } from "chai";
import { Spenn } from "../src/spenn";

describe("Spenn", () => {
  it("returns constructor normally", () => {
    const spenn = new Spenn();
    expect(spenn).to.be.an.instanceof(Spenn);
  });
});
