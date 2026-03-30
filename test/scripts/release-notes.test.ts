import { describe, expect, it } from "vite-plus/test";
import { parseLatestReleaseNotes } from "../../scripts/release-notes";

describe("parseLatestReleaseNotes", () => {
  it("returns the latest release section from the changelog", () => {
    const changelog = `# ts-shared

## 1.2.3

### Patch Changes

- Fix release notes extraction

## 1.2.2

### Patch Changes

- Previous entry
`;

    expect(parseLatestReleaseNotes(changelog)).toEqual({
      version: "1.2.3",
      notes: `## 1.2.3

### Patch Changes

- Fix release notes extraction`,
    });
  });

  it("supports CRLF changelog content", () => {
    const changelog = "# ts-shared\r\n\r\n## 2.0.0\r\n\r\n### Major Changes\r\n\r\n- Ship it\r\n";

    expect(parseLatestReleaseNotes(changelog)).toEqual({
      version: "2.0.0",
      notes: `## 2.0.0

### Major Changes

- Ship it`,
    });
  });

  it("throws when the changelog does not contain a release section", () => {
    expect(() => parseLatestReleaseNotes("# ts-shared\n")).toThrow(
      "Could not find a release section in CHANGELOG.md",
    );
  });
});
