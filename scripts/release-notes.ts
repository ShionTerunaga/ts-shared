function normalizeLineEndings(input: string): string {
  return input.replaceAll("\r\n", "\n");
}

export interface LatestReleaseNotes {
  version: string;
  notes: string;
}

export function parseLatestReleaseNotes(changelogContent: string): LatestReleaseNotes {
  const normalizedChangelog = normalizeLineEndings(changelogContent);
  const headingMatch = normalizedChangelog.match(/^##\s+([^\n]+)$/m);

  if (!headingMatch || headingMatch.index === undefined) {
    throw new Error("Could not find a release section in CHANGELOG.md");
  }

  const rawVersion = headingMatch[1];
  const sectionStart = headingMatch.index;
  const remainingContent = normalizedChangelog.slice(sectionStart);
  const nextHeadingOffset = remainingContent.slice(1).search(/\n##\s+/);
  const section =
    nextHeadingOffset === -1 ? remainingContent : remainingContent.slice(0, nextHeadingOffset + 1);
  const version = rawVersion.trim();
  const notes = section.trim();

  if (!version) {
    throw new Error("The latest CHANGELOG.md release section is missing a version");
  }

  return {
    version,
    notes,
  };
}
