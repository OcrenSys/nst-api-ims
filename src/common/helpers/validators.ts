import { Like } from 'typeorm';

export function setOptionsRelation(parameters: unknown): any {
  return JSON.parse(parameters as string);
}

export function setOptionsWhere(parameters: unknown): any {
  if (
    typeof parameters === 'string' &&
    parameters.includes('{') &&
    parameters.includes('}')
  ) {
    parameters = JSON.parse(parameters);
  }

  let options = {};
  if (typeof parameters === 'object') {
    Object.entries(parameters).forEach(
      ([key, value]: [
        string,
        string | number | boolean | object | unknown,
      ]) => {
        options = {
          ...options,
          [key]: getValue(value),
        };
      },
    );
  }

  return options;
}

function getValue(
  value: string | number | boolean | object | unknown,
): string | number | boolean | object | unknown {
  if (typeof value === 'string' && value.includes('{') && value.includes('}')) {
    value = JSON.parse(value);
  }

  const values = {
    object: setOptionsWhere(value),
    string: Like(`%${value || ''}%`),
    number: +value,
    boolean: value,
  };

  return values[typeof value] || value;
}
