export function setOptionsWhere(params: unknown): any {
  let options = {};
  Object.entries(params).forEach(([key, value]: [string, any]) => {
    options = {
      ...options,
      [key]: JSON.parse(value),
    };
  });
  return options;
}
