import { describe, expect, it } from "vitest";
import { categories, getLogoById, img, logos } from "@/lib/work";

describe("Work images and logos", () => {
  it("resolves hero image 007", () => {
    const heroImg = img("007");
    expect(heroImg).toBeTruthy();
    expect(heroImg).not.toBe("");
  });

  it("contains 12 logo items in the logo category", () => {
    expect(logos.length).toBe(12);
    const logoCat = categories.find((c) => c.key === "logo");
    expect(logoCat).toBeDefined();
    expect(logoCat?.ids.length).toBe(12);
  });

  it("resolves all 12 logos via getLogoById and img", () => {
    for (const logo of logos) {
      expect(logo.name).toBeTruthy();
      expect(logo.file).toBeTruthy();
      expect(logo.bg).toBeTruthy();

      const lookup = getLogoById(logo.id);
      expect(lookup).toBeDefined();
      expect(lookup?.name).toBe(logo.name);

      const imagePath = img(logo.id);
      expect(imagePath).toBeTruthy();
      expect(imagePath).not.toBe("");
    }
  });

  it("resolves all category images across all 5 sections to non-empty URLs", () => {
    expect(categories.length).toBe(5);
    for (const cat of categories) {
      for (const id of cat.ids) {
        const imagePath = img(id);
        expect(imagePath).toBeTruthy();
        expect(imagePath).not.toBe("");
      }
    }
  });
});
