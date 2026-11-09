import { getInitials } from "./initials";

describe("getInitials", () => {
  it("uses first and last word", () => {
    expect(getInitials("Jane Doe")).toBe("JD");
    expect(getInitials("Mary Ann Smith")).toBe("MS");
  });
  it("handles a single name", () => {
    expect(getInitials("Cher")).toBe("C");
  });
  it("falls back to ? for blank names", () => {
    expect(getInitials("   ")).toBe("?");
  });
});
