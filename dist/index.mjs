//#region src/merger/class-merger.ts
function classMerger(classes) {
	const length = classes.length;
	if (length === 0) return "";
	const firstClass = classes[0];
	if (length === 1) return firstClass;
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (let index = 0; index < length; index += 1) {
		const cls = classes[index];
		if (cls === "" || seen.has(cls)) continue;
		seen.add(cls);
		out.push(cls);
	}
	return out.length === 1 ? out[0] : out.join(" ");
}
//#endregion
//#region src/error/base-error.ts
var BaseError = class extends Error {
	constructor(options = {}) {
		const { cause, code, details, message = "Application Error", name = "BaseError" } = options;
		super(message, cause === void 0 ? void 0 : { cause });
		this.name = name;
		this.code = code;
		this.details = details;
		if (cause !== void 0 && !("cause" in this)) Object.defineProperty(this, "cause", {
			configurable: true,
			enumerable: false,
			value: cause,
			writable: true
		});
	}
};
//#endregion
//#region src/error/http-error.ts
var BaseHttpError = class extends BaseError {
	expose;
	status;
	statusText;
	constructor(options = {}) {
		const { cause, code, details, expose, message, name = "BaseHttpError", status, statusText } = options;
		super({
			cause,
			code,
			details,
			message,
			name
		});
		this.expose = expose ?? false;
		this.status = status ?? 500;
		this.statusText = statusText ?? "Internal Server Error";
	}
};
var UnauthorizedError = class extends BaseHttpError {
	constructor(options = {}) {
		super({
			code: "UNAUTHORIZED",
			expose: true,
			message: "Unauthorized",
			name: "UnauthorizedError",
			status: 401,
			statusText: "Unauthorized",
			...options
		});
	}
};
var BadRequestError = class extends BaseHttpError {
	constructor(options = {}) {
		super({
			code: "BAD_REQUEST",
			expose: true,
			message: "Bad Request",
			name: "BadRequestError",
			status: 400,
			statusText: "Bad Request",
			...options
		});
	}
};
var PaymentRequiredError = class extends BaseHttpError {
	constructor(options = {}) {
		super({
			code: "PAYMENT_REQUIRED",
			expose: true,
			message: "Payment Required",
			name: "PaymentRequiredError",
			status: 402,
			statusText: "Payment Required",
			...options
		});
	}
};
var ForbiddenError = class extends BaseHttpError {
	constructor(options = {}) {
		super({
			code: "FORBIDDEN",
			expose: true,
			message: "Forbidden",
			name: "ForbiddenError",
			status: 403,
			statusText: "Forbidden",
			...options
		});
	}
};
var MethodNotAllowedError = class extends BaseHttpError {
	constructor(options = {}) {
		super({
			code: "METHOD_NOT_ALLOWED",
			expose: true,
			message: "Method Not Allowed",
			name: "MethodNotAllowedError",
			status: 405,
			statusText: "Method Not Allowed",
			...options
		});
	}
};
var NotAcceptableError = class extends BaseHttpError {
	constructor(options = {}) {
		super({
			code: "NOT_ACCEPTABLE",
			expose: true,
			message: "Not Acceptable",
			name: "NotAcceptableError",
			status: 406,
			statusText: "Not Acceptable",
			...options
		});
	}
};
var ProxyAuthenticationRequiredError = class extends BaseHttpError {
	constructor(options = {}) {
		super({
			code: "PROXY_AUTHENTICATION_REQUIRED",
			expose: true,
			message: "Proxy Authentication Required",
			name: "ProxyAuthenticationRequiredError",
			status: 407,
			statusText: "Proxy Authentication Required",
			...options
		});
	}
};
var NotFoundError = class extends BaseHttpError {
	constructor(options = {}) {
		super({
			code: "NOT_FOUND",
			expose: true,
			message: "Not Found",
			name: "NotFoundError",
			status: 404,
			statusText: "Not Found",
			...options
		});
	}
};
var ConflictError = class extends BaseHttpError {
	constructor(options = {}) {
		super({
			code: "CONFLICT",
			expose: true,
			message: "Conflict",
			name: "ConflictError",
			status: 409,
			statusText: "Conflict",
			...options
		});
	}
};
var GoneError = class extends BaseHttpError {
	constructor(options = {}) {
		super({
			code: "GONE",
			expose: true,
			message: "Gone",
			name: "GoneError",
			status: 410,
			statusText: "Gone",
			...options
		});
	}
};
var PreconditionFailedError = class extends BaseHttpError {
	constructor(options = {}) {
		super({
			code: "PRECONDITION_FAILED",
			expose: true,
			message: "Precondition Failed",
			name: "PreconditionFailedError",
			status: 412,
			statusText: "Precondition Failed",
			...options
		});
	}
};
var PayloadTooLargeError = class extends BaseHttpError {
	constructor(options = {}) {
		super({
			code: "PAYLOAD_TOO_LARGE",
			expose: true,
			message: "Payload Too Large",
			name: "PayloadTooLargeError",
			status: 413,
			statusText: "Payload Too Large",
			...options
		});
	}
};
var UnsupportedMediaTypeError = class extends BaseHttpError {
	constructor(options = {}) {
		super({
			code: "UNSUPPORTED_MEDIA_TYPE",
			expose: true,
			message: "Unsupported Media Type",
			name: "UnsupportedMediaTypeError",
			status: 415,
			statusText: "Unsupported Media Type",
			...options
		});
	}
};
var UnprocessableEntityError = class extends BaseHttpError {
	constructor(options = {}) {
		super({
			code: "UNPROCESSABLE_ENTITY",
			expose: true,
			message: "Unprocessable Entity",
			name: "UnprocessableEntityError",
			status: 422,
			statusText: "Unprocessable Entity",
			...options
		});
	}
};
var TooManyRequestsError = class extends BaseHttpError {
	constructor(options = {}) {
		super({
			code: "TOO_MANY_REQUESTS",
			expose: true,
			message: "Too Many Requests",
			name: "TooManyRequestsError",
			status: 429,
			statusText: "Too Many Requests",
			...options
		});
	}
};
var TimeoutError = class extends BaseHttpError {
	constructor(options = {}) {
		super({
			code: "REQUEST_TIMEOUT",
			expose: true,
			message: "Request Timeout",
			name: "TimeoutError",
			status: 408,
			statusText: "Request Timeout",
			...options
		});
	}
};
var InternalServerError = class extends BaseHttpError {
	constructor(options = {}) {
		super({
			code: "INTERNAL_SERVER_ERROR",
			expose: false,
			message: "Internal Server Error",
			name: "InternalServerError",
			status: 500,
			statusText: "Internal Server Error",
			...options
		});
	}
};
var NotImplementedError = class extends BaseHttpError {
	constructor(options = {}) {
		super({
			code: "NOT_IMPLEMENTED",
			expose: false,
			message: "Not Implemented",
			name: "NotImplementedError",
			status: 501,
			statusText: "Not Implemented",
			...options
		});
	}
};
var BadGatewayError = class extends BaseHttpError {
	constructor(options = {}) {
		super({
			code: "BAD_GATEWAY",
			expose: false,
			message: "Bad Gateway",
			name: "BadGatewayError",
			status: 502,
			statusText: "Bad Gateway",
			...options
		});
	}
};
var ServiceUnavailableError = class extends BaseHttpError {
	constructor(options = {}) {
		super({
			code: "SERVICE_UNAVAILABLE",
			expose: false,
			message: "Service Unavailable",
			name: "ServiceUnavailableError",
			status: 503,
			statusText: "Service Unavailable",
			...options
		});
	}
};
var GatewayTimeoutError = class extends BaseHttpError {
	constructor(options = {}) {
		super({
			code: "GATEWAY_TIMEOUT",
			expose: false,
			message: "Gateway Timeout",
			name: "GatewayTimeoutError",
			status: 504,
			statusText: "Gateway Timeout",
			...options
		});
	}
};
//#endregion
//#region src/error/scheme-error.ts
var SchemeError = class extends BaseError {
	allowedSchemes;
	receivedScheme;
	constructor(options = {}) {
		const { allowedSchemes = [], receivedScheme, ...baseOptions } = options;
		const allowedText = allowedSchemes.length === 0 ? "none" : allowedSchemes.join(", ");
		super({
			code: "INVALID_SCHEME",
			message: `Invalid scheme: expected one of [${allowedText}], received "${receivedScheme ?? "unknown"}"`,
			name: "SchemeError",
			...baseOptions
		});
		this.allowedSchemes = allowedSchemes;
		this.receivedScheme = receivedScheme;
	}
};
//#endregion
//#region src/error/validation-error.ts
var ValidationError = class extends BaseError {
	field;
	issues;
	constructor(options = {}) {
		const { field, issues = [], ...baseOptions } = options;
		const message = baseOptions.message ?? (field ? `Validation failed for "${field}"` : "Validation failed");
		super({
			code: "VALIDATION_ERROR",
			...baseOptions,
			message,
			name: "ValidationError"
		});
		this.field = field;
		this.issues = issues;
	}
};
//#endregion
//#region src/common/is.ts
function isNull(value) {
	return value === null;
}
function isUndefined(value) {
	return value === void 0;
}
//#endregion
//#region src/object/object.ts
/**
* オブジェクトから要素を省く関数（非破壊）
* - 元オブジェクトは変更しません
* - `as` / `any` を使わず、型ガードでキーを検証します
*/
function isKeyOf(key, obj) {
	return typeof key === "string" || typeof key === "number" || typeof key === "symbol" ? key in obj : false;
}
function isOmitObject(currentObj, keys) {
	return keys.every((key) => !Object.keys(currentObj).includes(String(key)));
}
function omitElementObject(obj, keys) {
	const entries = Object.entries(obj).filter(([k]) => {
		return !keys.some((key) => String(key) === k);
	});
	const typedResult = {};
	for (const [k, v] of entries) if (isKeyOf(k, obj)) typedResult[k] = v;
	return typedResult;
}
//#endregion
//#region src/non-nullable/option.ts
const basic$1 = {
	OPTION_SOME: "some",
	OPTION_NONE: "none"
};
const optionUtility = (function() {
	const { OPTION_SOME, OPTION_NONE } = basic$1;
	const createSome = (value) => {
		return Object.freeze({
			kind: OPTION_SOME,
			isSome: true,
			isNone: false,
			value
		});
	};
	const createNone = () => {
		return Object.freeze({
			kind: OPTION_NONE,
			isSome: false,
			isNone: true
		});
	};
	const optionConversion = (value) => {
		if (value === null || value === void 0) return createNone();
		return createSome(value);
	};
	return Object.freeze({
		createSome,
		createNone,
		optionConversion
	});
})();
//#endregion
//#region src/non-nullable/env-parse.ts
function envParse(env) {
	const { optionConversion } = optionUtility;
	return optionConversion(env);
}
//#endregion
//#region src/non-nullable/result/result-core.ts
const basic = {
	RESULT_OK: "ok",
	RESULT_NG: "ng"
};
function createOk(value) {
	return {
		kind: basic.RESULT_OK,
		value
	};
}
function createErr(err) {
	return {
		kind: basic.RESULT_NG,
		err
	};
}
function isOk(result) {
	return result.kind === basic.RESULT_OK;
}
function isErr(result) {
	return result.kind === basic.RESULT_NG;
}
const UNIT = Object.freeze({ _unit: Symbol("UNIT_SYMBOL") });
const checkPromiseVoid = async ({ fn, err, finalFn = () => {} }) => {
	try {
		await fn();
		return createOk(UNIT);
	} catch (e) {
		return err(e);
	} finally {
		finalFn();
	}
};
const checkResultReturn = ({ fn, err, finalFn = () => {} }) => {
	try {
		return createOk(fn());
	} catch (e) {
		return err(e);
	} finally {
		finalFn();
	}
};
const checkResultVoid = ({ fn, err, finalFn = () => {} }) => {
	try {
		fn();
		return createOk(UNIT);
	} catch (e) {
		return err(e);
	} finally {
		finalFn();
	}
};
const checkPromiseReturn = async ({ fn, err, finalFn = () => {} }) => {
	try {
		return createOk(await fn());
	} catch (e) {
		return err(e);
	} finally {
		finalFn();
	}
};
//#endregion
export { BadGatewayError, BadRequestError, BaseError, BaseHttpError, ConflictError, ForbiddenError, GatewayTimeoutError, GoneError, InternalServerError, MethodNotAllowedError, NotAcceptableError, NotFoundError, NotImplementedError, PayloadTooLargeError, PaymentRequiredError, PreconditionFailedError, ProxyAuthenticationRequiredError, SchemeError, ServiceUnavailableError, TimeoutError, TooManyRequestsError, UNIT, UnauthorizedError, UnprocessableEntityError, UnsupportedMediaTypeError, ValidationError, checkPromiseReturn, checkPromiseVoid, checkResultReturn, checkResultVoid, classMerger, createErr, createOk, envParse, isErr, isKeyOf, isNull, isOk, isOmitObject, isUndefined, omitElementObject, optionUtility };
