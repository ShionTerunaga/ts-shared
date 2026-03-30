import { omitElementObject } from "@/object/object";
import { describe, expect, it } from "vite-plus/test";

describe("object", () => {
  it("omitElementObject", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = { a: 1, c: 3 };

    const omitResult = omitElementObject(obj, ["b"]);

    expect(omitResult).toEqual(result);
  });
});
