export function jsArrayToPgArray(arr) {
  return JSON.stringify(arr).replace("[", "{").replace("]", "}");
}
