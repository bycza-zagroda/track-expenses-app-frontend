// export function sortAlphabeticallyByProp<T>(array: T, prop: string): any[] {
//   const newArray = [...array];
//   const sorted = newArray.sort((a: any, b: any) =>
//     a[prop].toLowerCase() < b[prop].toLowerCase() ? -1 : a[prop].toLowerCase() > b[prop].toLowerCase() ? 1 : 0,
//   );

//   return sorted;
// }

export function sortAlphabeticallyByProp<T extends any, K extends string>(array: T[], prop: K): T[] {
  const newArray = [ ...array ];
  const sorted = newArray.sort((a: any, b: any) =>
    a[ prop ].toLowerCase() < b[ prop ].toLowerCase() ? -1 : a[ prop ].toLowerCase() > b[ prop ].toLowerCase() ? 1 : 0,
  );

  return sorted;
}