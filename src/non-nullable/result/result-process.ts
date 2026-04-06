import { type Result, createOk } from "./result-core";

interface CheckResultReturn<T, E> {
  fn: () => NonNullable<T>;
  err: (e: unknown) => Result<never, NonNullable<E>>;
  finalFn?: () => void;
}

interface CheckResultVoid<E> {
  fn: () => void;
  err: (e: unknown) => Result<never, NonNullable<E>>;
  finalFn?: () => void;
}

interface CheckPromiseReturn<T, E> {
  fn: () => Promise<NonNullable<T>>;
  err: (e: unknown) => Result<never, NonNullable<E>>;
  finalFn?: () => void;
}

interface CheckPromiseVoid<E> {
  fn: () => Promise<void>;
  err: (e: unknown) => Result<never, NonNullable<E>>;
  finalFn?: () => void;
}

const UNIT_SYMBOL = Symbol("UNIT_SYMBOL");

interface Unit {
  readonly _unit: typeof UNIT_SYMBOL;
}

export const UNIT: Unit = Object.freeze({
  _unit: UNIT_SYMBOL,
});

export const checkPromiseVoid = async <E>({
  fn,
  err,
  finalFn = () => {},
}: CheckPromiseVoid<E>): Promise<Result<Unit, E>> => {
  try {
    await fn();

    return createOk(UNIT);
  } catch (e) {
    return err(e);
  } finally {
    finalFn();
  }
};

export const checkResultReturn = <T, E>({
  fn,
  err,
  finalFn = () => {},
}: CheckResultReturn<T, E>): Result<T, E> => {
  try {
    const result = fn();

    return createOk(result);
  } catch (e) {
    return err(e);
  } finally {
    finalFn();
  }
};

export const checkResultVoid = <E>({
  fn,
  err,
  finalFn = () => {},
}: CheckResultVoid<E>): Result<Unit, E> => {
  try {
    fn();

    return createOk(UNIT);
  } catch (e) {
    return err(e);
  } finally {
    finalFn();
  }
};
export const checkPromiseReturn = async <T, E>({
  fn,
  err,
  finalFn = () => {},
}: CheckPromiseReturn<T, E>): Promise<Result<T, E>> => {
  try {
    const result = await fn();

    return createOk(result);
  } catch (e) {
    return err(e);
  } finally {
    finalFn();
  }
};
