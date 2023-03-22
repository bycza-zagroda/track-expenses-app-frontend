import { KeysMatching } from '../types.utils';

export function sortAlphabeticallyByProp<T extends object, K extends KeysMatching<T, string>>(array: T[], prop: K): T[] {
  return array.sort((a, b) => {
    const propAValue = a[prop];
    const propBValue = b[prop];

    if (typeof propAValue !== 'string' || typeof propBValue !== 'string') {
      throw new Error(`[${prop.toString()}] value is not a string type of value`);
    }

    if (propAValue.toLowerCase() === propBValue.toLowerCase()) {
      return 0;
    }

    return propAValue.toLowerCase() < propBValue.toLowerCase() ? -1 : 1;
  });
}

export function sortByDate<T extends object, K extends KeysMatching<T, Date>>
(array: T[], prop: K, descending = false): T[] {
  return array.sort((a, b) => {
    const propAValue = a[prop];
    const propBValue = b[prop];

    if (!(propAValue instanceof Date) || !(propBValue instanceof Date)) {
      throw new Error(`[${prop.toString()}] value is not a proper Date type`);
    }

    if (propAValue === propBValue) {
      return 0;
    }

    return (descending) ? (propAValue < propBValue ? -1 : 1) : (propAValue < propBValue ? 1 : -1);
  });
}
