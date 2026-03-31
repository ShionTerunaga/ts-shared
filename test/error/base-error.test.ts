import { BaseError } from "ts-shared";
import { describe, expect, it } from "vite-plus/test";

describe("BaseError", () => {
  it("渡した値が各プロパティに代入される", () => {
    const cause = new Error("boom");
    const details = { retryable: false };
    const error = new BaseError({
      cause,
      code: "APP_ERROR",
      details,
      message: "Application failed",
      name: "ApplicationError",
    });

    expect(error.name).toBe("ApplicationError");
    expect(error.message).toBe("Application failed");
    expect(error.code).toBe("APP_ERROR");
    expect(error.details).toBe(details);
    expect(error.cause).toBe(cause);
  });

  it("cause は非列挙プロパティとして保持される", () => {
    const cause = new Error("boom");
    const error = new BaseError({
      cause,
      details: { retryable: false },
    });

    expect(Object.prototype.propertyIsEnumerable.call(error, "cause")).toBeFalsy();
    expect(error.cause).toBe(cause);
  });
});
