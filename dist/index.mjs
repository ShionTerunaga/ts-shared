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
//#region src/non-nullable/option.ts
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
    if (value === null || value === void 0) return createNone();
    return createSome(value);
  };
  return Object.freeze({
    createSome,
    createNone,
    optionConversion,
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
  RESULT_NG: "ng",
};
function createOk(value) {
  return {
    kind: basic.RESULT_OK,
    value,
  };
}
function createErr(err) {
  return {
    kind: basic.RESULT_NG,
    err,
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
export {
  UNIT,
  checkPromiseReturn,
  checkPromiseVoid,
  checkResultReturn,
  checkResultVoid,
  classMerger,
  createErr,
  createOk,
  envParse,
  isErr,
  isKeyOf,
  isNull,
  isOk,
  isOmitObject,
  isUndefined,
  omitElementObject,
  optionUtility,
};
