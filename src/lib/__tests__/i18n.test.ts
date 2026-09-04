import { describe, it, expect, beforeEach } from "vitest";
import {
  translate,
  getInitialLanguage,
  setLanguagePreference,
  LANGUAGE_STORAGE_KEY,
} from "@/lib/i18n";

describe("i18n translation utility", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = "en";
  });

  it("returns English original text when lang is en", () => {
    expect(translate("Data & AI Governance", "en")).toBe("Data & AI Governance");
    expect(translate("Platform Accountability", "en")).toBe("Platform Accountability");
  });

  it("translates mapped keys to Indonesian when lang is id", () => {
    expect(translate("Data & AI Governance", "id")).toBe("Tata Kelola Data & AI");
    expect(translate("Digital Trade Agreements", "id")).toBe("Perjanjian Perdagangan Digital");
    expect(translate("Platform Accountability", "id")).toBe("Akuntabilitas Platform");
    expect(translate("Observatory", "id")).toBe("Observatorium");
  });

  it("falls back to original text for unmapped keys in Indonesian", () => {
    expect(translate("Unknown Navigation Label", "id")).toBe("Unknown Navigation Label");
  });

  it("defaults initial language to en when nothing is stored", () => {
    expect(getInitialLanguage()).toBe("en");
  });

  it("persists language preference and updates document lang", () => {
    setLanguagePreference("id");
    expect(localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe("id");
    expect(document.documentElement.lang).toBe("id");
    expect(getInitialLanguage()).toBe("id");
  });
});
