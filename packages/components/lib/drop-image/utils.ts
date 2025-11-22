export const wait = (d: number) => new Promise((r) => setTimeout(r, d));
export const noop = (e: React.DragEvent<Element>, file: File) => {};
