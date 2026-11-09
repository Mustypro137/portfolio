import { site } from "./site";

describe("site content", () => {
  it("has 3–6 projects", () => {
    expect(site.projects.length).toBeGreaterThanOrEqual(3);
    expect(site.projects.length).toBeLessThanOrEqual(6);
  });

  it("has 3–5 traits", () => {
    expect(site.traits.length).toBeGreaterThanOrEqual(3);
    expect(site.traits.length).toBeLessThanOrEqual(5);
  });

  it("every job has 1–3 highlights", () => {
    site.experience.forEach((job) => {
      expect(job.highlights.length).toBeGreaterThanOrEqual(1);
      expect(job.highlights.length).toBeLessThanOrEqual(3);
    });
  });

  it("contact email has no mailto: prefix", () => {
    expect(site.contact.email).not.toMatch(/^mailto:/);
  });
});
