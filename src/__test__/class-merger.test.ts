import classMerger from "@/utils/class-merger";
import { describe, expect, it } from "vite-plus/test";

describe("class-merger", () => {
  it("空配列では空文字が返る", () => {
    const test: Array<string> = [];

    const result = classMerger(test);

    expect(result).toBe("");
  });

  it("1件だけならそのまま返る", () => {
    const test: Array<string> = ["a"];

    const result = classMerger(test);

    expect(result).toBe("a");
  });

  it("aとbを入れてa bが返ってくる", () => {
    const test: Array<string> = ["a", "b"];

    const result = classMerger(test);

    expect(result).toBe("a b");
  });

  it("重複は削除される", () => {
    const test: Array<string> = ["a", "b", "a"];

    const result = classMerger(test);

    expect(result).toBe("a b");
  });

  it("空文字は削除される", () => {
    const test: Array<string> = ["a", "", "b"];

    const result = classMerger(test);

    expect(result).toBe("a b");
  });

  it("順序は最初の出現順を維持する", () => {
    const test: Array<string> = ["b", "a", "b", "c", "a"];

    const result = classMerger(test);

    expect(result).toBe("b a c");
  });
});
