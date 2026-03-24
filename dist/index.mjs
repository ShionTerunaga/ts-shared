//#region src/utils/class-merger.ts
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
//#region src/utils/is.ts
function isNull(value) {
  return value === null;
}
function isUndefined(value) {
  return value === void 0;
}
//#endregion
//#region src/utils/option.ts
const basic$1 = {
  OPTION_SOME: "some",
  OPTION_NONE: "none",
};
const optionUtility = (function () {
  const { OPTION_SOME, OPTION_NONE } = basic$1;
  const createSome = (value) => {
    return Object.freeze({
      kind: OPTION_SOME,
      isSome: true,
      isNone: false,
      value,
    });
  };
  const createNone = () => {
    return Object.freeze({
      kind: OPTION_NONE,
      isSome: false,
      isNone: true,
    });
  };
  const optionConversion = (value) => {
    if (isNull(value) || isUndefined(value)) return createNone();
    return createSome(value);
  };
  return Object.freeze({
    createSome,
    createNone,
    optionConversion,
  });
})();
//#endregion
//#region src/utils/env-parse.ts
function envParse(env) {
  const { optionConversion } = optionUtility;
  return optionConversion(env);
}
//#endregion
//#region src/utils/object.ts
/**
 * オブジェクトから要素を省く関数（非破壊）
 * - 元オブジェクトは変更しません
 * - `as` / `any` を使わず、型ガードでキーを検証します
 */
function isKeyOf(key, obj) {
  return typeof key === "string" || typeof key === "number" || typeof key === "symbol"
    ? key in obj
    : false;
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
//#region src/utils/result.ts
const basic = {
  RESULT_OK: "ok",
  RESULT_NG: "ng",
};
const UNIT_SYMBOL = Symbol("UNIT_SYMBOL");
const resultUtility = (function () {
  const { RESULT_NG, RESULT_OK } = basic;
  const UNIT = Object.freeze({ _unit: UNIT_SYMBOL });
  const checkPromiseReturn = async ({ fn, err, finalFn = () => {} }) => {
    try {
      return createOk(await fn());
    } catch (e) {
      return err(e);
    } finally {
      finalFn();
    }
  };
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
  const createOk = (value) => {
    return Object.freeze({
      kind: RESULT_OK,
      isOk: true,
      isErr: false,
      value,
    });
  };
  const createNg = (err) => {
    return Object.freeze({
      kind: RESULT_NG,
      isOk: false,
      isErr: true,
      err,
    });
  };
  return Object.freeze({
    UNIT,
    checkResultReturn,
    checkResultVoid,
    checkPromiseReturn,
    checkPromiseVoid,
    createOk,
    createNg,
  });
})();
//#endregion
export {
  classMerger,
  envParse,
  isKeyOf,
  isNull,
  isOmitObject,
  isUndefined,
  omitElementObject,
  optionUtility,
  resultUtility,
};
