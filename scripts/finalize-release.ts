import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "..");
const tempDir = mkdtempSync(join(tmpdir(), "ts-shared-release-notes-"));

const gitUserName = process.env.GIT_USER_NAME ?? "github-actions[bot]";
const gitUserEmail =
  process.env.GIT_USER_EMAIL ?? "41898282+github-actions[bot]@users.noreply.github.com";

function run(
  command: string,
  args: string[],
  cwd = repoRoot,
  stdio: "inherit" | "pipe" = "inherit",
) {
  return execFileSync(command, args, { cwd, encoding: "utf8", stdio });
}

function canRun(command: string, args: string[], cwd = repoRoot) {
  try {
    execFileSync(command, args, { cwd, stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function cleanup() {
  rmSync(tempDir, { recursive: true, force: true });
}

process.on("exit", cleanup);
process.on("SIGINT", () => {
  cleanup();
  process.exit(130);
});
process.on("SIGTERM", () => {
  cleanup();
  process.exit(143);
});

const packageJson = JSON.parse(readFileSync(join(repoRoot, "package.json"), "utf8")) as {
  version: string;
};
const changelog = readFileSync(join(repoRoot, "CHANGELOG.md"), "utf8");
const version = packageJson.version;
const tag = `v${version}`;

const releaseHeader = new RegExp(
  `##\\s+${version.replaceAll(".", "\\.")}\\b([\\s\\S]*?)(?=\\n##\\s|$)`,
);
const match = changelog.match(releaseHeader);
const releaseNotes = (match?.[0] ?? `## ${version}`).trim();
const notesPath = join(tempDir, "release-notes.md");

writeFileSync(notesPath, releaseNotes);

run("git", ["config", "user.name", gitUserName]);
run("git", ["config", "user.email", gitUserEmail]);

run("git", ["add", "dist", "package.json", "CHANGELOG.md"]);

const hasBuildChanges = !canRun("git", ["diff", "--cached", "--quiet"]);

if (hasBuildChanges) {
  run("git", ["commit", "-m", `chore: pack release ${tag}`]);
  run("git", ["push", "origin", "HEAD:release"]);
}

if (!canRun("git", ["rev-parse", "--verify", `refs/tags/${tag}`])) {
  run("git", ["tag", "-a", tag, "-m", tag]);
  run("git", ["push", "origin", tag]);
}

if (canRun("gh", ["release", "view", tag])) {
  run("gh", ["release", "edit", tag, "--title", tag, "--notes-file", notesPath]);
} else {
  run("gh", ["release", "create", tag, "--title", tag, "--notes-file", notesPath]);
}
