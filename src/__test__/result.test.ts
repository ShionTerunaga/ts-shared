import { describe, expect, it } from "vite-plus/test";
import { resultUtility } from "@/non-nullable/result";

describe("resultUtility", () => {
  const {
    createOk,
    createNg,
    checkResultReturn,
    checkResultVoid,
    checkPromiseReturn,
    checkPromiseVoid,
    UNIT,
  } = resultUtility;

  it("createOk で作った値は isOK が true になる", () => {
    const ok = createOk("value");

    expect(ok.isOk).toBeTruthy();

    if (ok.isErr) {
      throw new Error("Expected to be Ok, but got Err");
    }

    expect(ok.value).toBe("value");
  });

  it("createNg で作った値は isNG が true になる", () => {
    const ng = createNg("err");

    expect(ng.isErr).toBeTruthy();

    if (ng.isOk) {
      throw new Error("Expected to be Err, but got Ok");
    }
    expect(ng.err).toBe("err");
  });

  it("isOK は ok でない場合 false を返す", () => {
    const ng = createNg("err");

    expect(ng.isOk).toBeFalsy();
  });

  it("isNG は ng でない場合 false を返す", () => {
    const ok = createOk("value");

    expect(ok.isErr).toBeFalsy();
  });

  it("checkResultReturn は成功時に ok を返す", () => {
    const res = checkResultReturn({
      fn: () => "ret",
      err: () => createNg("err"),
    });

    expect(res.isOk).toBeTruthy();
    if (res.isErr) {
      throw new Error("Expected to be Ok, but got Err");
    }

    expect(res.value).toBe("ret");
  });

  it("checkResultReturn は例外時に ng を返す", () => {
    const res = checkResultReturn({
      fn: () => {
        throw new Error("boom");
      },
      err: () => createNg("myErr"),
    });

    expect(res.isErr).toBeTruthy();

    if (res.isOk) {
      throw new Error("Expected to be Err, but got Ok");
    }

    expect(res.err).toBe("myErr");
  });

  it("checkResultReturn は成功時でも finalFn を呼ぶ", () => {
    let called = false;

    checkResultReturn({
      fn: () => "ret",
      err: () => createNg("err"),
      finalFn: () => {
        called = true;
      },
    });

    expect(called).toBeTruthy();
  });

  it("checkResultReturn は例外時でも finalFn を呼ぶ", () => {
    let called = false;

    checkResultReturn({
      fn: () => {
        throw new Error("boom");
      },
      err: () => createNg("err"),
      finalFn: () => {
        called = true;
      },
    });

    expect(called).toBeTruthy();
  });

  it("checkResultVoid は成功時に UNIT を返す", () => {
    const res = checkResultVoid({
      fn: () => {},
      err: () => createNg("e"),
    });

    expect(res.isOk).toBeTruthy();

    if (res.isErr) {
      throw new Error("Expected to be Ok, but got Err");
    }

    expect(res.value).toBe(UNIT);
  });

  it("checkResultVoid は成功時でも finalFn を呼ぶ", () => {
    let called = false;

    checkResultVoid({
      fn: () => {},
      err: () => createNg("e"),
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
      err: () => createNg("e"),
      finalFn: () => {
        called = true;
      },
    });

    expect(called).toBeTruthy();
  });

  it("checkPromiseReturn は解決時に ok を返す", async () => {
    const res = await checkPromiseReturn({
      fn: async () => "async",
      err: () => createNg("e"),
    });

    expect(res.isOk).toBeTruthy();

    if (res.isOk) expect(res.value).toBe("async");
  });

  it("checkPromiseReturn は拒否時に ng を返す", async () => {
    const res = await checkPromiseReturn({
      fn: async () => {
        throw new Error("fail");
      },
      err: () => createNg("err"),
    });

    expect(res.isErr).toBeTruthy();

    if (res.isOk) {
      throw new Error("Expected to be Err, but got Ok");
    }

    expect(res.err).toBe("err");
  });

  it("checkPromiseReturn は解決時でも finalFn を呼ぶ", async () => {
    let called = false;

    await checkPromiseReturn({
      fn: async () => "async",
      err: () => createNg("e"),
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
      err: () => createNg("e"),
      finalFn: () => {
        called = true;
      },
    });

    expect(called).toBeTruthy();
  });

  it("checkPromiseVoid は成功時に UNIT を返す", async () => {
    const res = await checkPromiseVoid({
      fn: async () => {},
      err: () => createNg("e"),
    });

    expect(res.isOk).toBeTruthy();

    if (res.isErr) {
      throw new Error("Expected to be Ok, but got Err");
    }

    expect(res.value).toBe(UNIT);
  });

  it("checkPromiseVoid は成功時でも finalFn を呼ぶ", async () => {
    let called = false;

    await checkPromiseVoid({
      fn: async () => {},
      err: () => createNg("e"),
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
      err: () => createNg("e"),
      finalFn: () => {
        called = true;
      },
    });

    expect(called).toBeTruthy();
  });
});
