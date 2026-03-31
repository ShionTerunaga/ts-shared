import { BaseError, type BaseErrorOptions } from "./base-error";

export interface ValidationIssue {
  message: string;
  path?: string;
}

export interface ValidationErrorOptions extends BaseErrorOptions {
  field?: string;
  issues?: ValidationIssue[];
}

export class ValidationError extends BaseError {
  readonly field?: string;
  readonly issues: ValidationIssue[];

  constructor(options: ValidationErrorOptions = {}) {
    const { field, issues = [], ...baseOptions } = options;
    const message =
      baseOptions.message ?? (field ? `Validation failed for "${field}"` : "Validation failed");

    super({
      code: "VALIDATION_ERROR",
      ...baseOptions,
      message,
      name: "ValidationError",
    });

    this.field = field;
    this.issues = issues;
  }
}
