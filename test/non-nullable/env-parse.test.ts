import { envParse } from "ts-shared";
import { describe, expect, it } from "vite-plus/test";

describe("env-parse", () => {
  it("envが文字列として返ってきた場合はoption.someで値を返す", () => {
    const result = "test";
    const parseResult = envParse(result);

    expect(parseResult.kind).toEqual("some");

    if (parseResult.kind === "none") {
      return;
    }

    expect(parseResult.value).toEqual(result);
  });

  it("envがundefinedとして返ってきた場合はoption.noneで値を返す", () => {
    const result = undefined;

    const parseResult = envParse(result);

    expect(parseResult.kind).toEqual("none");
  });
});
