export default function classMerger(classes: ReadonlyArray<string>): string {
  const length = classes.length;

  if (length === 0) return "";

  const firstClass = classes[0];

  if (length === 1) {
    return firstClass === "" ? "" : firstClass;
  }

  const seen = new Set<string>();
  const out: string[] = [];

  for (let index = 0; index < length; index += 1) {
    const cls = classes[index];

    if (cls === "" || seen.has(cls)) continue;

    seen.add(cls);
    out.push(cls);
  }

  return out.length === 1 ? out[0] : out.join(" ");
}
