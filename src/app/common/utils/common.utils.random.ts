export function getRandomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function getRandomBoolean(): boolean {
  return Math.random() < 0.9;
}
