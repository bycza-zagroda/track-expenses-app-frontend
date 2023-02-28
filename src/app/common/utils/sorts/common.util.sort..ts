import { KeysMatching } from '../types.utils';

export function sortAlphabeticallyByProp<T extends object, K extends KeysMatching<T, string>>(array: T[], prop: K): T[] {
  return array.sort((a, b) => {
    // TODO: @purbanski-deftcode figure this out later
    const propAValue: string = a[prop] as unknown as string;
    const propBValue: string = b[prop] as unknown as string;

    if (propAValue.toLowerCase() === propBValue.toLowerCase()) {
      return 0;
    }

    return propAValue.toLowerCase() < propBValue.toLowerCase() ? -1 : 1;
  });
}