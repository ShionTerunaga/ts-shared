import {
  BadGatewayError,
  BadRequestError,
  BaseHttpError,
  ConflictError,
  ForbiddenError,
  GatewayTimeoutError,
  GoneError,
  InternalServerError,
  MethodNotAllowedError,
  NotFoundError,
  NotAcceptableError,
  NotImplementedError,
  PayloadTooLargeError,
  PaymentRequiredError,
  PreconditionFailedError,
  ProxyAuthenticationRequiredError,
  ServiceUnavailableError,
  TimeoutError,
  TooManyRequestsError,
  UnauthorizedError,
  UnprocessableEntityError,
  UnsupportedMediaTypeError,
} from "../../src/error/http-error";
import { describe, expect, it } from "vite-plus/test";

describe("BaseHttpError", () => {
  it("渡した値が各プロパティに代入される", () => {
    const cause = new Error("gateway failed");
    const details = { service: "api", retryable: true };
    const error = new BaseHttpError({
      cause,
      code: "BAD_GATEWAY",
      details,
      expose: true,
      message: "Gateway Error",
      name: "GatewayHttpError",
      status: 502,
      statusText: "Bad Gateway",
    });

    expect(error.name).toBe("GatewayHttpError");
    expect(error.message).toBe("Gateway Error");
    expect(error.code).toBe("BAD_GATEWAY");
    expect(error.details).toBe(details);
    expect(error.cause).toBe(cause);
    expect(error.expose).toBeTruthy();
    expect(error.status).toBe(502);
    expect(error.statusText).toBe("Bad Gateway");

    error.name = "UpdatedGatewayHttpError";
    error.message = "Updated Gateway Error";
    error.code = "UPDATED_BAD_GATEWAY";
    error.details = { service: "api", retryable: false };
    error.cause = new Error("updated gateway failure");
    error.expose = false;
    error.status = 5020;
    error.statusText = "Service Unavailable";

    expect(error.name).toBe("UpdatedGatewayHttpError");
    expect(error.message).toBe("Updated Gateway Error");
    expect(error.code).toBe("UPDATED_BAD_GATEWAY");
    expect(error.details).toEqual({ service: "api", retryable: false });
    expect(error.cause).toEqual(new Error("updated gateway failure"));
    expect(error.expose).toBeFalsy();
    expect(error.status).toBe(5020);
    expect(error.statusText).toBe("Service Unavailable");
  });

  it("省略時はHTTPエラー向けのデフォルト値になる", () => {
    const error = new BaseHttpError({});

    expect(error.name).toBe("BaseHttpError");
    expect(error.message).toBe("Application Error");
    expect(error.expose).toBeFalsy();
    expect(error.status).toBe(500);
    expect(error.statusText).toBe("Internal Server Error");
  });
});

describe("HTTP derived errors", () => {
  it("BadRequestError に渡した値が反映される", () => {
    const error = new BadRequestError({
      details: { field: "email" },
      message: "Email is required",
      statusText: "Invalid Email",
    });

    expect(error.name).toBe("BadRequestError");
    expect(error.code).toBe("BAD_REQUEST");
    expect(error.message).toBe("Email is required");
    expect(error.details).toEqual({ field: "email" });
    expect(error.status).toBe(400);
    expect(error.statusText).toBe("Invalid Email");
  });

  it("UnauthorizedError に渡した値が反映される", () => {
    const error = new UnauthorizedError({
      details: { token: "missing" },
      message: "Login required",
      statusText: "Login Required",
    });

    expect(error.name).toBe("UnauthorizedError");
    expect(error.code).toBe("UNAUTHORIZED");
    expect(error.message).toBe("Login required");
    expect(error.details).toEqual({ token: "missing" });
    expect(error.expose).toBeTruthy();
    expect(error.status).toBe(401);
    expect(error.statusText).toBe("Login Required");
  });

  it("PaymentRequiredError に渡した値が反映される", () => {
    const error = new PaymentRequiredError({
      details: { plan: "pro" },
      message: "Upgrade is required",
      statusText: "Upgrade Required",
    });

    expect(error.name).toBe("PaymentRequiredError");
    expect(error.code).toBe("PAYMENT_REQUIRED");
    expect(error.message).toBe("Upgrade is required");
    expect(error.details).toEqual({ plan: "pro" });
    expect(error.status).toBe(402);
    expect(error.statusText).toBe("Upgrade Required");
  });

  it("ForbiddenError に渡した値が反映される", () => {
    const error = new ForbiddenError({
      details: { role: "guest" },
      message: "Admin only",
      statusText: "Admin Only",
    });

    expect(error.name).toBe("ForbiddenError");
    expect(error.code).toBe("FORBIDDEN");
    expect(error.message).toBe("Admin only");
    expect(error.details).toEqual({ role: "guest" });
    expect(error.status).toBe(403);
    expect(error.statusText).toBe("Admin Only");
  });

  it("MethodNotAllowedError に渡した値が反映される", () => {
    const error = new MethodNotAllowedError({
      details: { method: "PATCH" },
      message: "PATCH is not supported",
      statusText: "Unsupported Method",
    });

    expect(error.name).toBe("MethodNotAllowedError");
    expect(error.code).toBe("METHOD_NOT_ALLOWED");
    expect(error.message).toBe("PATCH is not supported");
    expect(error.details).toEqual({ method: "PATCH" });
    expect(error.status).toBe(405);
    expect(error.statusText).toBe("Unsupported Method");
  });

  it("NotAcceptableError に渡した値が反映される", () => {
    const error = new NotAcceptableError({
      details: { accept: "application/xml" },
      message: "Response format is not acceptable",
      statusText: "Unsupported Accept Header",
    });

    expect(error.name).toBe("NotAcceptableError");
    expect(error.code).toBe("NOT_ACCEPTABLE");
    expect(error.message).toBe("Response format is not acceptable");
    expect(error.details).toEqual({ accept: "application/xml" });
    expect(error.status).toBe(406);
    expect(error.statusText).toBe("Unsupported Accept Header");
  });

  it("ProxyAuthenticationRequiredError に渡した値が反映される", () => {
    const error = new ProxyAuthenticationRequiredError({
      details: { proxy: "corp-proxy" },
      message: "Proxy login required",
      statusText: "Proxy Login Required",
    });

    expect(error.name).toBe("ProxyAuthenticationRequiredError");
    expect(error.code).toBe("PROXY_AUTHENTICATION_REQUIRED");
    expect(error.message).toBe("Proxy login required");
    expect(error.details).toEqual({ proxy: "corp-proxy" });
    expect(error.status).toBe(407);
    expect(error.statusText).toBe("Proxy Login Required");
  });

  it("NotFoundError に渡した値が反映される", () => {
    const error = new NotFoundError({
      details: { userId: "1" },
      message: "User not found",
      statusText: "User Not Found",
    });

    expect(error.name).toBe("NotFoundError");
    expect(error.code).toBe("NOT_FOUND");
    expect(error.message).toBe("User not found");
    expect(error.details).toEqual({ userId: "1" });
    expect(error.status).toBe(404);
    expect(error.statusText).toBe("User Not Found");
  });

  it("GoneError に渡した値が反映される", () => {
    const error = new GoneError({
      details: { resource: "legacy-endpoint" },
      message: "This endpoint has been removed",
      statusText: "Endpoint Removed",
    });

    expect(error.name).toBe("GoneError");
    expect(error.code).toBe("GONE");
    expect(error.message).toBe("This endpoint has been removed");
    expect(error.details).toEqual({ resource: "legacy-endpoint" });
    expect(error.status).toBe(410);
    expect(error.statusText).toBe("Endpoint Removed");
  });

  it("PreconditionFailedError に渡した値が反映される", () => {
    const error = new PreconditionFailedError({
      details: { etag: "abc123" },
      message: "ETag did not match",
      statusText: "Precondition Failed",
    });

    expect(error.name).toBe("PreconditionFailedError");
    expect(error.code).toBe("PRECONDITION_FAILED");
    expect(error.message).toBe("ETag did not match");
    expect(error.details).toEqual({ etag: "abc123" });
    expect(error.status).toBe(412);
    expect(error.statusText).toBe("Precondition Failed");
  });

  it("PayloadTooLargeError に渡した値が反映される", () => {
    const error = new PayloadTooLargeError({
      details: { maxBytes: 1024 },
      message: "Upload is too large",
      statusText: "Upload Too Large",
    });

    expect(error.name).toBe("PayloadTooLargeError");
    expect(error.code).toBe("PAYLOAD_TOO_LARGE");
    expect(error.message).toBe("Upload is too large");
    expect(error.details).toEqual({ maxBytes: 1024 });
    expect(error.status).toBe(413);
    expect(error.statusText).toBe("Upload Too Large");
  });

  it("UnsupportedMediaTypeError に渡した値が反映される", () => {
    const error = new UnsupportedMediaTypeError({
      details: { contentType: "text/plain" },
      message: "Content-Type is not supported",
      statusText: "Unsupported Content-Type",
    });

    expect(error.name).toBe("UnsupportedMediaTypeError");
    expect(error.code).toBe("UNSUPPORTED_MEDIA_TYPE");
    expect(error.message).toBe("Content-Type is not supported");
    expect(error.details).toEqual({ contentType: "text/plain" });
    expect(error.status).toBe(415);
    expect(error.statusText).toBe("Unsupported Content-Type");
  });

  it("UnprocessableEntityError に渡した値が反映される", () => {
    const error = new UnprocessableEntityError({
      details: { field: "slug" },
      message: "Slug has an invalid format",
      statusText: "Invalid Slug",
    });

    expect(error.name).toBe("UnprocessableEntityError");
    expect(error.code).toBe("UNPROCESSABLE_ENTITY");
    expect(error.message).toBe("Slug has an invalid format");
    expect(error.details).toEqual({ field: "slug" });
    expect(error.status).toBe(422);
    expect(error.statusText).toBe("Invalid Slug");
  });

  it("TooManyRequestsError に渡した値が反映される", () => {
    const error = new TooManyRequestsError({
      details: { retryAfter: 60 },
      message: "Rate limit exceeded",
      statusText: "Try Again Later",
    });

    expect(error.name).toBe("TooManyRequestsError");
    expect(error.code).toBe("TOO_MANY_REQUESTS");
    expect(error.message).toBe("Rate limit exceeded");
    expect(error.details).toEqual({ retryAfter: 60 });
    expect(error.status).toBe(429);
    expect(error.statusText).toBe("Try Again Later");
  });

  it("ConflictError に渡した値が反映される", () => {
    const error = new ConflictError({
      details: { resource: "email" },
      message: "Email already exists",
      statusText: "Duplicate Email",
    });

    expect(error.name).toBe("ConflictError");
    expect(error.code).toBe("CONFLICT");
    expect(error.message).toBe("Email already exists");
    expect(error.details).toEqual({ resource: "email" });
    expect(error.status).toBe(409);
    expect(error.statusText).toBe("Duplicate Email");
  });

  it("TimeoutError に渡した値が反映される", () => {
    const error = new TimeoutError({
      details: { timeoutMs: 3000 },
      message: "Request took too long",
      statusText: "Gateway Timeout",
    });

    expect(error.name).toBe("TimeoutError");
    expect(error.code).toBe("REQUEST_TIMEOUT");
    expect(error.message).toBe("Request took too long");
    expect(error.details).toEqual({ timeoutMs: 3000 });
    expect(error.status).toBe(408);
    expect(error.statusText).toBe("Gateway Timeout");
  });

  it("InternalServerError に渡した値が反映される", () => {
    const error = new InternalServerError({
      details: { traceId: "trace_1" },
      message: "Unexpected server failure",
      statusText: "Server Failure",
    });

    expect(error.name).toBe("InternalServerError");
    expect(error.code).toBe("INTERNAL_SERVER_ERROR");
    expect(error.message).toBe("Unexpected server failure");
    expect(error.details).toEqual({ traceId: "trace_1" });
    expect(error.expose).toBeFalsy();
    expect(error.status).toBe(500);
    expect(error.statusText).toBe("Server Failure");
  });

  it("NotImplementedError に渡した値が反映される", () => {
    const error = new NotImplementedError({
      details: { feature: "bulk-import" },
      message: "Bulk import is not implemented",
      statusText: "Feature Missing",
    });

    expect(error.name).toBe("NotImplementedError");
    expect(error.code).toBe("NOT_IMPLEMENTED");
    expect(error.message).toBe("Bulk import is not implemented");
    expect(error.details).toEqual({ feature: "bulk-import" });
    expect(error.expose).toBeFalsy();
    expect(error.status).toBe(501);
    expect(error.statusText).toBe("Feature Missing");
  });

  it("BadGatewayError に渡した値が反映される", () => {
    const error = new BadGatewayError({
      details: { upstream: "payments" },
      message: "Upstream returned an invalid response",
      statusText: "Invalid Upstream Response",
    });

    expect(error.name).toBe("BadGatewayError");
    expect(error.code).toBe("BAD_GATEWAY");
    expect(error.message).toBe("Upstream returned an invalid response");
    expect(error.details).toEqual({ upstream: "payments" });
    expect(error.expose).toBeFalsy();
    expect(error.status).toBe(502);
    expect(error.statusText).toBe("Invalid Upstream Response");
  });

  it("ServiceUnavailableError に渡した値が反映される", () => {
    const error = new ServiceUnavailableError({
      details: { service: "search" },
      message: "Search is temporarily unavailable",
      statusText: "Search Offline",
    });

    expect(error.name).toBe("ServiceUnavailableError");
    expect(error.code).toBe("SERVICE_UNAVAILABLE");
    expect(error.message).toBe("Search is temporarily unavailable");
    expect(error.details).toEqual({ service: "search" });
    expect(error.expose).toBeFalsy();
    expect(error.status).toBe(503);
    expect(error.statusText).toBe("Search Offline");
  });

  it("GatewayTimeoutError に渡した値が反映される", () => {
    const error = new GatewayTimeoutError({
      details: { upstream: "reports" },
      message: "Upstream timed out",
      statusText: "Reports Timeout",
    });

    expect(error.name).toBe("GatewayTimeoutError");
    expect(error.code).toBe("GATEWAY_TIMEOUT");
    expect(error.message).toBe("Upstream timed out");
    expect(error.details).toEqual({ upstream: "reports" });
    expect(error.expose).toBeFalsy();
    expect(error.status).toBe(504);
    expect(error.statusText).toBe("Reports Timeout");
  });
});
