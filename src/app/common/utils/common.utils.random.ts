export function getRandomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function getRandomNumberFloor(min: number, max: number): number {
  return Math.floor(getRandomNumber(min, max));
}
