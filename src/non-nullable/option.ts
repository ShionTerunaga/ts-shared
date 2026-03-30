const basic = {
  OPTION_SOME: "some",
  OPTION_NONE: "none",
} as const;

interface Some<T> {
  readonly kind: typeof basic.OPTION_SOME;
  readonly isSome: true;
  readonly isNone: false;
  readonly value: T;
}

interface None {
  readonly kind: typeof basic.OPTION_NONE;
  readonly isSome: false;
  readonly isNone: true;
}

export type Option<T> = Some<NonNullable<T>> | None;

export const optionUtility = (function () {
  const { OPTION_SOME, OPTION_NONE } = basic;

  const createSome = <T>(value: NonNullable<T>): Option<T> => {
    return Object.freeze({
      kind: OPTION_SOME,
      isSome: true,
      isNone: false,
      value,
    });
  };

  const createNone = (): Option<never> => {
    return Object.freeze({
      kind: OPTION_NONE,
      isSome: false,
      isNone: true,
    });
  };

  const optionConversion = <T>(value: T): Option<T> => {
    if (value === null || value === undefined) {
      return createNone();
    }

    return createSome(value);
  };

  return Object.freeze({
    createSome,
    createNone,
    optionConversion,
  });
})();
