import { ValidationError } from "ts-shared";
import { describe, expect, it } from "vite-plus/test";

describe("ValidationError", () => {
  it("渡した値が各プロパティに代入される", () => {
    const cause = new Error("invalid payload");
    const details = { requestId: "req_2" };
    const issues = [
      { message: "Invalid email format", path: "user.email" },
      { message: "Password is too short", path: "user.password" },
    ];
    const error = new ValidationError({
      cause,
      details,
      field: "user",
      issues,
      message: "User payload is invalid",
    });

    expect(error.name).toBe("ValidationError");
    expect(error.code).toBe("VALIDATION_ERROR");
    expect(error.message).toBe("User payload is invalid");
    expect(error.field).toBe("user");
    expect(error.issues).toBe(issues);
    expect(error.details).toBe(details);
    expect(error.cause).toBe(cause);
  });

  it("メッセージ未指定時はfieldから自動生成される", () => {
    const error = new ValidationError({
      field: "email",
    });

    expect(error.message).toBe('Validation failed for "email"');
  });
});
