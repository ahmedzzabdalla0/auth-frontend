export function isFetchError(error: {
  ok?: boolean;
  [key: string]: any;
}): boolean {
  return error && typeof error === "object" && error?.ok === false;
}
