import { SchemeError } from "ts-shared";
import { describe, expect, it } from "vite-plus/test";

describe("SchemeError", () => {
  it("渡した値が各プロパティに代入される", () => {
    const cause = new Error("invalid scheme");
    const details = { url: "http://example.com" };
    const error = new SchemeError({
      allowedSchemes: ["https", "wss"],
      cause,
      details,
      message: "Scheme is not allowed",
      receivedScheme: "http",
    });

    expect(error.name).toBe("SchemeError");
    expect(error.code).toBe("INVALID_SCHEME");
    expect(error.message).toBe("Scheme is not allowed");
    expect(error.allowedSchemes).toEqual(["https", "wss"]);
    expect(error.receivedScheme).toBe("http");
    expect(error.details).toBe(details);
    expect(error.cause).toBe(cause);
  });

  it("メッセージ未指定時は内容から自動生成される", () => {
    const error = new SchemeError({
      allowedSchemes: ["mailto"],
      receivedScheme: "https",
    });

    expect(error.message).toBe('Invalid scheme: expected one of [mailto], received "https"');
  });
});
