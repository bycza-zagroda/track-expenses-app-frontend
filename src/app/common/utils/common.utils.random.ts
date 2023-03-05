export function getRandomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function getFoundedRandomNumber(min: number, max: number): number {
  return Math.round(getRandomNumber(min, max));
}
