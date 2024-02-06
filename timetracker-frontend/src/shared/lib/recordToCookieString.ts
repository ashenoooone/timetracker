export const recordToCookieString = (record: Record<string, string>) => {
  return Object.entries(record).reduce((ac, [key, value]) => {
    ac += `${key}=${value};`;
    return ac;
  }, "");
};
