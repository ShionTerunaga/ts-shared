import { describe, expect, it } from "vite-plus/test";
import {
  checkPromiseReturn,
  checkPromiseVoid,
  checkResultReturn,
  checkResultVoid,
  createErr,
  createOk,
  isErr,
  isOk,
  UNIT,
} from "ts-shared";

describe("result", () => {
  it("createOk で作った値は isOK が true になる", () => {
    const ok = createOk("value");

    expect(ok.kind).toBe("ok");

    if (ok.kind === "ng") {
      throw new Error("Expected to be Ok, but got Err");
    }

    expect(ok.value).toBe("value");
  });

  it("createErr で作った値は isErr が true になる", () => {
    const err = createErr("err");

    expect(err.kind).toBe("ng");

    if (err.kind === "ok") {
      throw new Error("Expected to be Err, but got Ok");
    }
    expect(err.err).toBe("err");
  });

  it("isOK は ok でない場合 false を返す", () => {
    const err = createErr("err");

    expect(err.kind).not.toBe("ok");
  });

  it("isErr は err でない場合 false を返す", () => {
    const ok = createOk("value");

    expect(isErr(ok)).toBeFalsy();
  });

  it("checkResultReturn は成功時に ok を返す", () => {
    const res = checkResultReturn({
      fn: () => "ret",
      err: () => createErr("err"),
    });

    expect(res.kind).toBe("ok");

    expect((res as any).value).toBe("ret");
  });

  it("checkResultReturn は例外時に ng を返す", () => {
    const res = checkResultReturn({
      fn: () => {
        throw new Error("boom");
      },
      err: () => createErr("myErr"),
    });

    expect(res.kind).toBe("ng");

    expect((res as any).err).toBe("myErr");
  });

  it("checkResultReturn は成功時でも finalFn を呼ぶ", () => {
    let called = false;

    checkResultReturn({
      fn: () => "ret",
      err: () => createErr("err"),
      finalFn: () => {
        called = true;
      },
    });

    expect(called).toBeTruthy();
  });

  it("isOkでokの場合はtrueを返す", () => {
    const res = createOk("value");

    expect(isOk(res)).toBeTruthy();
  });

  it("isOkでerrの場合はfalseを返す", () => {
    const res = createErr("err");

    expect(isOk(res)).toBeFalsy();
  });

  it("isErrでerrの場合はtrueを返す", () => {
    const res = createErr("err");

    expect(isErr(res)).toBeTruthy();
  });

  it("checkResultReturn は例外時でも finalFn を呼ぶ", () => {
    let called = false;

    checkResultReturn({
      fn: () => {
        throw new Error("boom");
      },
      err: () => createErr("err"),
      finalFn: () => {
        called = true;
      },
    });

    expect(called).toBeTruthy();
  });

  it("checkResultVoid は成功時に UNIT を返す", () => {
    const res = checkResultVoid({
      fn: () => {},
      err: () => createErr("e"),
    });

    expect(res.kind).toBe("ok");

    expect((res as any).value).toBe(UNIT);
  });

  it("checkResultVoid は成功時でも finalFn を呼ぶ", () => {
    let called = false;

    checkResultVoid({
      fn: () => {},
      err: () => createErr("e"),
      finalFn: () => {
        called = true;
      },
    });

    expect(called).toBeTruthy();
  });

  it("checkResultVoid は例外時でも finalFn を呼ぶ", () => {
    let called = false;

    checkResultVoid({
      fn: () => {
        throw new Error("boom");
      },
      err: () => createErr("e"),
      finalFn: () => {
        called = true;
      },
    });

    expect(called).toBeTruthy();
  });

  it("checkPromiseReturn は解決時に ok を返す", async () => {
    const res = await checkPromiseReturn({
      fn: async () => "async",
      err: () => createErr("e"),
    });

    expect(res.kind).toBe("ok");

    if (res.kind === "ng") {
      throw new Error("Expected to be Ok, but got Err");
    }

    expect((res as any).value).toBe("async");
  });

  it("checkPromiseReturn は拒否時に ng を返す", async () => {
    const res = await checkPromiseReturn({
      fn: async () => {
        throw new Error("fail");
      },
      err: () => createErr("err"),
    });

    expect(res.kind).toBe("ng");

    if (res.kind === "ok") {
      throw new Error("Expected to be Err, but got Ok");
    }

    expect((res as any).err).toBe("err");
  });

  it("checkPromiseReturn は解決時でも finalFn を呼ぶ", async () => {
    let called = false;

    await checkPromiseReturn({
      fn: async () => "async",
      err: () => createErr("e"),
      finalFn: () => {
        called = true;
      },
    });

    expect(called).toBeTruthy();
  });

  it("checkPromiseReturn は拒否時でも finalFn を呼ぶ", async () => {
    let called = false;

    await checkPromiseReturn({
      fn: async () => {
        throw new Error("fail");
      },
      err: () => createErr("e"),
      finalFn: () => {
        called = true;
      },
    });

    expect(called).toBeTruthy();
  });

  it("checkPromiseVoid は成功時に UNIT を返す", async () => {
    const res = await checkPromiseVoid({
      fn: async () => {},
      err: () => createErr("e"),
    });

    expect(res.kind).toBe("ok");

    if (res.kind === "ng") {
      throw new Error("Expected to be Ok, but got Err");
    }

    expect(res.value).toBe(UNIT);
  });

  it("checkPromiseVoid は成功時でも finalFn を呼ぶ", async () => {
    let called = false;

    await checkPromiseVoid({
      fn: async () => {},
      err: () => createErr("e"),
      finalFn: () => {
        called = true;
      },
    });

    expect(called).toBeTruthy();
  });

  it("checkPromiseVoid は拒否時でも finalFn を呼ぶ", async () => {
    let called = false;

    await checkPromiseVoid({
      fn: async () => {
        throw new Error("fail");
      },
      err: () => createErr("e"),
      finalFn: () => {
        called = true;
      },
    });

    expect(called).toBeTruthy();
  });
});
