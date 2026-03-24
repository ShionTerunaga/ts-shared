import { cpSync, mkdtempSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "..");
const releaseDir = mkdtempSync(join(tmpdir(), "ts-shared-release-"));
const excludedEntries = new Set([".git", "node_modules", ".pnpm-store", ".vite", ".turbo"]);

const gitUserName = process.env.GIT_USER_NAME ?? "github-actions[bot]";
const gitUserEmail =
  process.env.GIT_USER_EMAIL ?? "41898282+github-actions[bot]@users.noreply.github.com";

let tagCreated = false;

function runGit(args: string[], cwd = repoRoot) {
  execFileSync("git", args, { cwd, stdio: "inherit" });
}

function canResolveGit(args: string[], cwd = repoRoot) {
  try {
    execFileSync("git", args, { cwd, stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function syncRepositoryContents() {
  for (const entry of readdirSync(repoRoot)) {
    if (excludedEntries.has(entry)) {
      continue;
    }

    const sourcePath = join(repoRoot, entry);
    const targetPath = join(releaseDir, entry);

    rmSync(targetPath, { force: true, recursive: true });
    cpSync(sourcePath, targetPath, { recursive: true });
  }
}

function cleanup() {
  try {
    runGit(["worktree", "remove", "--force", releaseDir]);
  } catch {
    rmSync(releaseDir, { force: true, recursive: true });
  }
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
const tag = `v${packageJson.version}`;

runGit(["config", "user.name", gitUserName]);
runGit(["config", "user.email", gitUserEmail]);

if (!canResolveGit(["rev-parse", "--verify", `refs/tags/${tag}`])) {
  runGit(["tag", "-a", tag, "-m", tag]);
  tagCreated = true;
}

runGit(["fetch", "origin", "release"]);
runGit(["worktree", "add", "--detach", releaseDir, "origin/release"]);

syncRepositoryContents();

runGit(["checkout", "-B", "release"], releaseDir);
runGit(["config", "user.name", gitUserName], releaseDir);
runGit(["config", "user.email", gitUserEmail], releaseDir);
runGit(["add", "-A"], releaseDir);

const hasChanges = !canResolveGit(["diff", "--cached", "--quiet"], releaseDir);

if (hasChanges) {
  runGit(["commit", "-m", `chore: release ${tag}`], releaseDir);
  runGit(["push", "origin", "HEAD:release"], releaseDir);
} else {
  console.log("release branch is already up to date");
}

if (tagCreated) {
  runGit(["push", "origin", tag]);
}
