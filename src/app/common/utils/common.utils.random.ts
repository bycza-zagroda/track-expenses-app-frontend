export function getRandomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function getRoundedRandomNumber(min: number, max: number): number {
  return Math.round(getRandomNumber(min, max));
}
