import {
  cpSync,
  existsSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "..");
const tempDir = mkdtempSync(join(tmpdir(), "ts-shared-release-branch-"));

const gitUserName = process.env.GIT_USER_NAME ?? "github-actions[bot]";
const gitUserEmail =
  process.env.GIT_USER_EMAIL ?? "41898282+github-actions[bot]@users.noreply.github.com";
const releaseBranch = process.env.RELEASE_BRANCH ?? "release";
const keepPaths = ["dist", "LICENSE", "package.json"] as const;

interface ReleasePackageJson {
  name: string;
  version: string;
  description?: string;
  homepage?: string;
  bugs?: {
    url?: string;
  };
  license?: string;
  repository?: {
    type?: string;
    url?: string;
  };
  files?: string[];
  type?: string;
  types?: string;
  exports?: Record<string, string>;
  engines?: {
    node?: string;
  };
}

function run(command: string, args: string[], cwd = repoRoot) {
  return execFileSync(command, args, { cwd, encoding: "utf8", stdio: "inherit" });
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

for (const relativePath of keepPaths) {
  const sourcePath = join(repoRoot, relativePath);

  if (!existsSync(sourcePath)) {
    throw new Error(`Missing release artifact: ${relativePath}`);
  }

  cpSync(sourcePath, join(tempDir, relativePath), { recursive: true });
}

const sourcePackageJson = JSON.parse(readFileSync(join(repoRoot, "package.json"), "utf8")) as {
  version: string;
} & Record<string, unknown>;
const packageJson: ReleasePackageJson = {
  name: String(sourcePackageJson.name),
  version: String(sourcePackageJson.version),
  description:
    typeof sourcePackageJson.description === "string" ? sourcePackageJson.description : undefined,
  homepage: typeof sourcePackageJson.homepage === "string" ? sourcePackageJson.homepage : undefined,
  bugs:
    sourcePackageJson.bugs && typeof sourcePackageJson.bugs === "object"
      ? (sourcePackageJson.bugs as ReleasePackageJson["bugs"])
      : undefined,
  license: typeof sourcePackageJson.license === "string" ? sourcePackageJson.license : undefined,
  repository:
    sourcePackageJson.repository && typeof sourcePackageJson.repository === "object"
      ? (sourcePackageJson.repository as ReleasePackageJson["repository"])
      : undefined,
  files: ["dist", "LICENSE", "package.json"],
  type: typeof sourcePackageJson.type === "string" ? sourcePackageJson.type : undefined,
  types: typeof sourcePackageJson.types === "string" ? sourcePackageJson.types : undefined,
  exports:
    sourcePackageJson.exports && typeof sourcePackageJson.exports === "object"
      ? (sourcePackageJson.exports as ReleasePackageJson["exports"])
      : undefined,
  engines:
    sourcePackageJson.engines && typeof sourcePackageJson.engines === "object"
      ? (sourcePackageJson.engines as ReleasePackageJson["engines"])
      : undefined,
};
const tag = `v${packageJson.version}`;

writeFileSync(join(tempDir, "package.json"), `${JSON.stringify(packageJson, null, 2)}\n`);

run("git", ["config", "user.name", gitUserName]);
run("git", ["config", "user.email", gitUserEmail]);
run("git", ["checkout", "--orphan", `release-artifacts-${process.env.GITHUB_RUN_ID ?? "local"}`]);
run("git", ["rm", "-r", "--cached", "--ignore-unmatch", "."]);

for (const entry of readdirSync(repoRoot)) {
  if (entry === ".git") {
    continue;
  }

  rmSync(join(repoRoot, entry), { recursive: true, force: true });
}

for (const relativePath of keepPaths) {
  cpSync(join(tempDir, relativePath), join(repoRoot, relativePath), { recursive: true });
}

run("git", ["add", "--force", ...keepPaths]);
run("git", ["commit", "--no-verify", "-m", `chore: prepare release ${tag}`]);
run("git", ["push", "origin", `HEAD:${releaseBranch}`, "--force"]);
